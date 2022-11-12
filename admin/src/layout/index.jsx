import { Layout } from 'antd';
import React, { memo, useCallback, useState } from 'react';

import styles from './index.module.less';
import { LayoutContent } from './LayoutContent';
import LayoutSider from './LayoutSider';

export const SimpleLayout = memo(({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Layout className={styles.LayoutBox}>
      <LayoutSider collapsed={collapsed} />
      {/* 内容 */}
      <LayoutContent collapsed={collapsed} toggle={toggle}>
        {children}
      </LayoutContent>
    </Layout>
  );
});
