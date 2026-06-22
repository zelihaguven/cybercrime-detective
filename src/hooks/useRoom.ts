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

    function fetchRoom() {
      socket.emit('getRoom', { code: roomCode, playerId }, (err: string | null, data: { room?: Room }) => {
        if (err) {
          setError(err);
          setLoading(false);
        } else if (data?.room) {
          setRoom(data.room);
          setLoading(false);
        }
      });
    }

    const handleUpdate = (updated: Room) => {
      if (updated.code === roomCode) {
        setRoom(updated);
        setLoading(false);
        setError(null);
      }
    };

    const handleReconnect = () => fetchRoom();

    socket.on('roomUpdate', handleUpdate);
    socket.on('connect', handleReconnect);

    fetchRoom();

    return () => {
      socket.off('roomUpdate', handleUpdate);
      socket.off('connect', handleReconnect);
    };
  }, [roomCode, playerId]);

  const myPlayer = room?.players?.[playerId] ?? null;
  return { room, loading, error, myPlayer };
}
