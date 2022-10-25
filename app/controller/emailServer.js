/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2022-10-24 15:23:40
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-10-24 16:57:01
 */
'use strict';

const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');

const createEmailUser = {
  host: 'smtp.163.com',
  port: 465, // SMTP 端口
  secure: true, //  安全的发送模式
  auth: {
    user: 'webwp0403@163.com', //  发件人邮箱
    pass: '', //  授权码
  },
};

class EmailController extends Controller {
  // 获取邮箱授权码
  async getEmailCode() {
    const { ctx } = this;

    await this.service.dataBase
      .getEmailCode()
      .then(data => {
        createEmailUser.auth.pass = data.find(
          item => item.key === 'emailCode'
        ).value;
      })
      .catch(e => {
        console.log(e);
        ctx.body = {
          code: 300,
          msg: '邮箱授权码获取失败',
        };
      });
  }

  // 发送邮件
  async sendOutEmail() {
    const { ctx } = this;
    // 解构参数
    const { subject, to, text, html } = ctx.request.body;
    if (!subject || !to || (!text && !html)) {
      ctx.body = {
        code: 305,
        msg: '缺少参数',
      };
      return;
    }

    await this.service.dataBase
      .getEmailCode()
      .then(data => {
        createEmailUser.auth.pass = data[0] && data[0].value;
      })
      .catch(e => {
        console.log(e);
        ctx.body = {
          code: 300,
          msg: '邮箱授权码获取失败',
        };
        return;
      });

    const transporter = nodemailer.createTransport(createEmailUser);

    await transporter.sendMail({
      // 发件人邮箱
      from: 'webwp0403@163.com',
      // 邮件标题
      subject,
      // 目标邮箱
      to,
      // 邮件内容
      text,
      html,
    }).then(() => {
      ctx.body = {
        code: 200,
        msg: '邮件发送成功',
      };
    }).catch(err => {
      console.log(err);
      ctx.body = {
        code: 300,
        msg: '邮件发送失败',
      };
    });
  }
}

module.exports = EmailController;
