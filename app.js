const cheerio = require("cheerio")
    , fetch = require('node-fetch')
    , FormData = require('form-data')
    , iconv = require('iconv-lite');

class VipVideo {
    constructor() {
        this.host = 'http://api.baiyug.cn/vip_p_0bc2/';
        this.PlayPageUrl = this.host + "index.php?url=";
        this.VideoPageUrl = this.host + "url.php"
    }

    geturl(link) {

        var PlayPageUrl = this.PlayPageUrl + link;
        return new Promise((resolve, reject) => {
            //获取API解析页面
            fetch(PlayPageUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                    Referer: PlayPageUrl
                }
            }).then(res => res.text()).then(body => {
                var $ = cheerio.load(body);
                try {
                    var bb = body.match(/\\x\d{2}/g)
                    for (let i = 0; i < bb.length; i++) {
                        bb[i] = bb[i].replace('\\x', '0x')
                    }
                    var str = iconv.decode(new Buffer(bb), 'win1251');
                    //console.log(str);

                    var md5str = str.match(/\('([a-z0-9]+)'\)/)[1];
                    //console.log(md5str);


                    var form = new FormData();

                    var args = {
                        id: link,
                        type: 'auto',
                        siteuser: '',
                        md5: md5str,
                        hd: '',
                        lg: ''
                    }

                    for (var k in args) {
                        form.append(k, args[k]);
                    }

                    //获取实际播放地址路径
                    fetch(this.VideoPageUrl, {
                        method: 'POST',
                        body: form,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
                            Referer: PlayPageUrl
                        }
                    }).then(res => res.json()).then(result => {
                        resolve(result);
                    }).catch(err => {
                        reject(err);
                    });

                } catch (ex) {
                    reject(ex);
                }
            }).catch(err => {
                reject(err);
            })
        })

    }
}

module.exports = new VipVideo()
