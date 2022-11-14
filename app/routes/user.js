'use strict';
// 用户接口

module.exports = app => {
  const { router, controller } = app;
  // 根据关键字查询用户列表（下拉搜索用）
  router.get('/searchUserList', controller.user.searchUserList);
  // 获取用户列表
  router.get('/getUserList', controller.user.getUserList);
  // 修改用户状态
  router.put('/putUserToExamine', controller.user.putUserToExamine);
  // 修改用户角色
  router.put('/putUserState', controller.user.putUserState);
  // 根据用户id获取用户详情信息
  router.get('/getUserDetails', controller.user.getUserDetails);
  // 根据用户id获取用户站点信息
  router.get('/getUserSite', controller.user.getUserSite);
  // 更新用户详情
  router.put('/putUserDetails', controller.user.putUserDetails);
  // 更新用户站点
  router.put('/putUserSite', controller.user.putUserSite);
  // 根据id获取用户数据数量
  router.get('/getUserKnowledgeNum', controller.user.getUserKnowledgeNum);
};
