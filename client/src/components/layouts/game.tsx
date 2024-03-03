import { FC, PropsWithChildren } from 'react';

export const GameLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className='container'>{children}</main>;
};
