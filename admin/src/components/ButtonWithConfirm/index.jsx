import { Button, Popconfirm } from 'antd';
import React, { memo } from 'react';

const ButtonWithConfirm = memo(({ title, handleConfirm, name, type }) => {
  return (
    <div>
      <Popconfirm
        placement="topRight"
        title={title}
        onConfirm={handleConfirm}
        overlayStyle={{ maxWidth: 200 }}
      >
        <Button type={type}>{name}</Button>
      </Popconfirm>
    </div>
  );
});

export default ButtonWithConfirm;
