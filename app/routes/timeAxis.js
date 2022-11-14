'use strict';
// 时间轴接口

module.exports = app => {
  const { router, controller } = app;
  // 获取列表接口
  router.get('/getTimeAxisList', controller.timeAxis.getList);
  // 更新详情
  router.put('/putTimeAxisDetails', controller.timeAxis.putTimeAxisDetails);
  // 修改审核状态
  router.put('/putTimeAxisToExamine', controller.timeAxis.putTimeAxisToExamine);
  // 新增
  router.post('/createTimeAxisDetails', controller.timeAxis.createTimeAxisDetails);
  // 删除
  router.delete('/deleteTimeAxisDetails', controller.timeAxis.deleteTimeAxisDetails);
};
