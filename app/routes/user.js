'use strict';
// 用户接口

module.exports = app => {
  const { router, controller } = app;
  router.get('/searchUserList', controller.user.searchUserList); // 根据关键字查询用户列表
  router.get('/getUserList', controller.user.getUserList); // 根据关键字查询用户列表
  router.put('/putUserToExamine', controller.user.putUserToExamine); // 修改用户状态
  router.put('/putUserState', controller.user.putUserState); // 修改用户角色
  router.get('/getUserDetails', controller.user.getUserDetails); // 根据用户id获取用户详情信息
  router.put('/putUserDetails', controller.user.putUserDetails); // 更新用户详情
};
