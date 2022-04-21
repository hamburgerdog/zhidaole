import { DashboardFilled, HomeFilled, UserOutlined } from '@ant-design/icons';
import React, { lazy } from 'react';

import { Home } from '@/pages/Home';

const User = lazy(() => import('@/pages/User'));
const Origin = lazy(() => import('@/pages/Origin'));

export const RouterConfigList = [
  {
    menuName: '知到啦',
    menuIcon: <HomeFilled />,
    path: '/',
    element: <Home />,
    unDelable: true,
  },
  {
    menuName: '用户管理',
    menuIcon: <UserOutlined />,
    path: 'user',
    element: <User />,
  },
  {
    menuName: '消息源管理',
    menuIcon: <DashboardFilled />,
    path: 'origin',
    element: <Origin />,
  },
];
