import { Reducer, Effect } from 'umi';

export interface IAppModelState {
  appStatus: string;
}

export interface IAppModel {
  namespace: 'app';
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
