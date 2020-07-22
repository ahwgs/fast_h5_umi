/*
 * 路由配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:34
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-30 07:51:57
 */

export default [
  {
    path: '/login',
    component: '@/layouts/UserLayout',
    routes: [
      {
        path: '/login',
        title: '登录',
        name: 'login',
        component: '@/pages/login',
      },
    ],
  },
  {
    path: '/exception',
    routes: [
      {
        path: '/exception/403',
        name: 'not-permission',
        component: '@/pages/exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: '@/pages/exception/404',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    wrappers: ['@/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        title: '首页',
        name: 'home',
        isMenu: true,
        component: '@/pages/home',
        routes: [
          {
            path: '/home/123',
            title: '首页123',
            name: 'home1231',
            component: '@/pages/home',
          },
        ],
      },
      {
        path: '/my',
        title: '我的',
        name: 'my',
        isMenu: true,
        component: '@/pages/mine',
      },
      {
        path: '/component',
        title: '组件',
        name: 'component',
        isMenu: true,
        authority: ['user'],
        component: '@/pages/component',
        routes: [
          {
            path: '/component/flex',
            title: 'Flex布局',
            name: 'component.flex',
            component: '@/pages/home',
          },
        ],
      },
      {
        path: '/expand',
        title: '拓展',
        name: 'expand',
        isMenu: true,
        authority: ['user'],
        component: '@/pages/expand',
        routes: [
          {
            path: '/expand/auth',
            title: '权限页面',
            name: 'expand.auth',
            authority: ['admin'],
            component: '@/pages/expand/auth',
          },
        ],
      },
      {
        path: '/setting',
        title: '设置',
        name: 'setting',
        authority: ['user'],
        component: '@/pages/setting',
      },
      {
        component: '@/pages/exception/404',
      },
    ],
  },
  {
    component: '@/pages/exception/404',
  },
];
