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
declare const RELEASE_VERSION: string;

declare module 'antd-mobile';

declare namespace APP {
  export interface IUser {
    id?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    username?: string;
    remark?: string;
    status?: number;
  }

  export interface ICurrentUser extends IUser {
    name?: string;
  }
}

interface AnyObject {
  [propName: string]: any;
}

interface Window {
  baseURL: string;
  reloadAuthorized: () => void;
  $sentry: AnyObject;
}
