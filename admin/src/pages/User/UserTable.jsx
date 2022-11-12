import { Space, Table, Typography } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';

import ButtonWithConfirm from '@/components/ButtonWithConfirm';

import styles from './index.module.less';
import ShowDetailButton from './ShowDetailButton';

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '用户ID',
    dataIndex: 'userID',
  },
  {
    title: '订阅消息源数量',
    dataIndex: 'subReleaseAmout',
    align: 'center',
    render: text => {
      return <Typography.Link type="success">{text}</Typography.Link>;
    },
  },
  {
    title: '创建消息源数量',
    dataIndex: 'pubReleaseAmout',
    align: 'center',
    render: text => {
      return <Typography.Link type="success">{text}</Typography.Link>;
    },
  },
  {
    title: '电子邮件',
    dataIndex: 'email',
  },
  {
    title: '操作',
    align: 'center',
    key: 'action',
    width: 140,
    fixed: 'right',
    render: (_, { name, pubReleaseList, subReleaseList }) => (
      <Space size="middle">
        <ShowDetailButton
          title={name}
          buttonName="查看详情"
          pubIDList={pubReleaseList}
          subIDList={subReleaseList}
        />
        <ButtonWithConfirm
          name="删除"
          type="link"
          title="请确认是否删除该名用户？"
          handleConfirm={() => {}}
        />
      </Space>
    ),
  },
];

const UserTable = memo(({ data }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = useCallback(
    selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    },
    [setSelectedRowKeys],
  );

  const rowSelection = useMemo(() => {
    return { selectedRowKeys, onChange: onSelectChange };
  }, [selectedRowKeys, onSelectChange]);

  return (
    <>
      <Table
        className={styles.tablex}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 8,
          showLessItems: true,
          showQuickJumper: true,
          size: 'small',
        }}
      />
    </>
  );
});

export default UserTable;
