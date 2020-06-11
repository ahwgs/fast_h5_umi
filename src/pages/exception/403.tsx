import React from 'react';
import { history } from 'umi';
import styles from './index.less';

const Exception403: React.FC<{}> = () => (
  <div className={styles.container}>
    <p>当前页面没有权限查看</p>
    <div onClick={() => history.push('/')}>Back Home</div>
  </div>
);

export default Exception403;
