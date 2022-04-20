import { DeploymentUnitOutlined, HomeFilled, RocketFilled } from '@ant-design/icons';
import React from 'react';

import Home from '@/pages/Home';

const DevTools = React.lazy(() => import('@/pages/DevTools'));
const TeamConfig = React.lazy(() => import('@/pages/TeamConfig'));

export const RouterConfigList = [
  {
    menuName: 'Home',
    menuIcon: <HomeFilled />,
    path: '/',
    element: <Home />,
    unDelable: true,
  },
  {
    menuName: 'Dev Tools',
    menuIcon: <RocketFilled />,
    path: 'devTools',
    element: <DevTools />,
  },
  {
    menuName: 'Team Config',
    menuIcon: <DeploymentUnitOutlined />,
    path: 'teamConfig',
    element: <TeamConfig />,
  },
];
