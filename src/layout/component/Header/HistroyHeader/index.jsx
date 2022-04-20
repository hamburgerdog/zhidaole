import { CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import React from 'react';

import { RouterConfigList } from '@/router/config';
import { withRouter } from '@/utils/HoC/withRouter';

import styles from './index.module.less';

const { Header } = Layout;

class HistoryHeader extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      navHistoryMap: initNavHistoryMap(),
    };
    this.afterChangeRouter = this.afterChangeRouter.bind(this);
    this.addHistory = this.addHistory.bind(this);
    this.removeHistory = this.removeHistory.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname: prevPath },
    } = prevProps;
    const {
      location: { pathname: curPath, state: curHistory },
    } = this.props;
    if (prevPath !== curPath) {
      this.afterChangeRouter(curPath, curHistory);
    }
  }

  afterChangeRouter(curPath, curHistory) {
    const { navHistoryMap } = this.state;
    if (!navHistoryMap.has(curPath)) {
      this.addHistory(curPath, curHistory);
    }
  }

  addHistory = (path, history) => {
    const curNavHistoryMap = cloneDeep(this.state.navHistoryMap);
    curNavHistoryMap.set(path, history);
    this.setState({
      navHistoryMap: curNavHistoryMap,
    });
  };

  removeHistory = (path, nextPath, nextHistory) => {
    const { navigate } = this.props;
    const curNavHistoryMap = cloneDeep(this.state.navHistoryMap);
    curNavHistoryMap.delete(path);
    this.setState(
      {
        navHistoryMap: curNavHistoryMap,
      },
      () => {
        navigate(nextPath, { state: nextHistory });
      },
    );
  };

  render() {
    const { navHistoryMap } = this.state;
    const {
      location: { pathname: curPath },
      navigate,
    } = this.props;
    const navHistoryMapKeyList = [...navHistoryMap.keys()];

    return (
      <Header className={styles.historyHeader} style={{ padding: 0 }}>
        {navHistoryMapKeyList.map((key, curIndex) => {
          const curHistory = navHistoryMap.get(key);
          const { path } = curHistory;
          const curItemBeSelected = path === curPath;

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
              handleRemove={path => {
                this.removeHistory(path, nextPath, nextHistory);
              }}
            />
          );
        })}
      </Header>
    );
  }
}

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
          <div className={styles.closeIcon} onClick={() => handleRemove(path)}>
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

export default withRouter(HistoryHeader);
