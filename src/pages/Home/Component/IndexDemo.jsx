import { Card, Image, Progress, Space, Table, Tag } from 'antd';
import React, { memo } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const IndexDemoTable = memo(() => <Table columns={columns} dataSource={data} />);

export const IndexCard = memo(({ title }) => (
  <Card style={{ height: '100%' }} title={title}>
    <div>
      <Image src="https://github.com/iampavangandhi/iampavangandhi/raw/master/gifs/hello.gif?raw=true" />
    </div>
  </Card>
));

export const ModuleCardOne = memo(({ title }) => (
  <Card style={{ height: '100%' }} title={title}>
    <div>
      <Progress percent={30} size="small" />
      <Progress percent={50} size="small" status="active" />
      <Progress percent={70} size="small" status="exception" />
      <Progress percent={100} size="small" />
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} />
      <Progress percent={50} showInfo={false} />
    </div>
  </Card>
));

export const strokeColor = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

export const ModuleCardTwo = memo(({ title }) => (
  <Card style={{ height: '100%' }} title={title}>
    <div>
      <Progress strokeColor={strokeColor} percent={0} size="small" status="exception" />
      <Progress strokeColor={strokeColor} percent={30} size="small" status="exception" />
      <Progress strokeColor={strokeColor} percent={50} size="small" status="success" />
      <Progress strokeColor={strokeColor} percent={70} size="small" status="success" />
      <Progress strokeColor={strokeColor} percent={100} size="small" />
      <Progress strokeColor={strokeColor} percent={30} status="active" />
      <Progress strokeColor={strokeColor} percent={50} status="active" />
      <Progress strokeColor={strokeColor} percent={70} status="active" />
      <Progress strokeColor={strokeColor} percent={100} status="active" />
    </div>
  </Card>
));

export const ModuleCardThree = memo(({ title }) => (
  <Card style={{ height: '100%' }} title={title}>
    <div>
      <Progress type="dashboard" percent={75} />
      <Progress type="dashboard" percent={75} gapDegree={30} />
      <Progress type="circle" strokeColor={strokeColor} percent={90} />
      <Progress type="circle" strokeColor={strokeColor} percent={100} />
    </div>
  </Card>
));
