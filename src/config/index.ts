module.exports = {
  // 导出日志信息
  noConsole: process.env.NODE_ENV === 'production' ? true : false,

  // 导出环境参数
  config: process.env.NODE_ENV === 'production' ? require('./prod.config') : require('./dev.config'),
}