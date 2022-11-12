import { Card, notification } from 'antd';
import React, { memo, useCallback, useEffect, useState } from 'react';

import useUser from '@/hooks/useUser';
import { getMessage } from '@/service/admin';
import { NOTIFICATION_DURATION } from '@/utils/common';

import MessageTable from './MessageTable';

const mapDataToColumns = list => {
  return list.map((item, index) => {
    const msgDatail = item.msgDetail;
    const short = msgDatail.length > 12 ? `${msgDatail.substring(0, 12)}...` : msgDatail;

    return {
      key: index,
      messsageID: item.messageID,
      name: item.msgTitle,
      address: item.location.title,
      short,
      endTime: item.endTime,
      connect: item.connect,
      originID: item.releaseSourceID,
    };
  });
};

const Message = memo(() => {
  const [user] = useUser();
  const [messageList, setMessageList] = useState([]);

  const getmessageList = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token !== null && user.name === token) {
      const { data } = await getMessage();
      let copyMoreList = [...data, ...data, ...data];
      copyMoreList = [...copyMoreList, ...copyMoreList, ...copyMoreList];
      setMessageList(mapDataToColumns(copyMoreList));
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
  }, [messageList]);

  useEffect(() => {
    getmessageList();
  }, [user]);

  return (
    <div>
      <Card title="知到啦·消息管理">
        <MessageTable data={messageList} />
      </Card>
    </div>
  );
});

export default Message;
