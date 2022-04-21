import { Card, notification } from 'antd';
import React, { memo, useCallback,useEffect , useState  } from 'react';

import useUser from '@/hooks/useUser';
import { getMessage } from '@/service/admin';

import OriginTable from './OriginTable';

const Origin = memo(() => {
  const [user] = useUser();
  const [originList, setOriginList] = useState([]);

  const getOriginList = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token !== null && user.name === token) {
      const { data } = await getMessage();
      setOriginList(data);
      notification.success({
        message: '查询数据成功',
      });
    } else {
      notification.error({
        message: '未找到用户的登录凭证！',
        description: '若当前用户已登陆请重新登录',
      });
    }
  }, [originList]);

  useEffect(() => {
    getOriginList();
  }, [user]);

  return (
    <div>
      <Card title="知到啦·消息管理">
        <OriginTable />
      </Card>
    </div>
  );
});

export default Origin;
