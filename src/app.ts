import { Toast } from 'antd-mobile';
import appConfig from './appConfig';

console.info('当前app环境---->', PRO_VAR);

const { enableVConsole } = appConfig;

if (enableVConsole) {
  console.log('vConsole init success');
  // @ts-ignore
  new VConsole();
}
// Toast mask
Toast.config({
  mask: false,
});

export function onRouteChange({ location, matchedRoutes }) {
  console.log('onRouteChange', location, matchedRoutes);
}
