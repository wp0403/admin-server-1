/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-05 13:53:41
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-12 14:32:22
 */
'use strict';

const Service = require('egg').Service;

class CosService extends Service {
  // eslint-disable-next-line jsdoc/require-param
  /**
   * cos:      [ 'SecretId', 'SecretKey' ]
   * email:    [ 'emailCode' ]
   * tianxing: [ 'tianApiKey' ]
   */
  async getKey(arr) {
    return await this.app.mysql.select('data_base', {
      where: { key: arr }, // WHERE 条件
    });
  }
}

module.exports = CosService;
