/**
 * 默认配置
 */
export interface DefaultConfig {
  appName: string;
  enableVConsole: boolean;
  appPrimary: string;
  axiosTimeout: number;
  axiosCookie: boolean;
  axiosBaseUrl: string;
  authorityKey: string;
  enableSentry: boolean;
}

const appConfig: DefaultConfig = {
  appName: 'fast-h5-umi', // 项目title
  enableVConsole: true, // 开启vconsole
  appPrimary: '#5B98FF',
  axiosTimeout: 10000,
  axiosCookie: true,
  axiosBaseUrl: '/api',
  authorityKey: 'fast-h5-umi-authority',
  enableSentry: true,
};

export default appConfig;
