import { useEffect, useState } from 'react';
import { socket } from '../socket';
import type { Room } from '../types/room';

interface UseRoomReturn {
  room: Room | null;
  loading: boolean;
  error: string | null;
  myPlayer: Room['players'][string] | null;
}

export function useRoom(roomCode: string | null, playerId: string): UseRoomReturn {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomCode) {
      setLoading(false);
      return;
    }

    if (!socket.connected) socket.connect();

    const handleUpdate = (updated: Room) => {
      if (updated.code === roomCode) {
        setRoom(updated);
        setLoading(false);
        setError(null);
      }
    };

    const handleConnectError = () => {
      setError('connection_error');
      setLoading(false);
    };

    socket.on('roomUpdate', handleUpdate);
    socket.on('connect_error', handleConnectError);

    // Fetch current state (covers the case where we navigate into an existing room)
    socket.emit('getRoom', { code: roomCode }, (res: { room?: Room; error?: string }) => {
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else if (res.room) {
        setRoom(res.room);
        setLoading(false);
      }
    });

    return () => {
      socket.off('roomUpdate', handleUpdate);
      socket.off('connect_error', handleConnectError);
    };
  }, [roomCode, playerId]);

  const myPlayer = room?.players?.[playerId] ?? null;
  return { room, loading, error, myPlayer };
}
