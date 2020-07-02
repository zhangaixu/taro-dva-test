import * as Api from '../services/api';

export default {
  // 命名（唯一)
  namespace: 'example',

  // 状态
  state: {

  },

  // 更新状态
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  // 
  effects: {
    * save ({ payload }, { call, put }) {
      const response = yield call(Api.LOGIN_IN, { payload });
      
      yield put({
        type: 'save', 
        payload: {
          topData: response.data // 模拟
        }
      });

    }
  }
  
};
