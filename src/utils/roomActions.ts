import { socket } from '../socket';
import type { Clue } from '../types/game';

function shuffleIndices(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function connect() {
  if (!socket.connected) socket.connect();
}

export function createRoom(
  playerId: string,
  playerName: string,
): Promise<{ code: string }> {
  return new Promise((resolve, reject) => {
    connect();
    socket.emit(
      'createRoom',
      { playerId, playerName },
      (res: { code?: string; error?: string }) => {
        if (res.error || !res.code) reject(new Error(res.error ?? 'unknown'));
        else resolve({ code: res.code });
      },
    );
  });
}

export function joinRoom(
  code: string,
  playerId: string,
  playerName: string,
): Promise<{ error?: string }> {
  return new Promise((resolve) => {
    connect();
    socket.emit(
      'joinRoom',
      { code, playerId, playerName },
      (res: { error?: string }) => resolve(res),
    );
  });
}

export function setSelectedCase(code: string, caseId: 7 | 8 | 9 | 10): void {
  socket.emit('selectCase', { code, caseId });
}

export function startGame(code: string, playerIds: string[], allClues: Clue[]): void {
  const indices = shuffleIndices(allClues.length);
  const clueDistribution: Record<string, number[]> = {};
  playerIds.forEach((id, i) => {
    clueDistribution[id] = indices.filter((_, idx) => idx % playerIds.length === i);
  });
  socket.emit('startGame', { code, clueDistribution });
}

export function setPlayerReady(code: string, playerId: string): void {
  socket.emit('setReady', { code, playerId });
}

export function advanceToAccusation(code: string): void {
  socket.emit('advanceToAccusation', { code });
}

export function submitAccusation(code: string, choice: string, correct: boolean): void {
  socket.emit('submitAccusation', { code, choice, correct });
}

export function resetRoom(code: string): void {
  socket.emit('resetRoom', { code });
}
