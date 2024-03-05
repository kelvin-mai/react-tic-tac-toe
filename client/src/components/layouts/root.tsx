import type { FC, PropsWithChildren } from 'react';

import { AuthProvider } from '@/context/auth';
import { Toaster } from '@/components/ui';
import { Navbar } from '@/components/common';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Toaster />
    </AuthProvider>
  );
};
