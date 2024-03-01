import { Outlet, createBrowserRouter } from 'react-router-dom';

import { Component as HomePage } from '@/pages/home';
import { authRoutes } from './auth';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
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
