// 德丽莎本地模型专用配置
// 请确保你的模型放在 source/live2d_models/delisha/ 目录下

// 使用本地路径（绝对路径）
const live2d_path = "/live2d-widget/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;

        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        } else if (type === "js") {
            tag = document.createElement("script");
            tag.src = url;
        }
        if (tag) {
            tag.onload = () => resolve(url);
            tag.onerror = () => reject(url);
            document.head.appendChild(tag);
        }
    });
}

// 加载核心资源并初始化
if (screen.width >= 768) {
    Promise.all([
        loadExternalResource(live2d_path + "waifu.css", "css"),
        loadExternalResource(live2d_path + "live2d.min.js", "js"),
        loadExternalResource(live2d_path + "waifu-tips.js", "js")
    ]).then(() => {
        // 等待 L2Dwidget 对象可用
        function initDelisha() {
            if (typeof L2Dwidget === "undefined") {
                setTimeout(initDelisha, 100);
                return;
            }

            // 直接使用 L2Dwidget 原生配置，不依赖 waifu-tips.js 的封装
            L2Dwidget.init({
                model: {
                    jsonPath: "/live2d_models/delisha/delisha.model.json" // 直接指向你的模型 JSON
                },
                display: {
                    position: "right",
                    width: 150,
                    height: 300,
                    hOffset: 0,
                    vOffset: -20
                },
                mobile: {
                    show: true,
                    scale: 0.5
                },
                react: {
                    opacityDefault: 0.7,
                    opacityOnHover: 0.2
                },
                dialog: {
                    enable: true,
                    script: {
                        // 这里配置你的触摸反馈和台词
                        'tap body': '呀，舰长，你碰到我了！TeriTeri~',
                        'tap face': '呜…不要摸我的脸啦！',
                        'tap head': '嘿嘿，舰长，有什么事吗？',
                        'every idle 20s': '今天也要加油哦，舰长！'
                    }
                },
                dev: {
                    log: false,
                    border: false
                }
            });

            console.log("✅ 德丽莎 (本地模型) 加载成功！");
        }

        initDelisha();
    }).catch(err => {
        console.error("❌ 德丽莎资源加载失败：", err);
    });
}

// 可选的 ASCII 字符画，保留或删除均可
console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);