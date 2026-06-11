export type RoomStatus = 'waiting' | 'active' | 'complete';
export type RoomPhase = 'lobby' | 'clue-review' | 'accusation' | 'result';

export interface RoomPlayer {
  name: string;
  isHost: boolean;
  clueIndices: number[];
  ready: boolean;
  connected: boolean;
  joinedAt: number;
}

export interface Room {
  hostId: string;
  status: RoomStatus;
  selectedCase: 7 | 8;
  phase: RoomPhase;
  createdAt: number;
  expiresAt: number;
  accusationResult: { choice: string; correct: boolean } | null;
  players: Record<string, RoomPlayer>;
}
