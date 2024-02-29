import type { FC, PropsWithChildren } from 'react';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='grid md:grid-cols-[2fr_3fr] lg:grid-cols-2'>
      <div className='hidden h-screen w-full bg-slate-900 md:block'></div>
      <div className='container'>
        <div className='flex h-screen items-center justify-center'>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </main>
  );
};
