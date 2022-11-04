/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-07-06 11:40:04
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-05 01:06:00
 */
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async _searchUserList(keyword) {
    if (!keyword) {
      return await this.app.mysql.select('admin', {
        columns: [ 'id', 'name', 'username', 'email', 'phone', 'website', 'uid' ],
      });
    }

    return await this.app.mysql.query(
      'select id,name,username,email,phone,website,uid from admin where name like ?',
      [ `%${keyword}%` ]
    );
  }
  // 获取用户列表
  async _getUserList(obj) {
    // 解构参数
    const {
      username,
      email,
      state,
      sortKey,
      sortOrder,
      page = 1,
      page_size = 10,
    } = obj;

    let sql =
      'select id,name,username,email,phone,website,create_time,last_edit_time,state,role_id,uid from admin';
    let num = 'select count(*) from admin';
    const content = []; // 参数
    let isMore = false; // 是否有多个查询参数
    /**
     * @模糊查询-量大的时候效率低
     * select * from user where name like ? % 内容 %
     * 在user表中全局查找name值 == 内容的
     * % 内容 % 全局查找内容
     *   内容 %  查找以 内容 开头的数据
     * */
    if (username) {
      sql += ' where username like ?';
      num += ' where username like ?';
      content.push('%' + username + '%');
      isMore = true;
    }
    if (email) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and email LIKE ?'; // and是两个条件都必须满足，or是或的关系
        num += 'and email LIKE ?';
      } else {
        sql += ' WHERE email LIKE ?';
        num += ' WHERE email LIKE ?';
      }
      content.push('%' + email + '%');
      isMore = true;
    }
    if (state) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and state == ?'; // and是两个条件都必须满足，or是或的关系
        num += 'and state == ?';
      } else {
        sql += ' WHERE state == ?';
        num += ' WHERE state == ?';
      }
      content.push(state);
      isMore = true;
    }

    // 开启排序
    if (sortKey && sortOrder) {
      sql += ` order by ${sortKey} ${sortOrder}`;
    }

    // 开启分页
    if (page || page_size) {
      const current = page; // 当前页码
      const pageSize = page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      content.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const userList = await this.app.mysql.query(sql, content);

    const userListNum = await this.app.mysql.query(num, content);

    return {
      data: userList,
      meta: {
        page,
        page_size,
        total: userListNum[0]['count(*)'],
      },
    };
  }
  // 修改用户审核状态
  async _putUserToExamine(obj) {
    const { uid, state } = obj;
    // 获取用户的角色id
    const userRole = await this.app.mysql.select('admin', {
      where: { uid },
      columns: [ 'role_id' ],
    });
    // 判断角色是否为超级管理员
    if (userRole && userRole[0] && +userRole[0].role_id === 1) {
      return {
        code: 305,
        msg: '您暂无该权限，请联系管理员操作',
      // data: e,
      };
    }
    if (userRole && userRole[0] && userRole[0].role_id < 3) {
      // 判断是否有修改角色的权限
      const isAuth = await this.service.auth.isAuth('setting@admin');

      if (!isAuth) {
        return {
          code: 305,
          msg: '您暂无该权限，请联系管理员操作',
          // data: e,
        };
      }
    }
    // 查找对应的数据
    const result = await this.app.mysql.update(
      'admin',
      { state: +state },
      {
        where: {
          uid,
        },
      }
    ); // 更新 admin 表中的记录
    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 修改用户角色
  async _putUserState(obj) {
    const { uid, role_id } = obj;
    // 查找对应的数据
    const result = await this.app.mysql.update(
      'admin',
      { role_id: +role_id },
      {
        where: {
          uid,
        },
      }
    ); // 更新 admin 表中的记录
    // 修改用户关联角色表
    const result1 = await this.app.mysql.update(
      'admin_role',
      { aid: uid, rid: +role_id },
      {
        where: {
          aid: uid,
        },
      }
    );
    // 判断更新成功
    return result.affectedRows === 1 && result1.affectedRows === 1;
  }
  // 获取用户详情
  async _getUserDetails(id) {
    const adminField = [ 'id', 'uid', 'name', 'username', 'email', 'phone', 'qq', 'weixin', 'github', 'website', 'img', 'personal_tags', 'state', 'create_time', 'last_edit_time', 'role_id' ];
    const sql =
        `select ${adminField.map(v => `${v}`).join(',')} from admin where id = ?`;
    const list = await this.app.mysql.query(sql, [ id ]);
    return list && list[0];
  }
  // 获取用户站点
  async _getUserSite(id) {
    const siteField = [ 'id', 'author_id', 'home_title', 'home_desc', 'home_about', 'personal_label', 'secret_guide', 'about_page' ];
    const sql =
          `select ${siteField.map(v => `${v}`).join(',')} from site where author_id = ?`;
    const list = await this.app.mysql.query(sql, [ id ]);
    return list && (list[0] || {});
  }
  // 获取用户详情(弃用)
  async __getUserDetails(id) {
    const adminField = [ 'id', 'name', 'username', 'email', 'phone', 'qq', 'weixin', 'github', 'website', 'img', 'personal_tags', 'state', 'create_time', 'last_edit_time', 'role_id' ];
    const siteField = [ 'id', 'author_id', 'home_title', 'home_desc', 'home_about', 'personal_label', 'secret_guide', 'about_page' ];
    const sql =
      `select ${adminField.map(v => `a.${v}`).join(',')},json_object(${siteField.map(v => `"${v}",b.${v}`).join(',')}) as siteInfo from admin a left join site b on a.uid = b.author_id where a.id = ?`;
    const list = await this.app.mysql.query(sql, [ id ]);
    return list && list[0]
      ? { ...list[0], siteInfo: JSON.parse(list[0].siteInfo) }
      : {};
  }
  // 修改用户详情
  async _putUserDetails(obj) {
    const result = await this.app.mysql.update('admin', obj);

    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 修改用户站点
  async _putUserSite(obj) {
    if (obj.id) {
      const result = await this.app.mysql.update('site', obj);
      // 判断更新成功
      return result.affectedRows === 1;
    }

    return await this._createUserSite(obj);
  }
  // 新增用户站点
  async _createUserSite(obj) {
    const result = await this.app.mysql.insert('site', obj);
    // 判断更新成功
    return result.affectedRows === 1 ? result.insertId : false;
  }
  // 获取当前用户的知识数量
  async _getUserKnowledgeNum(uid) {
    const obj = {
      article: 0,
      diary: 0,
      project: 0,
      secret: 0,
    };

    const promistList = [
      this.app.mysql.query('select count(*) from Bowen where author_id = ? and isDelete = 0', [ uid ]), // 文章数量
      this.app.mysql.query('select count(*) from playList where author_id = ? and isDelete = 0', [ uid ]), // 旅行日记数量
      this.app.mysql.query('select count(*) from projectList where author_id = ? and isDelete = 0', [ uid ]), // 项目数量
      this.app.mysql.query('select count(*) from secretList where author_id = ? and isDelete = 0', [ uid ]), // 树洞数量
    ];

    return Promise.all(promistList).then(res => {
      obj.article = res[0][0]['count(*)'];
      obj.diary = res[1][0]['count(*)'];
      obj.project = res[2][0]['count(*)'];
      obj.secret = res[3][0]['count(*)'];

      return obj;
    }).catch(e => {
      console.log(e);
      return false;
    });
  }
}

module.exports = UserService;
