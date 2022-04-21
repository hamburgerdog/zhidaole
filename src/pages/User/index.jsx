import { Card, notification } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';
import { getUser } from '@/service/admin';
import { NOTIFICATION_DURATION } from '@/utils/common';

import UserTable from './UserTable';

const mapDataToColumn = list => {
  return list.map(
    ({ Email, UserID, UserName, OwnReleaseMessageIDList, SubscribedSourcesIDList }, index) => {
      return {
        key: index,
        email: Email,
        userID: UserID,
        name: UserName,
        pubReleaseList: OwnReleaseMessageIDList,
        pubReleaseAmout: OwnReleaseMessageIDList.length,
        subReleaseList: SubscribedSourcesIDList,
        subReleaseAmout: SubscribedSourcesIDList.length,
      };
    },
  );
};

const User = memo(() => {
  const [user] = useUser();
  const [userList, setUserList] = useState([]);

  const getuserList = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token !== null && user.name === token) {
      const { data } = await getUser();
      setUserList(mapDataToColumn(data));
      notification.success({
        message: '查询数据成功',
        duration: NOTIFICATION_DURATION,
      });
    } else {
      notification.error({
        message: '未找到用户的登录凭证！',
        description: '若当前用户已登陆请重新登录',
        duration: NOTIFICATION_DURATION,
      });
    }
  }, [userList]);

  useEffect(() => {
    getuserList();
  }, [user]);

  return (
    <div>
      <Card title="知到啦·活跃用户">
        <UserTable data={userList} />
      </Card>
    </div>
  );
});

export default User;
