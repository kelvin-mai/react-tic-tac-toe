import { Outlet, RouteObject } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth';

export const authRoutes: RouteObject = {
  path: '/auth/',
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: [
    {
      path: 'login',
      lazy: () => import('@/pages/auth/login'),
    },
    {
      path: 'register',
      lazy: () => import('@/pages/auth/register'),
    },
  ],
};
