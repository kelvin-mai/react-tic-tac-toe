import { createServer } from 'http';
import { Server } from 'socket.io';

import { auth, type PublicUser } from '@/lib/auth';
import {
  type SocketState,
  addSocketUser,
  removeSocketUser,
  joinRoom,
  roomToUsers,
} from './state';

const verifySocketCookie = async (
  cookie: string,
): Promise<PublicUser | null> => {
  const sessionId = auth.readSessionCookie(cookie ?? '');
  if (sessionId) {
    const { user } = await auth.validateSession(sessionId);
    return user;
  } else {
    return null;
  }
};

export const createSocket = (server: ReturnType<typeof createServer>) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
    cookie: true,
  });

  let state: SocketState = {};

  io.on('connection', async (socket) => {
    const user = await verifySocketCookie(socket.request.headers.cookie ?? '');
    if (user) {
      socket.emit('connected', { socketId: socket.id, user });
      state = addSocketUser(state, { socketId: socket.id, user });
    }

    socket.on('join_room', async (gameId) => {
      state = joinRoom(state, { socketId: socket.id, room: gameId });
      socket.join(gameId);
      socket.emit('active_players', roomToUsers(state, gameId));
      if (state[socket.id].user) {
        socket.broadcast.to(gameId).emit('join_room', state[socket.id]);
        socket.broadcast
          .to(gameId)
          .emit('active_players', roomToUsers(state, gameId));
      }
    });

    socket.on('join_game', async (gameId) => {
      socket.broadcast.to(gameId).emit('join_game', state[socket.id]);
      socket.broadcast
        .to(gameId)
        .emit('active_players', roomToUsers(state, gameId));
    });

    socket.on('play_game', async (gameId) => {
      socket.broadcast.to(gameId).emit('play_game');
    });

    socket.on('disconnect', () => {
      const user = state[socket.id];
      state = removeSocketUser(state, socket.id);
      if (user && user.room) {
        io.to(user.room).emit('leave', user);
        io.to(user.room).emit('active_players', roomToUsers(state, user.room));
      }
    });
  });

  return io;
};
