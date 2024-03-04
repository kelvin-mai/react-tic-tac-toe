import { http, catchErrors } from '@/lib/http';

import { ApiResponse } from './types';
import { User } from './auth';
import { GameWithPlayers } from './game';

export type Player = User & {
  _count: { gamesWon: number };
};

export const getPlayer = async (
  id: string,
): Promise<ApiResponse<{ player: Player; games: GameWithPlayers[] }>> => {
  try {
    const { data } = await http.get(`/player/${id}`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const getTopPlayers = async (): Promise<
  ApiResponse<{ players: Player[] }>
> => {
  try {
    const { data } = await http.get('/player/top');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
