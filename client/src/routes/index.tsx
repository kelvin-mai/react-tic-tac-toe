import { Outlet, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layouts/root';
import { Component as HomePage } from '@/pages/home';
import { authRoutes } from './auth';
import { gameRoutes } from './game';

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
        path: '/player/:id',
        lazy: () => import('@/pages/player'),
      },
      authRoutes,
      gameRoutes,
    ],
  },
]);
