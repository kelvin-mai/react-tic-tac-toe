import { type PublicUser } from '@/lib/auth';

export type SocketState = {
  [socketId: string]: {
    user: PublicUser;
    room?: string;
  };
};

export const addSocketUser = (
  state: SocketState,
  { socketId, user }: { socketId: string; user: PublicUser },
) => {
  return { ...state, [socketId]: { ...state[socketId], user } };
};

export const joinRoom = (
  state: SocketState,
  { socketId, room }: { socketId: string; room: string },
) => {
  return { ...state, [socketId]: { ...state[socketId], room } };
};

export const roomToUsers = (state: SocketState, room: string) => {
  return Object.keys(state)
    .map((k) => state[k])
    .filter((s) => s.room === room);
};

export const removeSocketUser = (
  state: SocketState,
  socketId: string,
): SocketState => {
  const { [socketId]: _, ...remaining } = state;
  return remaining;
};
