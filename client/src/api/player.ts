import { http, catchErrors } from '@/lib/http';

import type { ApiResponse, ServerPagination } from './types';
import type { User } from './auth';
import type { GameWithPlayers } from './game';

export type Player = User & {
  _count: { gamesWon: number };
};

export const getPlayer = async (
  id: string,
  page?: number,
): Promise<
  ApiResponse<{
    player: Player;
    games: GameWithPlayers[];
    pagination: ServerPagination;
  }>
> => {
  const url = `/player/${id}?${page ? `page=${page}` : ''}`;
  try {
    const { data } = await http.get(url);
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
