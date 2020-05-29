import React from 'react';
import { history } from 'umi';

const Exception403: React.FC<{}> = () => (
  <div>
    <p>当前页面找不到</p>
    <div onClick={() => history.push('/')}>Back Home</div>
  </div>
);

export default Exception403;
