import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { memo } from 'react';

import HistroyHeader from './component/Header/HistroyHeader';
import LanguaueSelector from './component/Header/LanguaueSelector';
import UserItem from './component/Header/UserItem';
import styles from './index.module.less';

const { Header } = Layout;

/**
 * 头部的配置
 */
const LayoutHeader = memo(props => {
  const { collapsed, toggle } = props;

  return (
    <>
      <Header className={styles.siteLayout} style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: styles.trigger,
          onClick: toggle,
        })}
        <div className={styles.headerRightSoltBox}>
          <LanguaueSelector />
          <UserItem />
        </div>
      </Header>
      <HistroyHeader />
    </>
  );
});

/**
 * 管理历史记录的头部
 */

export default LayoutHeader;
