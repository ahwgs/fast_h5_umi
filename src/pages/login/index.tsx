import React from 'react';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps } from 'umi';
import './index.less';

interface IProps extends ConnectProps {
  loading: boolean;
}

const LoginPage: React.FC<IProps> = props => {
  const { loading } = props;
  console.log('loading', loading);
  return <div>登录页</div>;
};

LoginPage.defaultProps = {
  loading: false,
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects[''],
}))(LoginPage);
