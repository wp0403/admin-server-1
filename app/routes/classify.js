'use strict';
// 博文接口

module.exports = app => {
  const { router, controller } = app;
  router.get('/getClassifyList', controller.classify.getList); // 获取博文列表接口
  router.put('/changeClassifySelected', controller.classify.isSelectedFun); // 修改博文精选的接口
  router.put('/delBowenList', controller.classify.delBowenList); // 将博文放入回收站的接口
  router.get('/getClassifyDetails', controller.classify.getClassifyDetails); // 获取博文详情
  router.put('/putClassifyDetails', controller.classify.putClassifyDetails); // 更新博文详情
  router.put('/putClassifyToExamine', controller.classify.putClassifyToExamine); // 修改博文审核状态
  router.post(
    '/createClassifyDetails',
    controller.classify.createClassifyDetails
  ); // 新增博文
  router.delete('/deleteClassifyDetails', controller.classify.deleteClassifyDetails); // 删除博文
};
