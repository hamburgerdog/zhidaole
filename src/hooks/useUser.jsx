import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { userState } from '@/store/userState';

const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  const userLogin = useCallback(
    username => {
      setUser({ ...user, name: username });
    },
    [user],
  );

  return { user, userLogin };
};

export default useUser;
