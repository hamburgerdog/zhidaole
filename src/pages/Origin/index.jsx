import { Card } from 'antd';
import React, { memo } from 'react';

import OriginTable from './OriginTable';

const Origin = memo(() => {
  return (
    <div>
      <Card title="知到啦·消息管理">
        <OriginTable />
      </Card>
    </div>
  );
});

export default Origin;
