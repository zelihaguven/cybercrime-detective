import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');

// ── SQLite ────────────────────────────────────────────────────────────
const DATA_DIR = process.env.DATA_DIR ?? '.';
if (DATA_DIR !== '.' && !existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'rooms.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS rooms (
    code            TEXT    PRIMARY KEY,
    host_id         TEXT    NOT NULL,
    status          TEXT    NOT NULL DEFAULT 'waiting',
    selected_case   INTEGER NOT NULL DEFAULT 7,
    phase           TEXT    NOT NULL DEFAULT 'lobby',
    players         TEXT    NOT NULL DEFAULT '{}',
    accusation_result TEXT,
    created_at      INTEGER NOT NULL,
    expires_at      INTEGER NOT NULL
  )
`);

const stmtGet    = db.prepare('SELECT * FROM rooms WHERE code = ?');
const stmtUpsert = db.prepare(`
  INSERT INTO rooms
    (code, host_id, status, selected_case, phase, players, accusation_result, created_at, expires_at)
  VALUES
    (@code, @host_id, @status, @selected_case, @phase, @players, @accusation_result, @created_at, @expires_at)
  ON CONFLICT(code) DO UPDATE SET
    status            = excluded.status,
    selected_case     = excluded.selected_case,
    phase             = excluded.phase,
    players           = excluded.players,
    accusation_result = excluded.accusation_result
