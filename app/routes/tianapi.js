'use strict';
// 天行数据接口

module.exports = app => {
  const { router, controller } = app;
  // 获取当前登录用户所在地天气
  router.get('/getWeather', controller.tianapi.getWeather);
  // 获取抖音热搜
  router.get('/getDouyinhot', controller.tianapi.getDouyinhot);
  // 获取百度热搜
  router.get('/getNethot', controller.tianapi.getNethot);
  // 获取全网热搜
  router.get('/getNetworkhot', controller.tianapi.getNetworkhot);
  // 获取国际新闻
  router.get('/getWorld', controller.tianapi.getWorld);
  // 获取国内新闻
  router.get('/getGuonei', controller.tianapi.getGuonei);
  // 获取社会新闻
  router.get('/getSocial', controller.tianapi.getSocial);
  // 获取科技新闻
  router.get('/getKeji', controller.tianapi.getKeji);
  // 获取区块链新闻
  router.get('/getBlockchain', controller.tianapi.getBlockchain);
  // 获取IT资讯
  router.get('/getIt', controller.tianapi.getIt);
  // 获取互联网资讯
  router.get('/getInternet', controller.tianapi.getInternet);
};
