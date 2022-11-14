/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-04-09 17:33:42
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-12 15:17:50
 */
'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  // 设置token
  loginToken(data, expires = 7200, cert = 'wp0403') {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const token = jwt.sign({ data, exp }, cert);
    return token;
  },
  // 解密token
  decryptToken(token, cert = 'wp0403') {
    return jwt.verify(token, cert);
  },
  // 第一段判断是否有反向代理IP(头信息：x-forwarded-for)，在判断connection的远程IP，以及后端的socket的IP。
  getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  },
};
