var vipvideo = require('./app')


var link = 'https://www.mgtv.com/b/328724/5723664.html?fpa=se';

vipvideo.geturl(link).then(data => {
    console.log(data)
}).catch(err => {
    console.error('错误信息：', err)
})