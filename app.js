const puppeteer = require('puppeteer');

class VipVideo {
    constructor() {
    }
    geturl(link) {
        return new Promise((resolve, reject) => {             
            (async () => {
              //const browser = await puppeteer.launch({headless: false,devtools: true,args:['--disable-web-security']});
              const browser = await puppeteer.launch({args:['--disable-web-security']});
              const page = await browser.newPage();
              
              page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
              
              //let link='https://www.mgtv.com/b/325599/4592004.html?cxid=90fe36tp1'
              console.log(`请求地址：${link}`)
              await page.goto(`http://yun.baiyug.cn/vip/?url=${link}`);
              
              dumpFrameTree(page.mainFrame(), '');
              //await browser.close();
            
              async function dumpFrameTree(frame, indent) {
                console.log(indent + frame.url());
                
                let videoHandle = await frame.$('video')
                if(videoHandle != null){
                    let video = await frame.evaluate(v => v.src, videoHandle);
                    console.log(video)
                    resolve(video)
                    await browser.close();
                }
                
                for (let child of frame.childFrames())
                  dumpFrameTree(child, indent + '  ');
              }    
              //document.querySelector('iframe').contentWindow.document.querySelector('iframe').contentWindow.document.querySelector('iframe').contentWindow.document.querySelector('video').src
             
              //await browser.close();
            })();
            //https://v.qq.com/x/cover/fgqtuu38z91hfyw.html&type=qq
        })

    }
}

module.exports = new VipVideo()
