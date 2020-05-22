/*
 * 通用地址配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:13:03
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-23 02:27:22
 */

const ProConfig = [
  {
    key: 'dev',
    api: 'http://www.ahwgs.cn',
  },
  {
    key: 'test',
    api: 'http://www.ahwgs.cn',
  },
  {
    key: 'pro',
    api: 'http://www.ahwgs.cn',
  },
];

export const findProConfig = (key: string) =>
  ProConfig.find(item => item.key === key) || ProConfig[0];

export const CommonConfig = findProConfig(PRO_VAR);
