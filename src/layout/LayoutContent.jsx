import { Layout } from 'antd';
import React, { memo } from 'react';

import styles from './index.module.less';
import LayoutHeader from './LayoutHeader';

const { Content } = Layout;

export const LayoutContent = memo(({ collapsed, toggle, children }) => {
  return (
    <Layout>
      {/* 内容的固定头部 */}
      <LayoutHeader collapsed={collapsed} toggle={toggle} />
      {/* 内容的动态路由区域 */}
      <Content className={styles.contentBox}>{children}</Content>
    </Layout>
  );
});
