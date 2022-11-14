'use strict';
// 旅行日记接口

module.exports = app => {
  const { router, controller } = app;
  // 获取旅行日记列表接口
  router.get('/getItineraryList', controller.itinerary.getList);
  // 获取博文详情
  router.get('/getItineraryDetails', controller.itinerary.getItineraryDetails);
};
