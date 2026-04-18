// autoload.js - 德丽莎本地模型配置
// 模型文件路径：/live2d_models/delisha/delisha.model.json
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
        // 直接调用 L2Dwidget.init 加载本地模型
        L2Dwidget.init({
            model: {
                jsonPath: "/live2d_models/delisha/delisha.model.json"
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
                    'tap body': '呀，舰长，你碰到我了！TeriTeri~',
                    'tap face': '呜…不要摸我的脸啦！',
                    'tap head': '嘿嘿，舰长，有什么事吗？',
                    'every idle 20s': '今天也要加油哦，舰长！'
                }
            }
        });
        console.log("✅ 德丽莎 (本地模型) 加载成功！");
    }).catch(err => {
        console.error("❌ 德丽莎资源加载失败：", err);
    });
}