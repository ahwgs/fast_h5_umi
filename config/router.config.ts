/*
 * 路由配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:34
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-23 01:15:56
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
        component: '@/pages/home',
      },
    ],
  },
];
