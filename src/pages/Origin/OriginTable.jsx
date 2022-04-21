import { Button, Space, Table } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';

import styles from './index.module.less';

const columns = [
  {
    title: '消息源名称',
    dataIndex: 'name',
  },
  {
    title: '消息数量',
    dataIndex: 'amout',
  },
  {
    title: '是否公开',
    dataIndex: 'published',
  },
  {
    title: '消息源ID',
    dataIndex: 'releaseID',
  },
  {
    title: '管理员ID',
    dataIndex: 'rootID',
  },
  {
    title: '操作',
    align: 'center',
    key: 'action',
    width: 180,
    fixed: 'right',
    render: () => (
      <Space size="middle">
        <Button type="link">暂停发布</Button>
        <Button type="link">删除</Button>
      </Space>
    ),
  },
];

const OriginTable = memo(({ data }) => {
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
          defaultPageSize: 7,
          showLessItems: true,
          showQuickJumper: true,
          size: 'small',
        }}
      />
    </>
  );
});

export default OriginTable;
