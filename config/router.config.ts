/*
 * 路由配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:34
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-26 23:04:31
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
        component: '@/pages/component',
      },
      {
        path: '/expand',
        title: '拓展',
        name: 'expand',
        isMenu: true,
        component: '@/pages/expand',
      },
      {
        path: '/setting',
        title: '设置',
        name: 'setting',
        component: '@/pages/setting',
      },
    ],
  },
];
