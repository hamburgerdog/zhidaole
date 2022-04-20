import { Col, Row } from 'antd';
import React, { Component } from 'react';

import ReduxDemoCard from './Component/ReduxDemoCard';
import ReduxTipsCard from './Component/ReduxTipsCard';
import styles from './index.module.less';

class DevTools extends Component {
  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate() {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  render() {
    return (
      <div className={styles.indexBox}>
        <Row gutter="12">
          <Col span={12}>
            <ReduxDemoCard />
          </Col>
          <Col span={12}>
            <ReduxTipsCard />
          </Col>
        </Row>
        <Row>
          <div id="DevG2Container"></div>
        </Row>
      </div>
    );
  }
}

export default DevTools;
