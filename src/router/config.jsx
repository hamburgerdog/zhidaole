import { DashboardFilled, HomeFilled } from '@ant-design/icons';
import React, { lazy } from 'react';

import { Home } from '@/pages/Home';

const Dashboard = lazy(() => import('@/pages/Dashboard'));

export const RouterConfigList = [
  {
    menuName: 'Home',
    menuIcon: <HomeFilled />,
    path: '/',
    element: <Home />,
    unDelable: true,
  },
  {
    menuName: 'Dashboard',
    menuIcon: <DashboardFilled />,
    path: 'dashboard',
    element: <Dashboard />,
  },
];
