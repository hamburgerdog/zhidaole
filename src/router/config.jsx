import {
  DashboardOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { lazy } from 'react';

import { Home } from '@/pages/Home';

const User = lazy(() => import('@/pages/User'));
const Origin = lazy(() => import('@/pages/Origin'));
const Message = lazy(() => import('@/pages/Message'));

export const RouterConfigList = [
  {
    menuName: '知到啦',
    menuIcon: <HomeOutlined />,
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
    menuIcon: <DashboardOutlined />,
    path: 'origin',
    element: <Origin />,
  },
  {
    menuName: '通知管理',
    menuIcon: <MessageOutlined />,
    path: 'message',
    element: <Message />,
  },
];
