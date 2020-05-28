import { IUserModelState } from '@/models/user';

export default interface ConnectState {
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

export interface Route {
  routes?: Route[];
}
