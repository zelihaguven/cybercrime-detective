import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');

const app = express();
app.use(cors());
app.get('/health', (_, res) => res.json({ ok: true }));

if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

// rooms: code → Room
const rooms = new Map();
// socketToPlayer: socketId → { playerId, roomCode }
const socketToPlayer = new Map();

const TWO_HOURS = 2 * 60 * 60 * 1000;
const CLEANUP_INTERVAL = 10 * 60 * 1000;

function makeCode() {
  return String(Math.floor(1000 + Math.random() * 9000));
}
function uniqueCode() {
  let c;
  do { c = makeCode(); } while (rooms.has(c));
  return c;
}

function broadcast(code) {
  const room = rooms.get(code);
  if (room) io.to(code).emit('roomUpdate', room);
}

io.on('connection', (socket) => {

  socket.on('getRoom', ({ code }, cb) => {
    const room = rooms.get(code);
    cb(room ? { room } : { error: 'room_not_found' });
  });

  socket.on('createRoom', ({ playerId, playerName }, cb) => {
    const now = Date.now();
    const code = uniqueCode();
    const room = {
      code,
      hostId: playerId,
      status: 'waiting',
      selectedCase: 7,
      phase: 'lobby',
      createdAt: now,
      expiresAt: now + TWO_HOURS,
      accusationResult: null,
      players: {
        [playerId]: {
          name: playerName,
          isHost: true,
          clueIndices: [],
          ready: false,
          connected: true,
          joinedAt: now,
        },
      },
    };
    rooms.set(code, room);
    socketToPlayer.set(socket.id, { playerId, roomCode: code });
    socket.join(code);
    cb({ code });
    broadcast(code);
  });

  socket.on('joinRoom', ({ code, playerId, playerName }, cb) => {
    const room = rooms.get(code);
    if (!room)                              return cb({ error: 'room_not_found' });
    if (Date.now() > room.expiresAt)        return cb({ error: 'room_expired' });
    if (room.status !== 'waiting')          return cb({ error: 'room_started' });
    if (Object.keys(room.players).length >= 4) return cb({ error: 'room_full' });

    room.players[playerId] = {
      name: playerName,
      isHost: false,
      clueIndices: [],
      ready: false,
      connected: true,
      joinedAt: Date.now(),
    };
    socketToPlayer.set(socket.id, { playerId, roomCode: code });
    socket.join(code);
    cb({});
    broadcast(code);
  });

  socket.on('selectCase', ({ code, caseId }) => {
    const room = rooms.get(code);
    if (!room) return;
    room.selectedCase = caseId;
    broadcast(code);
  });

  socket.on('startGame', ({ code, clueDistribution }) => {
    const room = rooms.get(code);
    if (!room) return;
    room.status = 'active';
    room.phase = 'clue-review';
    Object.entries(clueDistribution).forEach(([pid, indices]) => {
      if (room.players[pid]) {
        room.players[pid].clueIndices = indices;
        room.players[pid].ready = false;
      }
    });
    broadcast(code);
  });

  socket.on('setReady', ({ code, playerId }) => {
    const room = rooms.get(code);
    if (!room || !room.players[playerId]) return;
    room.players[playerId].ready = true;
    broadcast(code);
  });

  socket.on('advanceToAccusation', ({ code }) => {
    const room = rooms.get(code);
    if (!room) return;
    room.phase = 'accusation';
    broadcast(code);
  });

  socket.on('submitAccusation', ({ code, choice, correct }) => {
    const room = rooms.get(code);
    if (!room) return;
    room.phase = 'result';
    room.status = 'complete';
    room.accusationResult = { choice, correct };
    broadcast(code);
  });

  socket.on('resetRoom', ({ code }) => {
    const room = rooms.get(code);
    if (!room) return;
    room.status = 'waiting';
    room.phase = 'lobby';
    room.accusationResult = null;
    Object.values(room.players).forEach((p) => {
      p.clueIndices = [];
      p.ready = false;
    });
    broadcast(code);
  });

  socket.on('disconnect', () => {
    const info = socketToPlayer.get(socket.id);
    if (!info) return;
    const { playerId, roomCode } = info;
    const room = rooms.get(roomCode);
    if (room?.players?.[playerId]) {
      room.players[playerId].connected = false;
      broadcast(roomCode);
    }
    socketToPlayer.delete(socket.id);
  });
});

// Purge expired rooms periodically
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    if (now > room.expiresAt) rooms.delete(code);
  }
}, CLEANUP_INTERVAL);

// SPA fallback — send index.html for any unmatched route
if (existsSync(DIST_DIR)) {
  app.get('*', (_, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

const PORT = process.env.PORT ?? 3001;
httpServer.listen(PORT, () => console.log(`[detective-server] listening on :${PORT}`));
