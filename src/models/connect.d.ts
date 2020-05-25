import { RouterTypes } from '@/common/types';
import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'umi';
import { match } from 'react-router-dom';
import { IUserModelState } from '@/models/user';

export default interface ConnectState {
  loading: Loading;
  user: IUserModelState;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    menu?: boolean;
  };
}

export interface Route {
  routes?: Route[];
}

export interface ConnectProps<P extends { [K in keyof P]?: string } = {}>
  extends Partial<RouterTypes<Route>> {
  dispatch?: Dispatch;
  match?: match<P>;
}
