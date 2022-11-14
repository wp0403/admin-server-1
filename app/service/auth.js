/*
 * @Descripttion: 权限判断
 * @version:
 * @Author: WangPeng
 * @Date: 2022-08-26 10:42:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-14 15:52:12
 */
'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
  // 判断是否有权限
  async isAuth(authName) {
    const { data: { uid } } = this.ctx.session.userInfo;
    const admin_role = await this.app.mysql.get('admin_role', { aid: uid });
    const role = await this.app.mysql.get('role', { role_level: admin_role.rid });
    const permissionsList = await this.service.redis.get(`role_${admin_role.rid}`);
    if (permissionsList) {
      return permissionsList.some(item => item.authName === authName);
    }
    const role_permissions = await this.app.mysql.get('role_permissions', { rid: role.id });
    if (!role_permissions.pid) return false;
    const authList = role_permissions.pid
      ? role_permissions.pid.split(',')
      : [];
    const permissions = await this.app.mysql.select('permissions', {
      where: { id: authList },
    });
    this.service.redis.set(`role_${admin_role.rid}`, permissions);
    return permissions.some(item => item.authName === authName);
  }
}

module.exports = AuthService;
