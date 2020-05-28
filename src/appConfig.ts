/**
 * 默认配置
 */
export interface DefaultConfig {
  appName: string;
  enableVConsole: boolean;
  appPrimary: string;
}

const appConfig: DefaultConfig = {
  appName: 'fast-h5-umi', // 项目title
  enableVConsole: true, // 开启vconsole
  appPrimary: '#5B98FF',
};

export default appConfig;
