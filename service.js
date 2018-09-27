const Koa = require('koa');
var cors = require('koa2-cors');
const app = new Koa();
app.use(cors());


var vipvideo = require('./app')

app.use(async ctx => {
  let body = {
    code: 1,
    msg: '接口参数不正确'
  }
  let link = ctx.query.url
  if (link) {
    try {
      let data = await vipvideo.geturl(link)
      //console.log(data)
      ctx.body = {
        code: 0,
        data: data,
        msg: `获取到数据`
      }
    } catch (ex) {
      console.error('错误信息：', err)
      ctx.body = {
        code: 1,
        msg: `错误信息：${err}`
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '接口参数不正确'
    }
  }
});

app.listen(3000);
console.log(`>listen：3000`)