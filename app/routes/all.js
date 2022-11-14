'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 登陆验证码接口
  router.get('/vcode', controller.verificationCode.createVCode);
  // 登陆接口
  router.post('/login', controller.login.index);
  // 注册接口
  router.post('/createUser', controller.login.createUser);
};
