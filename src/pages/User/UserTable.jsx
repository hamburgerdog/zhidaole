import { Button, Space, Table } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';

import styles from './index.module.less';

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
  },
  {
    title: '创建消息源数量',
    dataIndex: 'pubReleaseAmout',
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
    render: () => (
      <Space size="middle">
        <Button type="link">详情</Button>
        <Button type="link">删除</Button>
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
