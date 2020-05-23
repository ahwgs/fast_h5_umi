/*
 * umi配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:06
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-23 12:40:57
 */

import { defineConfig } from 'umi';
import path from 'path';
import pageRoutes from './router.config';
import pluginConfig from './plugin.config';
import appConfig from '../src/appConfig';
import babelConfig from './babel.config';
import proxyConfig from './proxy.config';
import themeConfig from './theme.config';

const { appName, enableVConsole } = appConfig;

const { PRO_VAR, NODE_ENV } = process.env;

const NODE_IS_DEV = NODE_ENV === 'development'; // node环境

console.info('当前app环境---->', PRO_VAR);
console.info('当前node环境---->', NODE_ENV);

const headScripts = enableVConsole
  ? ['https://cdn.staticfile.org/vConsole/3.3.4/vconsole.min.js']
  : [];

export default defineConfig({
  plugins: pluginConfig,
  hd: {
    theme: {},
    px2rem: {
      rootValue: 50, // 开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为375，所以375*100/750=50
      propBlackList: [
        'border-top-width',
        'border-left-width',
        'border-right-width',
        'border-bottom-width',
      ], // 这些属性不需要转换
      selectorBlackList: ['no_hd'], // 以包含no_hd的class不需要转换
    },
  },
  dva: {
    immer: true,
  },
  antd: {},
  dynamicImport: {},
  title: appName,
  favicon: '/favicon.ico',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: pageRoutes,
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  headScripts: [...headScripts],
  hash: true,
  extraBabelPlugins: babelConfig,
  ignoreMomentLocale: true, // 忽略 moment 的 locale 文件，用于减少尺寸
  define: {
    PRO_VAR, // 注册到全局
    NODE_IS_DEV,
  },
  proxy: proxyConfig,
  theme: themeConfig,
  lessLoader: {
    modifyVars: {
      // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      hack: 'true; @import "~@/styles/index.less";',
    },
  },
});
