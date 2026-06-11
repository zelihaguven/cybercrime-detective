export function getOrCreatePlayerId(): string {
  const stored = sessionStorage.getItem('ciu-player-id');
  if (stored) return stored;
  const id = crypto.randomUUID();
  sessionStorage.setItem('ciu-player-id', id);
  return id;
}
