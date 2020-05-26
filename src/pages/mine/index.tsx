import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect, history } from 'umi';
import './index.less';
import { Button } from 'antd-mobile';

interface IProps extends ConnectProps {
  loading: boolean;
}

const MinePage: React.FC<IProps> = props => {
  const { loading } = props;
  console.log('loading', loading);
  const goPage = () => {
    history.push('/setting');
  };
  return (
    <div>
      我的页面
      <Button onClick={goPage}>设置</Button>
    </div>
  );
};

MinePage.defaultProps = {
  loading: false,
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects[''],
}))(MinePage);
