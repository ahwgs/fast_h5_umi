import { Toast } from 'antd-mobile';
import Report from '@/utils/report';
import { CommonConfig } from '@/utils/url.config';
import appConfig, { DefaultConfig } from './appConfig';

console.info('当前app环境---->', PRO_VAR);

const { enableVConsole, enableSentry }: DefaultConfig = appConfig;

if (enableVConsole) {
  console.log('vConsole init success');
  // @ts-ignore
  new VConsole();
}
// Toast mask
Toast.config({
  mask: false,
});

if (enableSentry && PRO_VAR !== 'mock' && !NODE_IS_DEV) {
  const sentry = Report.getInstance({
    dsn: CommonConfig.sentryDsn,
    release: RELEASE_VERSION, // from webpack DefinePlugin
    environment: PRO_VAR,
    debug: PRO_VAR === 'dev' || PRO_VAR === 'test',
  });
  window.$sentry = sentry;
}

// export function onRouteChange({ location, matchedRoutes }) {
//   console.log('onRouteChange', location, matchedRoutes);
// }
