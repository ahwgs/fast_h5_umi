/*
 * 路由配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:34
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-26 00:30:23
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
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        title: '首页',
        name: 'home',
        isMenu: true,
        component: '@/pages/home',
      },
      {
        path: '/my',
        title: '我的',
        name: 'my',
        isMenu: true,
        component: '@/pages/home',
      },
      {
        path: '/component',
        title: '组件',
        name: 'component',
        isMenu: true,
        component: '@/pages/home',
      },
      {
        path: '/expand',
        title: '拓展',
        name: 'expand',
        isMenu: true,
        component: '@/pages/home',
      },
    ],
  },
];
