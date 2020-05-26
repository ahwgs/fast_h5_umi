import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'umi';
import './index.less';

interface IProps extends ConnectProps {
  loading: boolean;
}

const ComponentPage: React.FC<IProps> = props => {
  const { loading } = props;
  console.log('loading', loading);
  return <div>组件页</div>;
};

ComponentPage.defaultProps = {
  loading: false,
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects[''],
}))(ComponentPage);
