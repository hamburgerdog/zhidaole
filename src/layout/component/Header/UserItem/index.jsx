import React, { memo } from 'react';
import { useRecoilState } from 'recoil';

import { userState } from '@/store/userState';

import styles from './index.module.less';

/**
 * 用户功能
 */

export const UserItem = memo(() => {
  const [user] = useRecoilState(userState);

  return (
    <div className={styles.headerUserBox}>
      <img src={user.avatar} alt="avatar" />
      <span>{user.name}</span>
    </div>
  );
});
