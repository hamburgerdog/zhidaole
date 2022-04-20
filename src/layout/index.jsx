import { Layout } from 'antd';
import React from 'react';

import styles from './index.module.less';
import { LayoutContent } from './LayoutContent';
import LayoutSider from './LayoutSider';

export class SimpleLayout extends React.Component {
  state = {
    collapsed: true,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate(prevProp) {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className={styles.LayoutBox}>
        <LayoutSider collapsed={collapsed} />
        {/* 内容 */}
        <LayoutContent collapsed={collapsed} toggle={this.toggle}>
          {this.props.children}
        </LayoutContent>
      </Layout>
    );
  }
}
