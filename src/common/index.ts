import IconTypes from './icons/icons';
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

export { commonMenu, IconTypes };
