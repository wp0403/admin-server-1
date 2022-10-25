'use strict';
// 腾讯云对象储存接口

module.exports = app => {
  const { router, controller } = app;
  router.get('/sts', controller.cosServer.index); // 获取腾讯云cos签名
  // router.get('/stsCosKey', controller.cosServer.getCosKey); // 获取腾讯云cos的用户密钥 安全问题弃用
};
