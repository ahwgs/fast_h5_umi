declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare const PRO_VAR: string; // 应用环境
declare const NODE_IS_DEV: boolean; // node运行环境

declare module 'antd-mobile';
