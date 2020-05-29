import { Reducer, Effect } from 'umi';
import { fetchUserService } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { AuthorityStatus } from '@/common';

export interface IUserModelState {
  currentUser: APP.ICurrentUser;
  currentAuthority: string | string[];
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取当前用户信息
    fetchCurrent: Effect;
    // 退出登录
    fetchLogout: Effect;
    // 检查登录状态与权限
    fetchLoginStatus: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
    changeLoginStatus: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    currentAuthority: '',
  },
  effects: {
    /**
     * 获取用户信息
     */
    *fetchCurrent({ payload }, { call, put }) {
      // 获取用户信息以及所有权限信息
      const responses = yield call(fetchUserService, payload);
      yield put({
        type: 'save',
        payload: {
          currentUser: responses,
        },
      });
      return responses;
    },
    /**
     * 退出登录
     */
    *fetchLogout({ payload }, { call, put }) {
      yield console.log('退出登录');
    },
    /**
     * 检查登录状态与权限
     */
    *fetchLoginStatus({ paylaod }, { put }) {
      console.log('fetchLoginStatus');

      const currentUser = yield yield put({
        type: 'fetchCurrent',
      });
      // 没有用户信息 没登录
      if (!currentUser) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: 'guest',
          },
        });
        return;
      }
      const { status = AuthorityStatus.GUEST } = currentUser;

      let currentAuthority = 'guest';
      switch (status) {
        case AuthorityStatus.USER:
          currentAuthority = 'user';
          break;
        case AuthorityStatus.ADMIN:
          currentAuthority = 'admin';
          break;
        case AuthorityStatus.CLOSE:
          currentAuthority = 'close';
          break;
        default:
          currentAuthority = 'guest';
          break;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default UserModel;
