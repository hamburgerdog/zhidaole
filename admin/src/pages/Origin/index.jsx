import { Card, notification } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';
import { getRelease } from '@/service/admin';
import { NOTIFICATION_DURATION } from '@/utils/common';

import OriginTable from './OriginTable';

const mapDataToColumn = list => {
  return list.map(
    (
      { ReleaseSourceName, ReleaseMessageIDs, ReleaseSourceID, IsReleaseSourcePublished, RootIDs },
      index,
    ) => {
      return {
        key: index,
        name: ReleaseSourceName,
        amout: ReleaseMessageIDs.length,
        published: IsReleaseSourcePublished ? '是' : '否',
        rootID: RootIDs[0],
        releaseID: ReleaseSourceID,
      };
    },
  );
};

const Origin = memo(() => {
  const [user] = useUser();
  const [originList, setOriginList] = useState([]);

  const getOriginList = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token !== null && user.name === token) {
      const { data } = await getRelease();
      console.log(data);
      setOriginList(mapDataToColumn(data));
      notification.success({
        message: '查询数据成功',
        duration: NOTIFICATION_DURATION,
      });
    } else {
      notification.error({
        message: '未找到用户的登录凭证！',
        duration: NOTIFICATION_DURATION,
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
        <OriginTable data={originList} />
      </Card>
    </div>
  );
});

export default Origin;
