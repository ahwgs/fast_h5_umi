/*
 * 主题定制
 * @Author: ahwgs
 * @Date: 2020-05-23 12:09:23
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-05-23 12:10:07
 */
import appConfig, { DefaultConfig } from '../src/appConfig';

const { appPrimary }: DefaultConfig = appConfig;
export default {
  '@brand-primary': appPrimary,
};
