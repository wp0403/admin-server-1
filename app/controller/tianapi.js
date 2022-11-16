/*
 * @Descripttion: 天行数据接口
 * @version: 1.0.0
 * @Author: WangPeng
 * @Date: 2022-11-16 14:54:04
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-16 15:10:14
 */
'use strict';

const Controller = require('egg').Controller;

class TianapiController extends Controller {
  // 获取当前登录用户的天气信息
  async getWeather() {
    const { ctx } = this;

    await this.service.tianapi._getWeather().then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取天气失败',
        // data: e,
      };
    });
  }
}

module.exports = TianapiController;
