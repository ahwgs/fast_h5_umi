/*
 * 工具函数
 * @Author: ahwgs
 * @Date: 2020-05-25 23:38:31
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-30 06:38:40
 */
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';
/**
 * 扁平化路由表
 * @param routes
 */
export const formatterMenu = (routes: any[]) => {
  if (!routes || routes.length < 1) return [];
  const newMenus: any[] = [];
  const flattenMenuData = (data: any[]) => {
    const menus = data.filter(item => item.name && item.path);
    menus.forEach(item => {
      const result = {
        ...item,
      };
      if (item.routes) {
        flattenMenuData(item.routes);
      }
      newMenus.push(result);
    });
  };

  flattenMenuData(routes);
  return newMenus;
};

/**
 * 返回所有是菜单的路由
 * @param routes
 */
export const getMenuRoute = (routes: any[]) => {
  if (!routes || routes.length < 1) return [];
  return formatterMenu(routes)
    .filter(r => r.isMenu)
    .map(r => r.path);
};

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: any[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};
