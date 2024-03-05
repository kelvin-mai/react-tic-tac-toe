import { useContext } from 'react';

import { AuthContext } from '@/context/auth';
import {
  type AuthPayload,
  getUser,
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
} from '@/api/auth';

export const useAuth = () => {
  const [user, setUser] = useContext(AuthContext);

  const login = async (data: AuthPayload) => {
    const { success, error } = await apiLogin(data);
    if (success) {
      const { user } = await getUser();
      setUser(user);
    } else {
      return error;
    }
  };

  const register = async (data: AuthPayload) => {
    const { success, error } = await apiRegister(data);
    if (success) {
      const { user } = await getUser();
      setUser(user);
    } else {
      return error;
    }
  };

  const logout = async () => {
    const { success, error } = await apiLogout();
    if (success) {
      setUser(null);
    } else {
      return error;
    }
  };

  return {
    user,
    login,
    register,
    logout,
  };
};
