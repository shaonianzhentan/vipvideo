var VipVideo = require('./lib/VipVideo')


var link = 'https://www.mgtv.com/b/329499/6103746.html';

VipVideo(link).then(data => {
    console.log(data)
}).catch(err => {
    console.error('错误信息：', err)
})