var vipvideo = require('../app')


var link = 'http://v.youku.com/v_show/id_XMjk2MTUwNDUyOA==.html';

vipvideo.geturl(link).then(data => {
    console.log(data.url)
}).catch(err => {
    console.error('错误信息：', err)
})