import { CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classNames from 'classnames';
import React, { memo, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useNavHistoryMap } from './hook';
import styles from './index.module.less';

const { Header } = Layout;

const HistoryHeader = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { navHistoryMap, afterChangeRouter, removeHistory } = useNavHistoryMap();
  const navHistoryMapKeyList = useMemo(() => [...navHistoryMap.keys()], [navHistoryMap]);

  useEffect(() => {
    afterChangeRouter();
  }, [location]);

  return (
    <Header className={styles.historyHeader} style={{ padding: 0 }}>
      {navHistoryMapKeyList.map((key, curIndex) => {
        const curHistory = navHistoryMap.get(key);
        const { path } = curHistory;
        const curItemBeSelected = path === location.pathname;

        const nextPath = getNextItem(navHistoryMapKeyList, curIndex);
        const nextHistory = navHistoryMap.get(nextPath);

        return (
          <HistoryHeaderItem
            key={path}
            curHistory={curHistory}
            curItemBeSelected={curItemBeSelected}
            handleClick={curHistory => {
              navigate(curHistory.path, { state: curHistory });
            }}
            handleRemove={() => {
              removeHistory(navigate, nextPath, nextHistory);
              navigate(nextPath, { state: nextHistory });
            }}
          />
        );
      })}
    </Header>
  );
});

class HistoryHeaderItem extends React.Component {
  render() {
    const { curHistory, curItemBeSelected, handleClick, handleRemove } = this.props;
    const { path, menuName, unDelable } = curHistory;

    const itemClassName = classNames(
      styles.historyItem,
      curItemBeSelected && styles.hsItemSelected,
    );

    return (
      <div className={classNames(itemClassName)} onClick={() => handleClick(curHistory)}>
        <span>{menuName}</span>
        {!unDelable && curItemBeSelected && (
          <div
            className={styles.closeIcon}
            onClick={e => {
              e.stopPropagation();
              handleRemove(path);
            }}
          >
            <CloseOutlined />
          </div>
        )}
      </div>
    );
  }
}

const getNextItem = (list, curIndex) => {
  const isLastOne = list.length - 1 === curIndex;
  const nextIndex = isLastOne ? curIndex - 1 : curIndex + 1;
  return list[nextIndex];
};

export default HistoryHeader;
