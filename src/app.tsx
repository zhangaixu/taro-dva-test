import '@tarojs/async-await';
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index';
import dva from './utils/dva';
import models from './models';
import { Provider } from '@tarojs/redux';

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index',
      'pages/circle/index',
      'pages/account/index',


      'pages/index/index'
    ],
    tabBar: {
      color: '#7F7F7F',
      selectedColor: '#B32A2F',
      list: [
        {
            pagePath: 'pages/home/index',
            text: '首页',
            iconPath: './assets/image/home.png',
            selectedIconPath: './assets/image/home-a.png'
        }, {
            pagePath: 'pages/circle/index',
            text: '分类',
            iconPath: './assets/image/circle.png',
            selectedIconPath: './assets/image/circle-a.png'
        }, {
            pagePath: 'pages/account/index',
            text: '我的',
            iconPath: './assets/image/me.png',
            selectedIconPath: './assets/image/me-a.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Taro-dva-test',
      navigationBarTextStyle: 'black'
    },
    // permission: {
    //   "scope.userLocation": {
    //     "desc": "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    //   }
    // },
    navigateToMiniProgramAppIdList: [
      // appid
    ],
    networkTimeout: {
      "request": 1000000,
      "connectSocket": 100000,
      "uploadFile": 100000,
      "downloadFile": 100000
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
