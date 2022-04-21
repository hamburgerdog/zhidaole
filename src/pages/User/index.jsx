import { Card } from 'antd';
import React, { memo } from 'react';

import UserTable from './UserTable';

const User = memo(() => {
  return (
    <div>
      <Card title="知到啦·活跃用户">
        <UserTable />
      </Card>
    </div>
  );
});

export default User;
