/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2022-04-08 23:05:36
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-23 15:50:34
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  security: {
    // eslint-disable-next-line eggache/no-unexpected-plugin-keys
    csrf: true,
    package: 'egg-cors',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
