/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-06-21 11:10:33
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-03 10:09:23
 */
'use strict';

const Service = require('egg').Service;

class SecretService extends Service {
  // 获取列表数据
  async getList(obj) {
    // 解构参数time_str,
    const {
      author_id,
      type,
      content,
      sortKey,
      isDelete = 1,
      sortOrder,
      page = 1,
      page_size = 10,
    } = obj;

    let sql =
      'select a.*,json_object("id",b.uid,"name",b.name,"email",b.email) as userInfo from secretList a left join admin b on a.author_id = b.uid';
    let num = 'select count(*) from secretList';
    const cont = []; // 参数
    let isMore = false; // 是否有多个查询参数
    /**
     * @模糊查询-量大的时候效率低
     * select * from user where name like ? % 内容 %
     * 在user表中全局查找name值 == 内容的
     * % 内容 % 全局查找内容
     *   内容 %  查找以 内容 开头的数据
     * */
    if (content) {
      sql += ' where a.content like ?';
      num += ' where content like ?';
      cont.push('%' + content + '%');
      isMore = true;
    }

    if (author_id) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and a.author_id IN (?)'; // and是两个条件都必须满足，or是或的关系
        num += 'and author_id IN (?)';
      } else {
        sql += ' WHERE a.author_id IN (?)';
        num += ' WHERE author_id IN (?)';
      }
      cont.push(author_id);
      isMore = true;
    }
    if (type) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and a.type IN (?)'; // and是两个条件都必须满足，or是或的关系
        num += 'and type IN (?)';
      } else {
        sql += ' WHERE a.type IN (?)';
        num += ' WHERE type IN (?)';
      }
      cont.push(type);
      isMore = true;
    }

    if (isDelete) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and a.isDelete != ?'; // and是两个条件都必须满足，or是或的关系
        num += 'and isDelete != ?';
      } else {
        sql += ' WHERE a.isDelete != ?';
        num += ' WHERE isDelete != ?';
      }
      cont.push(isDelete);
      isMore = true;
    }

    // 开启排序
    if (!sortKey || !sortOrder) {
      sql += ' order by a.isTop desc,  a.time_str desc';
    } else {
      sql += ` order by a.${sortKey} ${sortOrder}`;
    }

    // 开启分页
    if (page || page_size) {
      const current = page; // 当前页码
      const pageSize = page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      cont.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const secretList = await this.app.mysql.query(sql, cont);

    const secretListNum = await this.app.mysql.query(num, cont);

    return {
      data: secretList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) })),
      meta: {
        page,
        page_size,
        total: secretListNum[0]['count(*)'],
      },
    };
  }
  // 是否置顶事件
  async isTopFun(obj) {
    const { id, isTop } = obj;

    // 查找对应的数据
    const result = await this.app.mysql.update('secretList', {
      id,
      isTop: isTop ? 1 : 0,
    }); // 更新 secretList 表中的记录
    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 是否放入回收站
  async delSecretList(obj) {
    const { id, isDelete } = obj;

    // 查找对应的数据
    const result = await this.app.mysql.update('secretList', {
      id,
      isDelete: isDelete ? 1 : 0,
    }); // 更新 Bowen 表中的记录
    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 编辑树洞详情
  async _putSecretDetails(obj) {
    const result = await this.app.mysql.update('secretList', obj);

    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 修改树洞审核状态
  async _putSecretToExamine(obj) {
    const { id, secretType } = obj;

    // 查找对应的数据
    const result = await this.app.mysql.update('secretList', {
      id,
      secretType: +secretType,
    }); // 更新 Bowen 表中的记录
    // 判断更新成功
    return result.affectedRows === 1;
  }
  // 新增树洞
  async _createSecretDetails(obj) {
    const result = await this.app.mysql.insert('secretList', obj);
    // 判断更新成功
    return result.affectedRows === 1 ? result.insertId : false;
  }
  // 删除树洞
  async _deleteSecretDetails(id) {
    const result = await this.app.mysql.delete('secretList', {
      id,
    });
    // 判断删除成功
    return result.affectedRows === 1;
  }
}

module.exports = SecretService;
