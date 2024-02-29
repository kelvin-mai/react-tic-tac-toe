import { Outlet, createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/game',
        lazy: () => import('@/pages/game'),
      },
    ],
  },
]);
