'use strict';
// 天行数据接口

module.exports = app => {
  const { router, controller } = app;
  // 获取当前登录用户所在地天气
  router.get('/getWeather', controller.tianapi.getWeather);
};
