'use strict';
// 邮件接口

module.exports = app => {
  const { router, controller } = app;
  // 发送邮件
  router.post('/sendOutEmail', controller.emailServer.sendOutEmail);
};
