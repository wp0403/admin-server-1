/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-09-06 09:48:52
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-14 17:47:39
 */
'use strict';

const Controller = require('egg').Controller;

class ResourcesController extends Controller {
  // 批量写入图片
  async insertImgs() {
    const { ctx } = this;
    // 解构参数
    const list = ctx.request.body;

    try {
      const isTrue = await ctx.service.resources._insertImgs(list);

      if (isTrue) {
        ctx.body = {
          code: 200,
          msg: '数据导入成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '数据导入失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '数据导入失败',
        // data: e,
      };
    }
  }
  // 获取图片列表
  async getImgList() {
    const { ctx } = this;
    // 解构参数
    const {
      name,
      page,
      author_id,
      page_size,
    } = ctx.request.query;

    const isAuth = await this.service.auth.isAuth('read@img');

    let authorId = author_id;

    if (!isAuth) {
      const { data: { uid } } = this.ctx.session.userInfo;
      authorId = uid;
    }

    await this.service.resources
      ._getImgList({
        name,
        page,
        author_id: authorId,
        page_size,
      })
      .then(data => {
        ctx.body = {
          code: 200,
          msg: '图片列表数据获取成功',
          ...data,
        };
      })
      .catch(e => {
        console.log(e);
        ctx.body = {
          code: 300,
          msg: '图片列表数据获取失败',
        };
      });
  }
  // 单个写入图片
  async insertImg() {
    const { ctx } = this;
    // 解构参数
    const obj = ctx.request.body;

    try {
      const { data } = this.ctx.session.userInfo;
      const isTrue = await ctx.service.resources._insertImg({
        ...obj,
        author_id: data.uid,
      });

      if (isTrue) {
        ctx.body = {
          code: 200,
          msg: '数据导入成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '数据导入失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '数据导入失败',
        // data: e,
      };
    }
  }
  // 放入回收站
  async delImg() {
    const { ctx } = this;
    // 解构参数
    const { id, isDelete, authorId } = ctx.request.body;

    const isAuth = await this.service.auth.isAuth('delete@img');
    const { data: { uid } } = this.ctx.session.userInfo;
    if (authorId !== uid && !isAuth) {
      ctx.body = {
        code: 305,
        msg: '您暂无该权限，请联系管理员操作',
        // data: e,
      };
      return;
    }

    await this.service.resources
      ._delImg({ id, isDelete })
      .then(data => {
        ctx.body = {
          code: 200,
          msg: '操作成功',
          data,
        };
      })
      .catch(e => {
        console.log(e);
        ctx.body = {
          code: 300,
          msg: '操作失败',
        };
      });
  }
  // 永久删除图片
  async deleteImg() {
    const { ctx } = this;
    // 解构参数
    const { id } = ctx.request.body;

    try {
      const isAuth = await this.service.auth.isAuth('delete@img');

      if (!isAuth) {
        ctx.body = {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
        return;
      }

      const isEdit = await ctx.service.resources._deleteImg(id);

      if (isEdit) {
        ctx.body = {
          code: 200,
          msg: '图片删除成功',
        };
      } else {
        ctx.body = {
          code: 305,
          msg: '图片删除失败',
          // data: e,
        };
      }
    } catch (e) {
      ctx.body = {
        code: 305,
        msg: '图片删除失败',
        // data: e,
      };
    }
  }
}

module.exports = ResourcesController;
