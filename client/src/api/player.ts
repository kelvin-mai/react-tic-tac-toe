import { http, catchErrors } from '@/lib/http';

import { ApiResponse } from './types';
import { User } from './auth';

export type Player = User & {
  _count: { gamesWon: number };
};

export const getTopPlayers = async (): Promise<
  ApiResponse<{ players: Player[] }>
> => {
  try {
    const { data } = await http.get('/player');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
