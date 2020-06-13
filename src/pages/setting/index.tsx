import React, { useState } from 'react';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps } from 'umi';
import './index.less';
import { Icon, Popover } from 'antd-mobile';
import { setOptions } from '@/utils/nav';

const { Item } = Popover;
interface IProps extends ConnectProps {
  loading: boolean;
}

const SettingPage: React.FC<IProps> = props => {
  const { loading } = props;

  const [v, setV] = useState(false);

  const onSetting = () => {
    console.log('loading', loading);
  };

  const setPageOption = () => {
    setOptions({
      rightContent: (
        <Popover
          mask
          overlayClassName="fortest"
          overlayStyle={{ color: 'currentColor' }}
          visible={v}
          overlay={[
            <Item key="4" value="scan">
              Scan
            </Item>,
            <Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>
              My Qrcode
            </Item>,
            <Item key="6" value="button ct">
              <span style={{ marginRight: 5 }}>Help</span>
            </Item>,
          ]}
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [-10, 0],
          }}
        >
          <div
            style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon type="ellipsis" onClick={() => setV(true)} />
          </div>
        </Popover>
      ),
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
