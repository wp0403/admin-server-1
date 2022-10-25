'use strict';
// 树洞接口

module.exports = app => {
  const { router, controller } = app;
  router.get('/getSecretList', controller.secret.getList); // 获取树洞列表接口
  router.put('/changeSecretIsTop', controller.secret.isTopFun); // 修改树洞的置顶接口
  router.put('/delSecretList', controller.secret.delSecretList); // 将树洞放入回收站的接口
  router.put('/putSecretDetails', controller.secret.putSecretDetails); // 更新树洞详情
  router.put('/putSecretToExamine', controller.secret.putSecretToExamine); // 修改树洞审核状态
  router.post('/createSecretDetails', controller.secret.createSecretDetails); // 新增树洞
  router.delete('/deleteSecretDetails', controller.secret.deleteSecretDetails); // 删除树洞
};
