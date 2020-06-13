import IconTypes from './icons';
import { MenusType } from './types/menus';

const commonMenu: MenusType[] = [
  {
    key: 'home',
    icon: IconTypes.viewIcon,
    activeIcon: IconTypes.viewActiveIcon,
  },
  {
    key: 'component',
    icon: IconTypes.componentIcon,
    activeIcon: IconTypes.componentActiveIcon,
  },
  {
    key: 'expand',
    icon: IconTypes.discountIcon,
    activeIcon: IconTypes.discountActiveIcon,
  },
  {
    key: 'my',
    icon: IconTypes.myIcon,
    activeIcon: IconTypes.myActiveIcon,
  },
];

/**
 *接口响应枚举
 */
enum HttpCode {
  SUCCESS = 0, // 成功
  FAIL = 1, // 失败
  WARN = 2, // 警告
  NO_LOGIN = 1000, // 需要登录
}

/**
 * 权限状态
 */
enum AuthorityStatus {
  USER = 1,
  ADMIN = 2,
  CLOSE = 3,
  GUEST = 0,
}

export { commonMenu, IconTypes, HttpCode, AuthorityStatus };
