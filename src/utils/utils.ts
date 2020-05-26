/*
 * 工具函数
 * @Author: ahwgs
 * @Date: 2020-05-25 23:38:31
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-26 23:11:33
 */

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
