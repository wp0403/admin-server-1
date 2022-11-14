/*
 * @Descripttion: 天行数据接口
 * @version:
 * @Author: WangPeng
 * @Date: 2022-11-12 14:41:11
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-11-12 20:52:19
 */
'use strict';

const Service = require('egg').Service;

let tianApiKey;

class TianapiService extends Service {
  async getTianApiKey() {
    if (tianApiKey) return;
    await this.service.dataBase
      .getKey([ 'tianApiKey' ])
      .then(data => {
        tianApiKey = data[0] && data[0].value;
      })
      .catch(e => {
        return e;
      });
  }
  /**
   * 查询当前登录ip的天气
   * https://www.tianapi.com/apiview/72
   */
  async getWeather() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/tianqi/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
        city: ctx.ip,
        type: '1',
      },
    });
    return result;
  }
  /**
   * 获取抖音热榜
   * https://www.tianapi.com/apiview/155
   */
  async getDouyinhot() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/douyinhot/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 获取天气诗句
   * https://www.tianapi.com/apiview/91
   * tqtype 天气类型 int
   */
  async getWeatherVerse() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/tianqishiju/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 获取朋友圈文案
   * https://www.tianapi.com/apiview/194
   */
  async getPyqwenan() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/pyqwenan/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 图片审核
   * https://www.tianapi.com/apiview/150
   * img      string  必填    图片base64编码（与imgurl参数二选一）
   * imgurl   string  非必填  图片URL（支持jpg/png/bmp/gif格式）
   * imgtype  int     非必填  图片类型，静态0[默认]，动态1
   */
  async getImgcensor() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/imgcensor/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 股市术语
   * https://www.tianapi.com/apiview/34
   * num   int      必填    返回数量
   * page  int      非必填  翻页
   * word  string   必填    搜索词
   */
  async getShares() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/shares/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 精美句子
   * https://www.tianapi.com/apiview/53
   */
  async getSentence() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/sentence/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 小段子
   * https://www.tianapi.com/apiview/56
   */
  async getMnpara() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/mnpara/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 英语一句话
   * https://www.tianapi.com/apiview/62
   */
  async getEnsentence() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/ensentence/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 古籍名句
   * https://www.tianapi.com/apiview/190
   */
  async getGjmj() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/gjmj/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 最美宋词
   * https://www.tianapi.com/apiview/195
   */
  async getZmsc() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/zmsc/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 情绪诗句
   * https://www.tianapi.com/apiview/236
   * type  int  非必填  分类查询，1离别,2人生,3生活,4四季
   */
  async getMoodpoetry() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/moodpoetry/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 百度热搜榜
   * https://www.tianapi.com/apiview/68
   */
  async getNethot() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/nethot/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 网络流行语
   * https://www.tianapi.com/apiview/33
   * num   int      必填    返回数量
   * page  int      非必填   翻页
   * word  string   必填    搜索词
   */
  async getHotword() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/hotword/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 神回复
   * https://www.tianapi.com/apiview/39
   * num   int      必填    返回数量
   */
  async getGodreply() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/godreply/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 故事大全
   * https://www.tianapi.com/apiview/113
   * num   int      必填    返回数量
   * page  int      非必填   翻页
   * word  string   必填    搜索词
   * type  int      非必填  故事类型，成语1、睡前2、童话3、寓言4
   */
  async getStory() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/story/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * ONE一个
   * https://www.tianapi.com/apiview/129
   * rand  int      非必填   是否随机
   * date  string   非必填   指定时间，默认当天
   */
  async getOne() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/one/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 毒鸡汤
   * https://www.tianapi.com/apiview/130
   */
  async getDujitang() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/dujitang/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 云音乐热评
   * https://www.tianapi.com/apiview/160
   */
  async getHotreview() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/hotreview/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 舔狗日记
   * https://www.tianapi.com/apiview/180
   */
  async getTiangou() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/tiangou/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 彩虹屁
   * https://www.tianapi.com/apiview/181
   */
  async getCaihongpi() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/caihongpi/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 经典台词
   * https://www.tianapi.com/apiview/183
   */
  async getDialogue() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/dialogue/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 全国行政区划
   * https://www.tianapi.com/apiview/141
   * province   string   非必填  省级行政区ID（含直辖市），获取市级行政区
   * city       string   非必填  市级行政区ID（市辖区/市辖县），获取区县级行政区
   * county     string   非必填  区县级行政区ID，获取乡镇（街道）级行政区
   * town       string   非必填  故乡镇（街道）级行政区ID，获取社区（村）级行政区
   * village    string   非必填  社区（村）级行政区ID，获取全部上级行政区
   */
  async getArea() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/area/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 全网热搜榜
   * https://www.tianapi.com/apiview/223
   */
  async getNetworkhot() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/networkhot/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 国际新闻
   * https://www.tianapi.com/apiview/5
   */
  async getWorld() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/world/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 社会新闻
   * https://www.tianapi.com/apiview/3
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getSocial() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/social/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 国内新闻
   * https://www.tianapi.com/apiview/4
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getGuonei() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/guonei/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 科技新闻
   * https://www.tianapi.com/apiview/10
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getKeji() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/keji/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 区块链新闻
   * https://www.tianapi.com/apiview/21
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getBlockchain() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/blockchain/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * IT资讯
   * https://www.tianapi.com/apiview/20
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getIt() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/it/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 互联网资讯
   * https://www.tianapi.com/apiview/79
   * num   int      必填     返回数量
   * page  int      非必填   翻页
   * word  string   非必填   搜索词
   * rand  int      非必填   随机获取
   */
  async getInternet() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/internet/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 早安心语
   * https://www.tianapi.com/apiview/143
   */
  async getZaoan() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/zaoan/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
  /**
   * 晚安心语
   * https://www.tianapi.com/apiview/142
   */
  async getWanan() {
    const { ctx } = this;
    await this.getTianApiKey();
    const result = await ctx.curl('https://apis.tianapi.com/wanan/index', {
      method: 'post',
      dataType: 'json',
      data: {
        key: tianApiKey,
      },
    });
    return result;
  }
}

module.exports = TianapiService;
