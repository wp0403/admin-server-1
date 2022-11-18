/*
 * @Descripttion: 天行数据接口
 * @version: 1.0.0
 * @Author: WangPeng
 * @Date: 2022-11-16 14:54:04
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-18 14:53:10
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
  // 获取抖音热搜
  async getDouyinhot() {
    const { ctx } = this;

    await this.service.tianapi._getDouyinhot().then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取抖音热搜失败',
        // data: e,
      };
    });
  }
  // 获取百度热搜
  async getNethot() {
    const { ctx } = this;

    await this.service.tianapi._getNethot().then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取百度热搜失败',
        // data: e,
      };
    });
  }
  // 获取全网热搜
  async getNetworkhot() {
    const { ctx } = this;

    await this.service.tianapi._getNetworkhot().then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取全网热搜失败',
        // data: e,
      };
    });
  }
  // 获取国际新闻
  async getWorld() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getWorld({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取国际新闻失败',
        // data: e,
      };
    });
  }
  // 获取国内新闻
  async getGuonei() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getGuonei({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取国内新闻失败',
        // data: e,
      };
    });
  }
  // 获取社会新闻
  async getSocial() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getSocial({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取社会新闻失败',
        // data: e,
      };
    });
  }
  // 获取科技新闻
  async getKeji() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getKeji({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取科技新闻失败',
        // data: e,
      };
    });
  }
  // 获取区块链新闻
  async getBlockchain() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getBlockchain({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取区块链新闻失败',
        // data: e,
      };
    });
  }
  // 获取IT资讯
  async getIt() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getIt({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取IT资讯失败',
        // data: e,
      };
    });
  }
  // 获取互联网资讯
  async getInternet() {
    const { ctx } = this;
    // 解构参数
    const { word, page, pageSize } = ctx.request.query;

    await this.service.tianapi._getInternet({ word, page, pageSize }).then(data => {
      ctx.body = data.data;
    }).catch(() => {
      ctx.body = {
        code: 305,
        msg: '获取互联网资讯失败',
        // data: e,
      };
    });
  }
}

module.exports = TianapiController;
