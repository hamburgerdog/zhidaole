import Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';

import SimoIcon from '@/assets/icons/SiMoSvg';
import SMoreIcon from '@/assets/icons/SMore';
import { RouterConfigList } from '@/router/config';

import styles from './index.module.less';

const { Sider } = Layout;

const menuListConfig = RouterConfigList.map(({ menuName, menuIcon, path, unDelable }) => {
  const isRootPath = path === '/';
  const itemPath = isRootPath ? path : '/' + path;

  return {
    menuName: menuName,
    icon: menuIcon,
    path: itemPath,
    unDelable: unDelable,
  };
});

const LayoutSider = memo(({ collapsed }) => {
  const { pathname } = useLocation();
  const [menuList] = useState(menuListConfig);
  const navigate = useNavigate();

  const menuItemNav = useCallback((path, history) => {
    navigate(path, { state: { ...history } });
  }, []);

  const selectKeys = useMemo(() => {
    return [pathname];
  }, [pathname]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={classNames(styles.logo, collapsed && styles.shortLogo)}>
        <Icon component={SimoIcon} />
        <Icon component={SMoreIcon} />
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={selectKeys}>
        {menuList.map(({ menuName, icon, path, unDelable = false }) => (
          <Menu.Item
            key={path}
            icon={icon}
            onClick={() => {
              menuItemNav(path, { menuName, path, unDelable });
            }}
          >
            {menuName}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
});

export default LayoutSider;
