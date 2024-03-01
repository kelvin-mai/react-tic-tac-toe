import { catchErrors, http } from '@/lib/http';

export type AuthPayload = {
  username: string;
  password: string;
};

export const getUser = async () => {
  try {
    const { data } = await http.get('/user');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const register = async (payload: AuthPayload) => {
  try {
    const { data } = await http.post('/register', payload);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const login = async (payload: AuthPayload) => {
  try {
    const { data } = await http.post('/login', payload);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const logout = async () => {
  try {
    const { data } = await http.post('/logout', {});
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
