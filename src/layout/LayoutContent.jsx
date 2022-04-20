import { Layout } from 'antd';
import React from 'react';

import styles from './index.module.less';
import LayoutHeader from './LayoutHeader';

const { Content } = Layout;

export class LayoutContent extends React.Component {
  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate(prevProp) {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  render() {
    const { collapsed, toggle } = this.props;

    return (
      <Layout>
        {/* 内容的固定头部 */}
        <LayoutHeader collapsed={collapsed} toggle={toggle} />
        {/* 内容的动态路由区域 */}
        <Content className={styles.contentBox}>{this.props.children}</Content>
      </Layout>
    );
  }
}
