import { http, catchErrors } from '@/lib/http';

export const createGame = async () => {
  try {
    const { data } = await http.post('/game');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const getGame = async (id: string) => {
  try {
    const { data } = await http.get(`/game/${id}`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const playGame = async (id: string, index: number) => {
  try {
    const { data } = await http.post(`/game/${id}`, { index });
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const joinGame = async (id: string) => {
  try {
    const { data } = await http.post(`/game/${id}/join`);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
