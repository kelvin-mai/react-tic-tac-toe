import {
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from 'react';

import { type User, getUser } from '@/api/auth';

export const AuthContext = createContext<[User | null, Function]>([
  null,
  () => {},
]);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser()
      .then((res) => setUser(res.user))
      .catch(console.log);
  }, []);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
