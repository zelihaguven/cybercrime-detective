import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, onDisconnect, update } from 'firebase/database';
import type { Room, RoomPlayer } from '../types/room';

interface UseRoomReturn {
  room: Room | null;
  loading: boolean;
  error: string | null;
  myPlayer: RoomPlayer | null;
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

    const roomRef = ref(db, `rooms/${roomCode}`);
    const playerRef = ref(db, `rooms/${roomCode}/players/${playerId}/connected`);

    // Mark connected; mark disconnected on network drop
    update(ref(db, `rooms/${roomCode}/players/${playerId}`), { connected: true });
    onDisconnect(playerRef).set(false);

    const unsub = onValue(
      roomRef,
      (snap) => {
        if (!snap.exists()) {
          setError('room_not_found');
          setRoom(null);
        } else {
          setRoom(snap.val() as Room);
          setError(null);
        }
        setLoading(false);
      },
      () => {
        setError('connection_error');
        setLoading(false);
      },
    );

    return () => {
      unsub();
      // Mark as disconnected on component unmount (clean navigation)
      update(ref(db, `rooms/${roomCode}/players/${playerId}`), { connected: false });
    };
  }, [roomCode, playerId]);

  const myPlayer = room?.players?.[playerId] ?? null;

  return { room, loading, error, myPlayer };
}
