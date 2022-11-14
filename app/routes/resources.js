'use strict';
// 数据接口

module.exports = app => {
  const { router, controller } = app;
  // 批量写入图片数据
  router.put('/putImgList', controller.resources.insertImgs);
  // 写入图片数据
  router.put('/putImg', controller.resources.insertImg);
  // 获取图片列表
  router.get('/getImgList', controller.resources.getImgList);
  // 修改图片状态
  router.put('/delImg', controller.resources.delImg);
  // 永久删除图片
  router.delete('/deleteImg', controller.resources.deleteImg);
};
