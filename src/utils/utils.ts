/*
 * 工具函数
 * @Author: ahwgs
 * @Date: 2020-05-25 23:38:31
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-25 23:39:14
 */

/**
 * 返回所有是菜单的路由
 * @param routes
 */
export const getMenuRoute = (routes: any[]) => {
  if (!routes || routes.length < 1) return [];
  return routes.filter(r => r.isMenu).map(r => r.path);
};
