import Icon from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import classNames from 'classnames';
import React from 'react';

import SimoIcon from '@/assets/icons/SiMoSvg';
import SMoreIcon from '@/assets/icons/SMore';
import { RouterConfigList } from '@/router/config';
import { withRouter } from '@/utils/HoC/withRouter';

import styles from './index.module.less';

const { Sider } = Layout;

class LayoutSider extends React.Component {
  state = {
    menuList: RouterConfigList.map(({ menuName, menuIcon, path, unDelable }) => {
      const isRootPath = path === '/';
      const itemPath = isRootPath ? path : '/' + path;

      return {
        menuName: menuName,
        icon: menuIcon,
        path: itemPath,
        unDelable: unDelable,
      };
    }),
  };

  constructor() {
    super();
    this.state = {
      menuList: RouterConfigList.map(({ menuName, menuIcon, path, unDelable }) => {
        const isRootPath = path === '/';
        const itemPath = isRootPath ? path : '/' + path;

        return {
          menuName: menuName,
          icon: menuIcon,
          path: itemPath,
          unDelable: unDelable,
        };
      }),
    };
    this.menuItemNav = this.menuItemNav.bind(this);
  }

  menuItemNav(path, history) {
    const { navigate } = this.props;
    navigate(path, { state: { ...history } });
  }

  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate() {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  render() {
    const { menuList } = this.state;
    const {
      collapsed,
      location: { pathname },
    } = this.props;

    const selectKeys = [pathname];

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
                this.menuItemNav(path, { menuName, path, unDelable });
              }}
            >
              {menuName}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(LayoutSider);
