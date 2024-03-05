import { io } from 'socket.io-client';

import { getApiUrl } from './utils';

export const socket = io(getApiUrl(), {
  withCredentials: true,
  autoConnect: false,
});
