import React, { FC } from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'umi';
import './BasicLayout.less';

interface BasicLayoutProps extends Required<ConnectProps> {
  prefixCls?: string;
}

const BasicLayout: FC<BasicLayoutProps> = props => {
  const { children, prefixCls } = props;
  return <div className={prefixCls}>{children}</div>;
};

BasicLayout.defaultProps = {
  prefixCls: 'basic-layout',
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(BasicLayout);
