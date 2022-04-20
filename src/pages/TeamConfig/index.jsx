import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';

import styles from './index.module.less';

class TeamConfig extends Component {
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
    return (
      <div className={styles.indexBox}>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
          }}
        >
          <Col span={16}>
            <Row className={styles.itemRow}>
              <Col span={24}>
                <Card title="进行中的项目">
                  <Card.Grid hoverable={false}>Content</Card.Grid>
                  <Card.Grid hoverable={false}>Content</Card.Grid>
                  <Card.Grid hoverable={false}>Content</Card.Grid>
                </Card>
              </Col>
            </Row>
            <Row className={styles.itemRow}>
              <Col span={24}>
                <Card title="静态代码扫描"></Card>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Card style={{ height: '100%' }} title="团队提交概览" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeamConfig;
