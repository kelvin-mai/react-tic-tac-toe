import type { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui';

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
