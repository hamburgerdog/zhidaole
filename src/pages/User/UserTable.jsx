import { Table } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';

import styles from './index.module.less';

const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '用户ID',
    dataIndex: 'age',
  },
  {
    title: '通讯方式',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const UserTable = memo(() => {
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
