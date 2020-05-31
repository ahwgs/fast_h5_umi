/*
 * 通用地址配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:13:03
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-01 06:40:23
 */

const ProConfig = [
  {
    key: 'dev',
    api: 'http://www.ahwgs.cn',
    sentryDsn: 'https://d2f19328ff1c402287c8b792c28ac8d3@o350779.ingest.sentry.io/5259626',
  },
  {
    key: 'test',
    api: 'http://www.ahwgs.cn',
    sentryDsn: 'https://d2f19328ff1c402287c8b792c28ac8d3@o350779.ingest.sentry.io/5259626',
  },
  {
    key: 'pro',
    api: 'http://www.ahwgs.cn',
    sentryDsn: 'https://d2f19328ff1c402287c8b792c28ac8d3@o350779.ingest.sentry.io/5259626',
  },
];

export const findProConfig = (key: string) =>
  ProConfig.find(item => item.key === key) || ProConfig[0];

export const CommonConfig = findProConfig(PRO_VAR);
