import { IUserModelState } from '@/models/user';

export interface ConnectState {
  loading: Loading;
  user: IUserModelState;
}

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    app?: boolean;
    user?: boolean;
  };
}

export interface BaseRoute {
  authority?: string[] | string;
  children?: BaseRoute[];
  icon?: string;
  name?: string;
  path: string;
  [key: string]: any;
  isMenu?: boolean;
}

export interface Route extends BaseRoute {
  routes?: Route[];
}
