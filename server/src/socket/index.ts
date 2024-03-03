import { createServer } from 'http';
import { Server } from 'socket.io';

import { auth, type PublicUser } from '@/lib/auth';
import {
  type SocketState,
  addSocketUser,
  removeSocketUser,
  joinRoom,
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
      if (state[socket.id].user) {
        socket.broadcast.to(gameId).emit('join_room', state[socket.id]);
      }
      console.log(state);
    });

    socket.on('join_game', async (gameId) => {
      socket.broadcast.to(gameId).emit('join_game', state[socket.id]);
    });

    socket.on('play_game', async (gameId) => {
      socket.broadcast.to(gameId).emit('play_game');
    });

    socket.on('leave', async () => {
      const user = state[socket.id];
      console.log('user disconnect', user);
      if (user.room) {
        console.log('user.room', user.room);
        socket.broadcast.to(user.room).emit('leave', user);
      }
    });

    socket.on('disconnect', () => {
      const user = state[socket.id];
      console.log('user disconnect', user);
      if (user && user.room) {
        console.log('user.room', user.room);
        io.to(user.room).emit('leave', user);
      }

      state = removeSocketUser(state, socket.id);
      console.log('socket state', state);
    });
  });

  return io;
};
