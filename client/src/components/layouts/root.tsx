import type { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui';
import { Navbar } from '@/components/navbar';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster />
    </>
  );
};
