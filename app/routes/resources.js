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
};
