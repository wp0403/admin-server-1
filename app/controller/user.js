/*
 * @Descripttion: 用户
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-06 11:39:35
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-03-20 15:58:59
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 根据关键字获取用户列表
  async searchUserList() {
    const { ctx } = this;
    // 解构参数
    const { keyword } = ctx.request.query;

    if (keyword) {
      await this.service.user
        ._searchUserList(keyword)
        .then(data => {
          ctx.body = {
            code: 200,
            msg: '获取用户列表成功',
            data,
          };
        })
        .catch(e => {
          ctx.body = {
            code: 300,
            msg: '获取用户列表失败',
          };
          console.log(e);
        });
    } else {
      await this.service.redis.get('userList_search').then(async data => {
        if (data) {
          ctx.body = {
            code: 200,
            msg: '获取用户列表成功',
            data,
          };
          return;
        }
        await this.service.user
          ._searchUserList(keyword)
          .then(data => {
            this.service.redis.set('userList_search', data);
            ctx.body = {
              code: 200,
              msg: '获取用户列表成功',
              data,
            };
          })
          .catch(e => {
            ctx.body = {
              code: 300,
              msg: '获取用户列表失败',
            };
            console.log(e);
          });
      });
    }
  }
  // 获取用户列表
  async getUserList() {
    const { ctx } = this;
    // 解构参数
    const { username, page, pageSize, state, email } = ctx.request.query;

    const isAuth = await this.service.auth.isAuth('read@user');

    if (!isAuth) {
      ctx.body = {
        code: 305,
        msg: '您暂无该权限，请联系管理员操作',
        // data: e,
      };
      return;
    }

    await this.service.redis
      .get(`userList_${page}_${pageSize}`)
      .then(async data => {
        if (data) {
          ctx.body = {
            code: 200,
            msg: '获取用户列表成功',
            ...data,
          };
          return;
        }
        await this.service.user
          ._getUserList({ username, page, page_size: pageSize, state, email })
          .then(data => {
            this.service.redis.set(`userList_${page}_${pageSize}`, data);
            ctx.body = {
              code: 200,
              msg: '获取用户列表成功',
              ...data,
            };
          })
          .catch(e => {
            ctx.body = {
              code: 300,
              msg: '获取用户列表失败',
            };
            console.log(e);
          });
      });
  }
  // 修改用户状态
  async putUserToExamine() {
    const { ctx } = this;

    const { uid, state } = ctx.request.body;

    if (!uid || !state) {
      // eslint-disable-next-line no-return-assign
      return (ctx.body = {
        code: 304,
        msg: '缺失数据',
      });
    }

    try {
      const isAuth = await this.service.auth.isAuth('toExamine@user');

      if (!isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const { data } = this.ctx.session.userInfo;
      if (uid === data.uid) {
        ctx.body = {
          code: 305,
          msg: '不能修改自己的状态，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const isEdit = await ctx.service.user._putUserToExamine({
        uid,
        state,
      });

      if (isEdit.code === 305) {
        ctx.body = isEdit;
      } else if (isEdit) {
        this.service.redis.delKeys('userList_');
        ctx.body = {
          code: 200,
          msg: '用户状态修改成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '用户状态修改失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '用户状态修改失败',
        // data: e,
      };
    }
  }
  // 修改用户角色
  async putUserState() {
    const { ctx } = this;

    const { uid, role_id } = ctx.request.body;

    if (!uid || !role_id) {
      // eslint-disable-next-line no-return-assign
      return (ctx.body = {
        code: 304,
        msg: '缺失数据',
      });
    }

    try {
      const isAuth = await this.service.auth.isAuth('setting@admin');

      if (!isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }
      const { data } = this.ctx.session.userInfo;

      if (uid === data.uid) {
        ctx.body = {
          code: 305,
          msg: '不能修改自己的角色，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const isEdit = await ctx.service.user._putUserState({
        uid,
        role_id,
      });

      if (isEdit) {
        this.service.redis.delKeys('userList_');
        ctx.body = {
          code: 200,
          msg: '用户角色修改成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '用户角色修改失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '用户角色修改失败',
        // data: e,
      };
    }
  }
  // 根据id获取用户详情
  async getUserDetails() {
    const { ctx } = this;

    // 解构参数
    const { id } = ctx.request.query;

    if (!id) {
      ctx.body = {
        code: 304,
        msg: '缺少用户id',
      };
      return;
    }

    try {
      const obj = await this.service.user._getUserDetails(id);
      const isAuth = await this.service.auth.isAuth('read@user');
      const {
        data: { uid },
      } = this.ctx.session.userInfo;

      if (obj.uid !== uid && !isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      ctx.body = {
        code: 200,
        data: obj,
        msg: '查询用户详情成功',
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '查询用户详情失败',
      };
    }
  }
  // 根据id获取用户站点信息
  async getUserSite() {
    const { ctx } = this;

    // 解构参数
    const { id } = ctx.request.query;

    if (!id) {
      ctx.body = {
        code: 304,
        msg: '缺少用户id',
      };
      return;
    }

    try {
      const obj = await this.service.user._getUserSite(id);
      const isAuth = await this.service.auth.isAuth('read@user');
      const {
        data: { uid },
      } = this.ctx.session.userInfo;

      if (obj.author_id !== uid && !isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      ctx.body = {
        code: 200,
        data: obj,
        msg: '查询用户站点信息成功',
      };
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '查询用户站点信息失败',
      };
    }
  }
  // 更新用户详情数据
  async putUserDetails() {
    const { ctx } = this;

    const obj = ctx.request.body;

    if (!obj) {
      // eslint-disable-next-line no-return-assign
      return (ctx.body = {
        code: 304,
        msg: '缺失详情数据',
      });
    }
    try {
      const isAuth = await this.service.auth.isAuth('edit@user');
      const {
        data: { uid },
      } = this.ctx.session.userInfo;

      if (obj.uid !== uid && !isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const isUpdate = await this.service.auth.isAuth('update@time');

      !isUpdate && delete obj.create_time;
      !isUpdate && (obj.last_edit_time = new Date());

      const isEdit = await ctx.service.user._putUserDetails(obj);

      if (isEdit) {
        this.service.redis.delKeys('user');
        ctx.body = {
          code: 200,
          msg: '用户详情数据修改成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '用户详情数据修改失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '用户详情数据修改失败',
        // data: e,
      };
    }
  }
  // 更新用户站点信息
  async putUserSite() {
    const { ctx } = this;

    const obj = ctx.request.body;

    if (!obj) {
      // eslint-disable-next-line no-return-assign
      return (ctx.body = {
        code: 304,
        msg: '缺失详情数据',
      });
    }
    try {
      const isAuth = await this.service.auth.isAuth('edit@user');
      const {
        data: { uid },
      } = this.ctx.session.userInfo;

      if (obj.author_id !== uid && !isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const isEdit = await ctx.service.user._putUserSite(obj);
      if (isEdit) {
        this.service.redis.delKey('user');
        ctx.body = {
          code: 200,
          msg: '用户站点信息修改成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '用户站点信息修改失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '用户站点信息修改失败',
        // data: e,
      };
    }
  }
  // 获取当前用户的知识数量
  async getUserKnowledgeNum() {
    const { ctx } = this;
    // 解构参数
    const { uid } = ctx.request.query;
    if (!uid) {
      return (ctx.body = {
        code: 304,
        msg: '缺失数据',
      });
    }

    try {
      await this.service.user._getUserKnowledgeNum(uid).then(res => {
        ctx.body = {
          code: 200,
          msg: '用户数据数量获取成功',
          data: res,
        };
      }).catch(() => {
        ctx.body = {
          code: 305,
          msg: '用户数据数量获取失败',
        };
      });
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '用户数据数量获取失败',
      };
    }
  }
}

module.exports = UserController;
