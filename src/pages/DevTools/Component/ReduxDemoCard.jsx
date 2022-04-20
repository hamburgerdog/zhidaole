import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, InputNumber, Row, Statistic } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { decrement, increment, incrementByAmount } from '@/store/counterSlice';

class ReduxDemoCard extends PureComponent {
  state = {
    inputNumberValue: 6,
  };

  constructor() {
    super();
    this.changeInputNumberValue = this.changeInputNumberValue.bind(this);
    this.incrementNumber = this.incrementNumber.bind(this);
    this.decrementNumber = this.decrementNumber.bind(this);
    this.incrementNumberByAmount = this.incrementNumberByAmount.bind(this);
  }

  //  组件初始化结束后使用
  // componentDidMount() {}

  //  组件是否要更新，第一个参数是之前的 props
  // shouldComponentUpdate(prevProp) {}

  //  组件更新完后可以执行的操作
  // componentDidUpdate(prevProp) {}

  //  组件退出前要可以执行的钩子
  // componentWillUnmount() {}

  changeInputNumberValue(value) {
    this.setState({
      inputNumberValue: value,
    });
  }

  incrementNumber() {
    this.props.increment();
  }

  decrementNumber() {
    this.props.decrement();
  }

  incrementNumberByAmount() {
    const { inputNumberValue } = this.state;
    this.props.incrementByAmount(inputNumberValue);
  }

  render() {
    const { inputNumberValue } = this.state;
    const { counter } = this.props;

    return (
      <Card title={'Redux 全局注册的演示'}>
        <Statistic title="Counter" value={counter} style={{ marginBottom: 12 }} />
        <Row gutter={24}>
          <Col>
            <Button type="default" icon={<MinusOutlined />} onClick={this.decrementNumber} />
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={this.incrementNumber} />
          </Col>
          <Col>
            <InputNumber value={inputNumberValue} onChange={this.changeInputNumberValue} />
            <Button type="primary" onClick={this.incrementNumberByAmount}>
              add
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

//  DI  依赖注入
const mapStateToProps = state => ({
  counter: state.counter.value,
});
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementByAmount: amout => dispatch(incrementByAmount(amout)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDemoCard);
