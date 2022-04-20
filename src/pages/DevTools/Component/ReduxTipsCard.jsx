import { Card, Statistic } from 'antd';
import React, { PureComponent } from 'react';

class ReduxTipsCard extends PureComponent {
  state = {};
  render() {
    return (
      <Card title={'redux 使用提醒'}>
        <Statistic title="源码位置" value={'src/pages/DevTools/ReduxDemoCard.jsx'} />
        <Statistic title="状态仓库" value={'src/store/counterSlice.js'} />
      </Card>
    );
  }
}

export default ReduxTipsCard;
