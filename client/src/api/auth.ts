import { http } from '@/lib/http';

export type AuthPayload = {
  username: string;
  password: string;
};

export const getUser = async () => {
  return await http.get('/user');
};

export const register = async (data: AuthPayload) => {
  return await http.post('/register', data);
};

export const login = async (data: AuthPayload) => {
  return await http.post('/login', data);
};

export const logout = async () => {
  return await http.post('/logout', {});
};
