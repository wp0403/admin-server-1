/* eslint-disable strict */
/*
 * @Descripttion:
 * @version: 1.1.1
 * @Author: 张三
 * @Date: 2021-07-10 11:32:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-26 18:09:06
 */
const whiteList = [ '/vcode', '/login', '/createUser' ];

module.exports = () => {
  return async (ctx, next) => {
    if (whiteList.some(item => ctx.request.url.includes(item))) {
      await next();
      return;
    }
    let token = ctx.request.header.authorization;

    if (!token) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '请登陆后再进行操作',
      };
      return;
    }

    try {
      const userInfo = ctx.helper.decryptToken(token);
      // 判断过期时间小于1小时更新token
      if (userInfo && userInfo.exp - (+new Date() / 1000) < 3600) {
        token = ctx.helper.loginToken({ ...userInfo.data }, 7200);
        ctx.set('authorization', token);
      }
      ctx.session.userInfo = userInfo;
      await next();
    } catch (e) {
      ctx.status = 402;
      ctx.body = {
        code: 402,
        msg: '登录状态已过期',
        error: e,
      };
      return;
    }
  };
};
