/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-05 13:53:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-24 15:35:31
 */
'use strict';

const Service = require('egg').Service;

class CosService extends Service {
  // 获取腾讯云对象存储的key和value
  async getCosKey() {
    return await this.app.mysql.select('data_base', {
      where: { key: [ 'SecretId', 'SecretKey' ] }, // WHERE 条件
    });
  }
  // 获取邮箱授权吗
  async getEmailCode() {
    return await this.app.mysql.select('data_base', {
      where: { key: [ 'emailCode' ] }, // WHERE 条件
    });
  }
}

module.exports = CosService;
