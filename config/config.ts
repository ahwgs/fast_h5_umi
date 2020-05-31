/*
 * umi配置
 * @Author: ahwgs
 * @Date: 2020-05-23 01:15:06
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-06-01 07:11:29
 */

import { defineConfig } from 'umi';
import SentryPlugin from '@sentry/webpack-plugin';
import pageRoutes from './router.config';
import pluginConfig from './plugin.config';
import appConfig, { DefaultConfig } from '../src/appConfig';
import babelConfig from './babel.config';
import proxyConfig from './proxy.config';
import themeConfig from './theme.config';

const { appName, enableVConsole, enableSentry }: DefaultConfig = appConfig;

// eslint-disable-next-line @typescript-eslint/camelcase
const { PRO_VAR, NODE_ENV, npm_package_version } = process.env;

const NODE_IS_DEV = NODE_ENV === 'development'; // node环境

console.info('当前app环境---->', PRO_VAR);
console.info('当前node环境---->', NODE_ENV);

const headScripts = enableVConsole
  ? ['https://cdn.staticfile.org/vConsole/3.3.4/vconsole.min.js']
  : [];

// 静态资源文件前缀
const publicPathMap = {
  dev: '/',
  test: 'https://cdn.xxx.com/fast_h5_umi/',
  pro: 'https://cdn.xxx.com/fast_h5_umi/',
};

export default defineConfig({
  plugins: pluginConfig,
  devtool: enableSentry ? 'source-map' : '',
  hd: {
    theme: themeConfig,
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
    RELEASE_VERSION: npm_package_version,
  },
  proxy: proxyConfig,
  theme: themeConfig,
  lessLoader: {
    modifyVars: {
      hack: 'true; @import "~@/styles/index.less";',
    },
  },
  cssLoader: {
    localsConvention: 'camelCase',
  },
  // 依赖提取
  chunks: ['vendors', 'umi'],
  chainWebpack(config) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });

    if (enableSentry && PRO_VAR !== 'mock' && !NODE_IS_DEV) {
      // 当为prod时候才进行sourcemap的上传，如果不判断，在项目运行的打包也会上传
      config.plugin('sentry').use(SentryPlugin, [
        {
          ignore: ['node_modules'],
          include: './dist', // 上传dist文件的js
          configFile: './sentryclirc', // 配置文件地址，这个一定要有，踩坑在这里，忘了写导致一直无法实现上传sourcemap
          release: npm_package_version, // 版本号，自己定义的变量，整个版本号在项目里面一定要对应
          deleteAfterCompile: true,
          urlPrefix: PRO_VAR === 'test' || PRO_VAR === 'pro' ? publicPathMap[PRO_VAR] : '~/', // cdn js的代码路径前缀
        },
      ]);
    }
  },
});
