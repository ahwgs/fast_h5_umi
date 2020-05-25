import React, { FC } from 'react';
import { TabBar } from 'antd-mobile';
import { MenusType, MyRouteProps } from '@/common/types';
import { history } from 'umi';
import './index.less';

export interface MenuBarProps {
  pathname: string;
  routes: MyRouteProps[];
  menus: MenusType[];
  prefixCls: string;
}

const MenuBar: FC<MenuBarProps> = props => {
  const { prefixCls, routes, pathname, children, menus } = props;

  const tabMenu: any[] = [];
  menus.forEach(m => {
    routes.forEach(route => {
      if (route?.path?.includes(m.key) && route.isMenu) {
        tabMenu.push({
          ...m,
          ...route,
        });
      }
    });
  });
  console.log('tabMenu', tabMenu);
  return (
    <TabBar destroyInactiveTab>
      {tabMenu.map(({ title, icon, activeIcon, path }) => (
        <TabBar.Item
          key={path}
          title={title}
          icon={<img className={`${prefixCls}_icon`} src={icon} alt={title} />}
          selectedIcon={<img className={`${prefixCls}_icon`} src={activeIcon} alt={title} />}
          selected={pathname === path}
          onPress={() => history.push(`${path}`)}
        >
          {children}
        </TabBar.Item>
      ))}
    </TabBar>
  );
};

MenuBar.defaultProps = {
  prefixCls: 'menu-bar',
};

export default MenuBar;
