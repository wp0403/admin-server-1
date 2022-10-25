'use strict';
// 时间轴接口

module.exports = app => {
  const { router, controller } = app;
  router.get('/getTimeAxisList', controller.timeAxis.getList); // 获取列表接口
  router.put('/putTimeAxisDetails', controller.timeAxis.putTimeAxisDetails); // 更新详情
  router.put('/putTimeAxisToExamine', controller.timeAxis.putTimeAxisToExamine); // 修改审核状态
  router.post('/createTimeAxisDetails', controller.timeAxis.createTimeAxisDetails); // 新增
  router.delete('/deleteTimeAxisDetails', controller.timeAxis.deleteTimeAxisDetails); // 删除
};
