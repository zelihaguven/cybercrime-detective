import { db } from '../firebase';
import { ref, set, update, get } from 'firebase/database';
import type { Room } from '../types/room';
import type { Clue } from '../types/game';

const TWO_HOURS = 2 * 60 * 60 * 1000;

export async function createRoom(code: string, hostId: string, hostName: string): Promise<void> {
  const now = Date.now();
  const room: Room = {
    hostId,
    status: 'waiting',
    selectedCase: 7,
    phase: 'lobby',
    createdAt: now,
    expiresAt: now + TWO_HOURS,
    accusationResult: null,
    players: {
      [hostId]: {
        name: hostName,
        isHost: true,
        clueIndices: [],
        ready: false,
        connected: true,
        joinedAt: now,
      },
    },
  };
  await set(ref(db, `rooms/${code}`), room);
}

export async function joinRoom(
  code: string,
  playerId: string,
  name: string,
): Promise<{ error?: string }> {
  const snap = await get(ref(db, `rooms/${code}`));
  if (!snap.exists()) return { error: 'room_not_found' };
  const room = snap.val() as Room;
  if (Date.now() > room.expiresAt) return { error: 'room_expired' };
  if (room.status !== 'waiting') return { error: 'room_started' };
  const playerCount = Object.keys(room.players ?? {}).length;
  if (playerCount >= 4) return { error: 'room_full' };

  await update(ref(db, `rooms/${code}/players/${playerId}`), {
    name,
    isHost: false,
    clueIndices: [],
    ready: false,
    connected: true,
    joinedAt: Date.now(),
  });
  return {};
}

export async function setSelectedCase(code: string, caseId: 7 | 8): Promise<void> {
  await update(ref(db, `rooms/${code}`), { selectedCase: caseId });
}

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function startGame(
  code: string,
  playerIds: string[],
  allClues: Clue[],
): Promise<void> {
  const indices = shuffleIndices(allClues.length);
  const distribution: Record<string, number[]> = {};
  playerIds.forEach((id, i) => {
    distribution[id] = indices.filter((_, idx) => idx % playerIds.length === i);
  });

  const updates: Record<string, unknown> = { 'status': 'active', 'phase': 'clue-review' };
  playerIds.forEach((id) => {
    updates[`players/${id}/clueIndices`] = distribution[id];
    updates[`players/${id}/ready`] = false;
  });
  await update(ref(db, `rooms/${code}`), updates);
}

export async function setPlayerReady(
  code: string,
  playerId: string,
  ready: boolean,
): Promise<void> {
  await update(ref(db, `rooms/${code}/players/${playerId}`), { ready });
}

export async function advanceToAccusation(code: string): Promise<void> {
  await update(ref(db, `rooms/${code}`), { phase: 'accusation' });
}

export async function submitAccusation(
  code: string,
  choice: string,
  correct: boolean,
): Promise<void> {
  await update(ref(db, `rooms/${code}`), {
    phase: 'result',
    status: 'complete',
    accusationResult: { choice, correct },
  });
}

export async function resetRoom(code: string): Promise<void> {
  const snap = await get(ref(db, `rooms/${code}/players`));
  if (!snap.exists()) return;
  const players = snap.val() as Room['players'];
  const updates: Record<string, unknown> = {
    status: 'waiting',
    phase: 'lobby',
    accusationResult: null,
  };
  Object.keys(players).forEach((id) => {
    updates[`players/${id}/clueIndices`] = [];
    updates[`players/${id}/ready`] = false;
  });
  await update(ref(db, `rooms/${code}`), updates);
}
