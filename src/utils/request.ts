import Taro from '@tarojs/taro';
import interceptors from './interceptors';

interceptors.forEach((interceptorItem) => Taro.addInterceptor(interceptorItem));

const { configParams, noConsole } = require('../config');


interface OptionsType {
  method: "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT";
  data: any;
  url: string;
  noLoading?: boolean;
}
export default (options: OptionsType = { method: 'GET', data: {}, url: '', noLoading: false }, noToken?: boolean) => {
  const baseUrl = configParams.baseUrl + options.url;
  
  if (!options.noLoading) {
    Taro.showLoading({
      title: '加载中'
    });
  }
  if (!noConsole) {
    // 打印日志
    console.log(`${new Date().toLocaleString()}【 URL=${options.url} 】PARAM=${JSON.stringify(options.data)}`);
  }
  
  // 是否校验token
  if(noToken){ 
    delete options.data['token']
  }

  return Taro.request({
    url: baseUrl,
    method: options.method,
    data: { ...options.data },
    header: {
      'Accept': 'application/json', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    
  }).then((res) => {
    setTimeout(() => {
      Taro.hideLoading();
    }, 100);
    if (!noConsole) {
      console.log(`${new Date().toLocaleString('zh', { hour12: false })}【${options.url} 】【返回】`, res.data);
    }
  }).catch(() => {
    setTimeout(() => {
      Taro.hideLoading();
    }, 100);
  })
};
