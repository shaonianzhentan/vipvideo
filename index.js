const Koa = require('koa');
const app = new Koa();

const VipVideo = require('./lib/VipVideo')

app.use(async ctx => {
  let body = {
    code: 1,
    msg: '接口参数不正确'
  }
  let link = ctx.query.url
  if (link) {
    try {
      let data = await VipVideo(link)
      //console.log(data)
      ctx.body = {
        code: 0,
        data: data,
        msg: `获取到数据`
      }
    } catch (ex) {
      console.error('错误信息：', ex)
      ctx.body = {
        code: 1,
        msg: `错误信息：${ex}`
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '接口参数不正确'
    }
  }
});

app.listen(2226);
console.log(`>listen：2226`)