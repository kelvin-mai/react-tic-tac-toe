import { Outlet, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layouts/root';
import { Component as HomePage } from '@/pages/home';
import { authRoutes } from './auth';

export const router = createBrowserRouter([
  {
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/game/:id',
        lazy: () => import('@/pages/game'),
      },
      authRoutes,
    ],
  },
]);
