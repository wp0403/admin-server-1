'use strict';
// 树洞接口

module.exports = app => {
  const { router, controller } = app;
  // 获取树洞列表接口
  router.get('/getSecretList', controller.secret.getList);
  // 修改树洞的置顶接口
  router.put('/changeSecretIsTop', controller.secret.isTopFun);
  // 将树洞放入回收站的接口
  router.put('/delSecretList', controller.secret.delSecretList);
  // 更新树洞详情
  router.put('/putSecretDetails', controller.secret.putSecretDetails);
  // 修改树洞审核状态
  router.put('/putSecretToExamine', controller.secret.putSecretToExamine);
  // 新增树洞
  router.post('/createSecretDetails', controller.secret.createSecretDetails);
  // 删除树洞
  router.delete('/deleteSecretDetails', controller.secret.deleteSecretDetails);
};
