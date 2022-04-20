import { Col, Image, Row } from 'antd';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import {
  IndexCard,
  IndexDemoTable,
  ModuleCardOne,
  ModuleCardThree,
  ModuleCardTwo,
} from './Component/IndexDemo';
import styles from './index.module.less';

class Home extends Component {
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
    const { t } = this.props;
    return (
      <div className={styles.indexBox}>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <IndexCard title={`xjosiah-simple-react-admin, ${t('welcome')} !`} />
          </Col>
          <Col span={4}>
            <ModuleCardOne title={t('module1')} />
          </Col>
          <Col span={4}>
            <ModuleCardTwo title={t('module2')} />
          </Col>
          <Col span={4}>
            <ModuleCardThree title={t('module3')} />
          </Col>
        </Row>
        <Row gutter={[12, 12]} style={{ marginTop: 24 }}>
          <Col span={16}>
            <IndexDemoTable />
          </Col>
          <Col span={8}>
            <Image src="https://raw.githubusercontent.com/onimur/.github/master/.resources/git-header.svg" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTranslation()(Home);