`);
const stmtClean = db.prepare('DELETE FROM rooms WHERE expires_at < ?');

function fromRow(row) {
  if (!row) return null;
  return {
    code:             row.code,
    hostId:           row.host_id,
    status:           row.status,
    selectedCase:     row.selected_case,
    phase:            row.phase,
    players:          JSON.parse(row.players),
    accusationResult: row.accusation_result ? JSON.parse(row.accusation_result) : null,
  };
}

function saveRoom(room) {
  const existing = stmtGet.get(room.code);
  stmtUpsert.run({
    code:              room.code,
    host_id:           room.hostId,
    status:            room.status,
    selected_case:     room.selectedCase,
    phase:             room.phase,
    players:           JSON.stringify(room.players),
    accusation_result: room.accusationResult ? JSON.stringify(room.accusationResult) : null,
    created_at:        existing?.created_at ?? room.createdAt ?? Date.now(),
    expires_at:        existing?.expires_at ?? room.expiresAt ?? Date.now() + TWO_HOURS,
  });
}

// ── Room subscriptions ────────────────────────────────────────────────
// roomCode → Set<WebSocket>  (who receives broadcasts for this room)
// ws       → { playerId, roomCode }  (for disconnect handling)
const roomSockets = new Map();
const wsToPlayer  = new Map();

function subscribe(ws, roomCode) {
  if (!roomSockets.has(roomCode)) roomSockets.set(roomCode, new Set());
  roomSockets.get(roomCode).add(ws);
}

function unsubscribe(ws, roomCode) {
  roomSockets.get(roomCode)?.delete(ws);
  if (roomSockets.get(roomCode)?.size === 0) roomSockets.delete(roomCode);
}

function broadcast(roomCode, room) {
  const msg = JSON.stringify({ type: 'roomUpdate', data: room });
  roomSockets.get(roomCode)?.forEach(ws => {
    if (ws.readyState === 1 /* OPEN */) ws.send(msg);
  });
}

// ── Helpers ───────────────────────────────────────────────────────────
const TWO_HOURS = 2 * 60 * 60 * 1000;

function makeCode() { return String(Math.floor(1000 + Math.random() * 9000)); }
function uniqueCode() {
  let c;
  do { c = makeCode(); } while (stmtGet.get(c));
  return c;
}

function ack(ws, reqId, data)  { ws.send(JSON.stringify({ type: '_ack', _reqId: reqId, data })); }
function ackErr(ws, reqId, e)  { ws.send(JSON.stringify({ type: '_ack', _reqId: reqId, error: e })); }

// ── Express (health + static) ─────────────────────────────────────────
const app = express();
app.get('/health', (_, res) => res.json({ ok: true }));
if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('/{*splat}', (_, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

const httpServer = createServer(app);

// ── WebSocket server ──────────────────────────────────────────────────
const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }

    const { type, _reqId: reqId, ...data } = msg;

    switch (type) {

      case 'getRoom': {
        const row = stmtGet.get(data.code);
        if (!row)                        { if (reqId) ackErr(ws, reqId, 'room_not_found'); return; }
        if (Date.now() > row.expires_at) { if (reqId) ackErr(ws, reqId, 'room_expired');  return; }
        const room = fromRow(row);
        subscribe(ws, data.code);
        // Reconnect: restore connected flag for this player
        if (data.playerId && room.players[data.playerId]) {
          wsToPlayer.set(ws, { playerId: data.playerId, roomCode: data.code });
          if (!room.players[data.playerId].connected) {
            room.players[data.playerId].connected = true;
            saveRoom(room);
            broadcast(data.code, room);
          }
        }
        if (reqId) ack(ws, reqId, { room });
        break;
      }

      case 'createRoom': {
        const name = String(data.playerName ?? '').trim();
        if (name.length < 2 || name.length > 24) { if (reqId) ackErr(ws, reqId, 'invalid_name'); return; }
        const now  = Date.now();
        const code = uniqueCode();
        const room = {
          code,
          hostId:           data.playerId,
          status:           'waiting',
          selectedCase:     7,
          phase:            'lobby',
          players: {
            [data.playerId]: { name, isHost: true, clueIndices: [], ready: false, connected: true, joinedAt: now },
          },
          accusationResult: null,
          createdAt:        now,
          expiresAt:        now + TWO_HOURS,
        };
        saveRoom(room);
        subscribe(ws, code);
        wsToPlayer.set(ws, { playerId: data.playerId, roomCode: code });
        if (reqId) ack(ws, reqId, { code });
        broadcast(code, room);
        break;
      }

      case 'joinRoom': {
        const name = String(data.playerName ?? '').trim();
        if (name.length < 2 || name.length > 24) { if (reqId) ackErr(ws, reqId, 'invalid_name'); return; }
        const row = stmtGet.get(data.code);
        if (!row)                                      { if (reqId) ackErr(ws, reqId, 'room_not_found'); return; }
        if (Date.now() > row.expires_at)               { if (reqId) ackErr(ws, reqId, 'room_expired');  return; }
        const room = fromRow(row);
        if (room.status !== 'waiting')                 { if (reqId) ackErr(ws, reqId, 'room_started');  return; }
        if (Object.keys(room.players).length >= 4)     { if (reqId) ackErr(ws, reqId, 'room_full');     return; }
        const nameTaken = Object.values(room.players)
          .some(p => p.name.toLowerCase() === name.toLowerCase());
        if (nameTaken)                                 { if (reqId) ackErr(ws, reqId, 'name_taken');    return; }
        room.players[data.playerId] = {
          name, isHost: false, clueIndices: [], ready: false, connected: true, joinedAt: Date.now(),
        };
        saveRoom(room);
        subscribe(ws, data.code);
        wsToPlayer.set(ws, { playerId: data.playerId, roomCode: data.code });
        if (reqId) ack(ws, reqId, {});
        broadcast(data.code, room);
        break;
      }

      case 'selectCase': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room) return;
        room.selectedCase = data.caseId;
        saveRoom(room); broadcast(data.code, room);
        break;
      }

      case 'startGame': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room) return;
        room.status = 'active';
        room.phase  = 'clue-review';
        Object.entries(data.clueDistribution).forEach(([pid, indices]) => {
          if (room.players[pid]) { room.players[pid].clueIndices = indices; room.players[pid].ready = false; }
        });
        saveRoom(room); broadcast(data.code, room);
        break;
      }

      case 'setReady': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room || !room.players[data.playerId]) return;
        room.players[data.playerId].ready = true;
        saveRoom(room); broadcast(data.code, room);
        break;
      }

      case 'advanceToAccusation': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room) return;
        room.phase = 'accusation';
        saveRoom(room); broadcast(data.code, room);
        break;
      }

      case 'submitAccusation': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room) return;
        room.phase            = 'result';
        room.status           = 'complete';
        room.accusationResult = { choice: data.choice, correct: data.correct };
        saveRoom(room); broadcast(data.code, room);
        break;
      }

      case 'resetRoom': {
        const room = fromRow(stmtGet.get(data.code));
        if (!room) return;
        room.status           = 'waiting';
        room.phase            = 'lobby';
        room.accusationResult = null;
        Object.values(room.players).forEach(p => { p.clueIndices = []; p.ready = false; });
        saveRoom(room); broadcast(data.code, room);
        break;
      }
    }
  });

  ws.on('close', () => {
    const info = wsToPlayer.get(ws);
    if (!info) return;
    const { playerId, roomCode } = info;
    const room = fromRow(stmtGet.get(roomCode));
    if (room?.players?.[playerId]) {
      room.players[playerId].connected = false;
      saveRoom(room);
      broadcast(roomCode, room);
    }
    wsToPlayer.delete(ws);
    unsubscribe(ws, roomCode);
  });
});

// Purge expired rooms every 10 minutes
setInterval(() => stmtClean.run(Date.now()), 10 * 60 * 1000);

const PORT = process.env.PORT ?? 3001;
httpServer.listen(PORT, () => console.log(`[server] :${PORT}`));
