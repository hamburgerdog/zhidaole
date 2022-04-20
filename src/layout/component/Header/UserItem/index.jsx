import React from 'react';
import { connect } from 'react-redux';

import styles from './index.module.less';

/**
 * 用户功能
 */
class UserItem extends React.PureComponent {
  render() {
    const { user } = this.props;

    return (
      <div className={styles.headerUserBox}>
        <img src={user.avatar} alt="avatar" />
        <span>{user.name}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

//  IoC  注入全局的依赖到组件的 props 中
export default connect(mapStateToProps)(UserItem);
