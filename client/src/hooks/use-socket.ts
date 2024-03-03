import { useEffect, useState } from 'react';

import { socket } from '@/lib/socket';

export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (!connected) {
      socket.connect();
      setConnected(true);
    }
    return () => {
      socket.disconnect();
    };
  }, []);
  return socket;
};
