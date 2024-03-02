import { catchErrors, http } from '@/lib/http';

import { ApiResponse } from './types';

export type AuthPayload = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
};

export type Session = {
  id: string;
  userId: string;
  fresh: boolean;
  expiresAt: string;
};

export const getUser = async (): Promise<
  ApiResponse<{ user: User; session: Session }>
> => {
  try {
    const { data } = await http.get('/user');
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const register = async (payload: AuthPayload): Promise<ApiResponse> => {
  try {
    const { data } = await http.post('/register', payload);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const login = async (payload: AuthPayload): Promise<ApiResponse> => {
  try {
    const { data } = await http.post('/login', payload);
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};

export const logout = async (): Promise<ApiResponse> => {
  try {
    const { data } = await http.post('/logout', {});
    return data;
  } catch (e) {
    return catchErrors(e);
  }
};
