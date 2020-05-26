import React from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'umi';
import './index.less';
import { Icon } from 'antd-mobile';
import { setOptions } from '@/utils/nav';

interface IProps extends ConnectProps {
  loading: boolean;
}

const SettingPage: React.FC<IProps> = props => {
  const { loading } = props;

  const onSetting = () => {
    console.log('loading', loading);
  };

  const setPageOption = () => {
    setOptions({
      rightContent: <Icon type="ellipsis" onClick={onSetting} />,
    });
  };

  React.useLayoutEffect(() => {
    setPageOption();
  }, []);

  return <div>设置页面</div>;
};

SettingPage.defaultProps = {
  loading: false,
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.effects[''],
}))(SettingPage);
