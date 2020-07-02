import Taro from '@tarojs/taro';

import * as Api from "../services/api";

export default {
  namespace: 'logins',
  state: {
    accessToken: Taro.getStorageSync('accessToken'),
    userInfo: Taro.getStorageSync('userInfo')
  },

  reducers: {

    save(state, { payload }) {
      return { ...state, ...payload };
    },
    
    remove() {
      return { accessToken:'', userInfo: {} };
    }
    
  },

  effects: {
    // 登录
    * LOGIN_IN ({ payload }, { call, put, select }){

      const response = yield call(Api.LOGIN_IN, { payload });

      yield put ({
        type: 'save',
        payload: {
          accessToken: response.data.token,
          userInfo: response.data
        }
      })
    },
    // 登出
    * LOGIN_OUT ({ payload }, { call, put, select }){

      yield call(Api.LOGIN_OUT, { payload });

      yield put ({
        type: 'remove'
      })
    }
  }
};
