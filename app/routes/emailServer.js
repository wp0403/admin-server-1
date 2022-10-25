'use strict';
// 邮件接口

module.exports = app => {
  const { router, controller } = app;
  router.post('/sendOutEmail', controller.emailServer.sendOutEmail); // 发送邮件
};
