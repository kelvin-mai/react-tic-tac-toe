import { http, catchErrors } from '@/lib/http';

import { ApiResponse } from './types';
import { User } from './auth';

export type BoardState = ReadonlyArray<string | undefined> & { length: 9 };

export type GameState = {
  gameId: string;
  turn: number;
  state: BoardState;
};

export type Game = {
  id: string;
  playerXId: string;
  playerOId: string | null;
  currentState?: GameState;
  gameStates?: GameState[];
};

export type GameWithPlayers = Game & { playerX: User } & (
    | { playerOId: string; playerO: User }
    | { playerOId: null; playerO: null }
  );

export const getGames = async (
  criteria: string,
): Promise<ApiResponse<{ games: GameWithPlayers[] }>> => {
  try {
    const { data } = await http.get(`/game?criteria=${criteria}`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const createGame = async (): Promise<ApiResponse<{ game: Game }>> => {
  try {
    const { data } = await http.post('/game');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const getGame = async (
  id: string,
): Promise<ApiResponse<{ game: Game }>> => {
  try {
    const { data } = await http.get(`/game/${id}`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const playGame = async (
  id: string,
  index: number,
): Promise<ApiResponse<{ game: Game }>> => {
  try {
    const { data } = await http.post(`/game/${id}`, { index });
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const joinGame = async (
  id: string,
): Promise<ApiResponse<{ game: Game }>> => {
  try {
    const { data } = await http.post(`/game/${id}/join`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
