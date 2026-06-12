import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// No env var in production → same-origin (Express serves both frontend and backend)
export const socket = SERVER_URL
  ? io(SERVER_URL, { autoConnect: false })
  : io({ autoConnect: false });
