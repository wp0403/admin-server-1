/*
 * @Descripttion: 资源操作
 * @version: 1.0.0
 * @Author: WangPeng
 * @Date: 2022-09-06 09:39:32
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-15 11:20:34
 */
'use strict';

const Service = require('egg').Service;

class ResourcesService extends Service {
  // 批量写入图片
  async _insertImgs(v) {
    const { data } = this.ctx.session.userInfo;
    const values = v.map(item => ([ item.id, item.name, item.url, item.updateTime, item.size, data.username, data.uid ]));
    const sql = 'INSERT INTO img_list (id,name,url,updateTime,size,author,author_id) VALUES ?';
    const res = await this.app.mysql.query(
      sql, [ values ]
    );
    return res.affectedRows;
  }
  // 获取图片列表
  async _getImgList(obj) {
    // 解构参数
    const {
      sortKey,
      sortOrder,
      name,
      author_id,
      page = 1,
      page_size = 10,
      isDelete = 0,
    } = obj;

    let sql =
    'select a.*,json_object("id",b.uid,"name",b.name,"email",b.email) as userInfo from img_list a left join admin b on a.author_id = b.uid';
    let num = 'select count(*) from img_list';
    const content = []; // 参数
    let isMore = false; // 是否有多个查询参数
    /**
     * @模糊查询-量大的时候效率低
     * select * from user where name like ? % 内容 %
     * 在user表中全局查找name值 == 内容的
     * % 内容 % 全局查找内容
     *   内容 %  查找以 内容 开头的数据
     * */
    if (name) {
      sql += ' where name like ?';
      num += ' where name like ?';
      content.push('%' + name + '%');
      isMore = true;
    }
    if (author_id) {
      if (isMore) {
        // true代表有多个参数
        sql += 'and author_id IN (?)'; // and是两个条件都必须满足，or是或的关系
        num += 'and author_id IN (?)';
      } else {
        sql += ' WHERE author_id IN (?)';
        num += ' WHERE author_id IN (?)';
      }
      content.push(author_id);
      isMore = true;
    }
    if (isMore) {
      // true代表有多个参数
      sql += 'and a.isDelete = ?'; // and是两个条件都必须满足，or是或的关系
      num += 'and isDelete = ?';
    } else {
      sql += ' WHERE a.isDelete = ?';
      num += ' WHERE isDelete = ?';
    }
    content.push(isDelete);
    // 开启排序
    if (!sortKey || !sortOrder) {
      sql += ' order by id desc,create_time desc';
    } else {
      sql += ` order by ${sortKey} ${sortOrder}`;
    }

    // 开启分页
    if (page || page_size) {
      const current = page; // 当前页码
      const pageSize = page_size; // 一页展示多少条数据
      sql += ' limit ?,?';
      content.push((current - 1) * pageSize, parseInt(pageSize));
    }

    const imgList = await this.app.mysql.query(sql, content);

    const imgListNum = await this.app.mysql.query(num, content);

    return {
      data: imgList.map(v => ({ ...v, userInfo: JSON.parse(v.userInfo) })),
      meta: {
        page,
        page_size,
        total: imgListNum[0]['count(*)'],
      },
    };
  }
  // 写入图片
  async _insertImg(v) {
    const imgObj = await this.app.mysql.get('img_list', { name: v.name });
    let res;
    if (imgObj) {
      res = await this.app.mysql.update('img_list', { id: imgObj.id, ...v });
    } else {
      res = await this.app.mysql.insert('img_list', v);
    }
    return res.affectedRows === 1;
  }
  // 是否放入回收站
  async _delImg(obj) {
    const { id, isDelete } = obj;

    // 查找对应的数据
    const result = await this.app.mysql.update('img_list', {
      isDelete: isDelete ? 1 : 0,
    }, {
      where: {
        id,
      },
    }); // 更新表中的记录
      // 判断更新成功
    return result.affectedRows === 1;
  }
  // 删除图片
  async _deleteImg(id) {
    const result = await this.app.mysql.delete('img_list', {
      id,
    });
      // 判断删除成功
    return result.affectedRows === 1;
  }
}

module.exports = ResourcesService;
