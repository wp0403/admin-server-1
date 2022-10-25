'use strict';
// 数据接口

module.exports = app => {
  const { router, controller } = app;
  router.put('/putImgList', controller.resources.insertImgs); // 批量写入图片数据
  router.put('/putImg', controller.resources.insertImg); // 写入图片数据
  router.get('/getImgList', controller.resources.getImgList); // 获取图片列表
};
