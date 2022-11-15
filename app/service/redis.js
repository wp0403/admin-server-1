/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-20 16:06:29
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-15 16:57:40
 */
'use strict';

const Service = require('egg').Service;
const time = 60 * 60 * 24 * 30; // 默认缓存失效时间 30天

class RedisService extends Service {
  // 设置
  async set(key, value, seconds) {
    // seconds 有效时长
    const { redis } = this.app;
    value = JSON.stringify(value);
    return await redis.set(key, value, 'EX', seconds || time).then(() => {
      return true;
    }).catch(e => {
      new Error(e);
      return e;
    });
  }
  // 获取
  async get(key) {
    const { redis } = this.app;
    return await redis.get(key).then(data => {
      if (data) data = JSON.parse(data);
      return data;
    }).catch(e => {
      new Error(e);
      return e;
    });
  }
  // 删除指定的缓存
  async delKey(key) {
    const { redis } = this.app;
    await redis.del(key).then(() => {
      return true;
    }).catch(e => {
      new Error(e);
      return e;
    });
  }
  // 清空redis
  async flushall() {
    const { redis } = this.app;
    await redis.flushall().then(() => {
      return true;
    }).catch(e => {
      new Error(e);
      return e;
    });
  }
  // 删除指定前缀的缓存
  async delKeys(key) {
    const { redis } = this.app;
    await redis.keys(`${key}*`).then(data => {
      Promise.all(data.map(v => redis.del(v))).then(() => {
        // 指定缓存清理成功
        return true;
      }).catch(() => {
        // 存在不成功的删除全部缓存
        this.flushall();
      });
    }).catch(e => {
      new Error(e);
      return e;
    });
  }
}

module.exports = RedisService;
