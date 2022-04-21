import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleFilled,
  LikeOutlined,
  SyncOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Image, Progress, Row, Statistic, Tag, Typography } from 'antd';
import React, { memo } from 'react';

import styles from './index.module.less';

const { Paragraph, Title, Text } = Typography;

const strokeColor = {
  from: '#108ee9',
  to: '#87d068',
};

const cardGridCommonStyle = {
  width: '100%',
  height: 260,
};

export const Home = memo(() => {
  return (
    <div className={styles.homex}>
      <Row>
        <WelcomeCard />
      </Row>
      <Row gutter={8}>
        <Col span={8}>
          <UserTotalCard />
        </Col>
        <Col span={8}>
          <OriginTotalCard />
        </Col>
        <Col span={8}>
          <MessageTotalCard />
        </Col>
      </Row>
    </div>
  );
});

function MessageTotalCard() {
  return (
    <Card title="近期活动统计">
      <Card.Grid style={cardGridCommonStyle}>
        <Row>
          <div>
            <Tag color="success" icon={<CheckCircleFilled />}>
              用户消息发布
            </Tag>
            <Tag color="success" icon={<SyncOutlined />}>
              消息数量增长
            </Tag>
            <Tag color="error" icon={<LikeOutlined />}>
              Admin
            </Tag>
          </div>
        </Row>
        <Row>
          <Col span={8}>
            <Statistic title="user" value={128} prefix={<UserAddOutlined />} />
          </Col>
          <Col span={8}>
            <Statistic valueStyle={{ color: '#3f8600' }} title="active" value={37} suffix="/ 128" />
          </Col>
          <Col span={8}>
            <Paragraph style={{ width: '100%' }}>
              <Statistic
                title="active/total"
                valueRender={() => (
                  <Progress strokeColor={strokeColor} percent={28.9} status="active" />
                )}
              />
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Statistic title="message" value={279} prefix={<UserAddOutlined />} />
          </Col>
          <Col span={8}>
            <Statistic
              valueStyle={{ color: '#3f8600' }}
              title="active"
              value={203}
              suffix="/ 279"
            />
          </Col>
          <Col span={8}>
            <Paragraph style={{ width: '100%' }}>
              <Statistic
                title="active/total"
                valueRender={() => (
                  <Progress strokeColor={strokeColor} percent={72.7} status="active" />
                )}
              />
            </Paragraph>
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  );
}

function OriginTotalCard() {
  return (
    <Card title="消息源信息汇总">
      <Card.Grid style={cardGridCommonStyle}>
        <Row>
          <div>
            <Tag color="success" icon={<CheckCircleFilled />}>
              分享
            </Tag>
            <Tag color="success" icon={<SyncOutlined />}>
              消息源
            </Tag>
            <Tag color="error" icon={<LikeOutlined />}>
              Flow
            </Tag>
            <Tag icon={<UsergroupAddOutlined />}>Add</Tag>
            <Tag>Origin</Tag>
          </div>
        </Row>
        <Row>
          <Paragraph style={{ width: '100%' }}>
            <Text type="secondary">通知源整体活跃度计算：</Text>
            <Progress strokeColor={strokeColor} percent={76.8} status="active" />
          </Paragraph>
          <Paragraph style={{ width: '100%' }}>
            <Text type="success">本周活跃度：</Text>
            <Progress showInfo={false} steps={14} percent={90} />
          </Paragraph>
          <Paragraph style={{ width: '100%' }}>
            <Text type="success">当月活跃度：</Text>
            <Progress showInfo={false} steps={14} percent={78} />
          </Paragraph>
        </Row>
      </Card.Grid>
    </Card>
  );
}

function UserTotalCard() {
  return (
    <Card title={'当前用户数量'}>
      <Card.Grid style={cardGridCommonStyle}>
        <Row>
          <div>
            <Tag color="success" icon={<CheckCircleFilled />}>
              用户活跃中
            </Tag>
            <Tag color="success" icon={<SyncOutlined />}>
              用户数据增长中
            </Tag>
            <Tag color="error" icon={<LikeOutlined />}>
              Like
            </Tag>
          </div>
        </Row>
        <Row>
          <Col span={12}>
            <Statistic
              valueStyle={{ color: '#cf1322' }}
              title="like"
              value={12}
              prefix={<LikeOutlined />}
            />
            <Statistic valueStyle={{ color: '#3f8600' }} title="active" value={60} suffix="/ 128" />
            <Button style={{ marginTop: 16 }} type="primary">
              Reflesh
            </Button>
          </Col>
          <Col span={12}>
            <Statistic
              title="Like"
              value={1.2}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  );
}

function WelcomeCard() {
  return (
    <Card title="知到啦，欢迎您！" style={{ width: '100%' }}>
      <Card.Grid style={{ width: '100%' }} className={styles.bodyx}>
        <div>
          <Image src="https://github.com/iampavangandhi/iampavangandhi/raw/master/gifs/hello.gif?raw=true" />
        </div>
        <div>
          <Typography>
            <Title>知到啦·后台管理系统</Title>
            <Text type="success">1. 清晰简洁，功能完善</Text>
            <br />
            <Text type="warning">2. 一览系统全貌提供管理支持</Text>
            <br />
            <Text type="success">3. Web端程序，快速开发</Text>
            <br />
            <Text type="warning">4. 让消息流动起来</Text>
          </Typography>
        </div>
      </Card.Grid>
    </Card>
  );
}
