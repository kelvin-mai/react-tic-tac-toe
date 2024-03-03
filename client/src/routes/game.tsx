import { Outlet, RouteObject } from 'react-router';

import { GameLayout } from '@/components/layouts/game';

export const gameRoutes: RouteObject = {
  path: '/game/',
  element: (
    <GameLayout>
      <Outlet />
    </GameLayout>
  ),
  children: [
    {
      path: ':id',
      lazy: () => import('@/pages/game/index'),
    },
    {
      path: ':id/play',
      lazy: () => import('@/pages/game/play'),
    },
    {
      path: ':id/replay',
      lazy: () => import('@/pages/game/replay'),
    },
  ],
};
