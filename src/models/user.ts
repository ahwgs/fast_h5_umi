import { Reducer, Effect } from 'umi';
import { fetchUserService } from '@/services/user';

export interface IUserModelState {
  currentUser: APP.ICurrentUser;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取当前用户信息
    fetchCurrent: Effect;
    // 退出登录
    fetchLogout: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      // 获取用户信息以及所有权限信息
      const responses = yield call(fetchUserService, payload);
      yield put({
        type: 'save',
        payload: {
          currentUser: responses,
        },
      });
    },
    *fetchLogout({ payload }, { call, put }) {
      yield console.log('退出登录');
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default UserModel;
