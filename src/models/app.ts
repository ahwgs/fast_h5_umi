import { Reducer } from 'redux';
import { Effect } from '@/models/connect';

export interface IAppModelState {
  appStatus: string;
}

export interface IAppModel {
  namespace: 'nav';
  state: IAppModelState;
  effects: {};
  reducers: {
    save: Reducer<any>;
  };
}

const AppModel: IAppModel = {
  namespace: 'app',
  state: {
    appStatus: '',
  },
  effects: {},
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default AppModel;
