import React, { FC } from 'react';
import { ConnectProps, ConnectState } from '@/models/connect';
import { connect } from 'umi';
import './BasicLayout.less';
import MenuBar from '@/components/MenuBar';
import { getMenuRoute } from '@/utils/utils';
import { commonMenu } from '@/common';

interface BasicLayoutProps extends Required<ConnectProps> {
  prefixCls?: string;
  route: any;
}

const BasicLayout: FC<BasicLayoutProps> = props => {
  const { children, prefixCls, route, location } = props;
  const { pathname } = location;
  const { routes } = route;
  const menuRoute = getMenuRoute(routes);
  console.log('menusmenusmenus', commonMenu);
  if (menuRoute.indexOf(pathname) >= 0) {
    return (
      <div className={prefixCls}>
        <MenuBar menus={commonMenu} routes={routes} pathname={pathname}>
          {children}
        </MenuBar>
      </div>
    );
  }
  return <div className={prefixCls}>{children}</div>;
};

BasicLayout.defaultProps = {
  prefixCls: 'basic-layout',
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(BasicLayout);
