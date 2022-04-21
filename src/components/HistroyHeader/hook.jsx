import { cloneDeep } from 'lodash';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { RouterConfigList } from '@/router/config';

const initNavHistoryMap = () => {
  const path = RouterConfigList[0].path;
  const isRootPath = path === '/';
  const routerPath = isRootPath ? path : '/' + path;

  const indexItem = {
    menuName: RouterConfigList[0].menuName,
    path: routerPath,
    unDelable: RouterConfigList[0].unDelable,
  };
  const historyMap = new Map();
  historyMap.set(indexItem.path, indexItem);
  return historyMap;
};

export const useNavHistoryMap = () => {
  const location = useLocation();
  const [navHistoryMap, setNavHistoryMap] = useState(initNavHistoryMap());

  const afterChangeRouter = useCallback(() => {
    if (!navHistoryMap.has(location.pathname)) {
      addHistory();
    }
  }, [navHistoryMap, location]);

  const addHistory = useCallback(() => {
    const { pathname: path, state: history } = location;
    const curNavHistoryMap = cloneDeep(navHistoryMap);
    curNavHistoryMap.set(path, history);
    setNavHistoryMap(curNavHistoryMap);
  }, [location, navHistoryMap]);

  const removeHistory = useCallback(() => {
    const { pathname: path } = location;
    const curNavHistoryMap = cloneDeep(navHistoryMap);
    curNavHistoryMap.delete(path);
    setNavHistoryMap(curNavHistoryMap);
  }, [navHistoryMap, location]);

  return { navHistoryMap, afterChangeRouter, removeHistory };
};
