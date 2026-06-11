import { db } from '../firebase';
import { ref, get } from 'firebase/database';

export async function generateRoomCode(): Promise<string> {
  for (let attempts = 0; attempts < 10; attempts++) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    const snap = await get(ref(db, `rooms/${code}`));
    if (!snap.exists()) return code;
  }
  throw new Error('Could not generate a unique room code. Please try again.');
}

export function getOrCreatePlayerId(): string {
  const stored = sessionStorage.getItem('ciu-player-id');
  if (stored) return stored;
  const id = crypto.randomUUID();
  sessionStorage.setItem('ciu-player-id', id);
  return id;
}
