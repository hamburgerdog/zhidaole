import React, { Component } from 'react';

import styles from './index.module.less';

class HelloWorld extends Component {
  state = {};

  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate(prevProp) {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  render() {
    return <div className={styles.indexText}>Hello,world!!!</div>;
  }
}

export default HelloWorld;
