'use strict';
// 腾讯云对象储存接口

module.exports = app => {
  const { router, controller } = app;
  // 获取腾讯云cos签名
  router.get('/sts', controller.cosServer.getCosTemporaryKey);
};
