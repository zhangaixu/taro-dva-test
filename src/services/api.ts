import request from '../utils/request';

// 登录
export async function LOGIN_IN(params){

  return request(params, true);
}

// 登出
export async function LOGIN_OUT(params){

  return request(params, true);
}