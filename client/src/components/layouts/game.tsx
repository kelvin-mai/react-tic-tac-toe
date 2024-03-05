import type { FC, PropsWithChildren } from 'react';

export const GameLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className='container pt-8'>{children}</main>;
};
