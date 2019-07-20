//TODO 修改common地址
/**
 * 生产环境
 * @type {string}
 */
// var baseUrl = "http://118.89.225.133:9000";
// var getCodeUrl ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx14bb61a2fc39ded5&redirect_uri=http://game.baicaogame.com/baicao/index.html&response_type=code&scope=snsapi_userinfo&state=STAT&connect_redirect=1#wechat_redirect";

/**
 * 测试环境
 * @param name
 * @returns {*}
 */
var baseUrl = "http://2vf2808162.iok.la";
var getCodeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
    "appid=wx00b91746955649fd&redirect_uri=http://2vf2808162.iok.la:43699/baicao/index.html" +
    "&response_type=code&scope=snsapi_userinfo&state=STAT#wechat_redirect";
//获取url 里的code,指定参数名称获取值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if (r != null) {
        return unescape(r[2]);
    } else if (q != null) {
        return unescape(q[2]);
    } else {
        return null;
    }
}
// 获取url 里的单个值
function getSigleUrl() {
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var recode = url.substr(url.indexOf("=") + 1);
    }
    return recode;
}

// 初始化swiper方法
function initSwiper() {
    var mySwiper = new Swiper('.swiper-container',{
        loop: true, // 循环模式选项
        autoplay: {
            delay:2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        lazyLoading : true,  //懒加载开启
        lazyLoadingInPrevNext : true,
        lazyLoadingInPrevNextAmount : 2,//设置为true允许将延迟加载应用到最接近的slide的图片（前一个和后一个slide）
        observe: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
    });
}

// 获取用户信息
function getUserInfo(getcodeUri) {
    //获取code 请求用户数据
    if (getQueryString("code") != null) {
        $.ajax({
            type: "GET",
            url: baseUrl + "/login?code=" + getQueryString("code"),
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {
                    var user = result.data;
                    window.localStorage.setItem("userId", user.userId);
                    window.localStorage.setItem("userName", user.userName);
                    window.localStorage.setItem("userJifen", user.userJifen);
                    window.localStorage.setItem("userIcon", user.userIcon);
                    window.localStorage.setItem("register", user.signNumber);
                    window.localStorage.setItem("playNumber", user.playNumber);
                    window.localStorage.setItem("shareNumber", user.shareNumber);
                    window.localStorage.setItem("signDay",user.signDay);
                }
            }
        });
    }
    // 分享链接再登陆提示
    else if (getQueryString("share")==1){
        var codeUrl = (getcodeUri == null)? getCodeUrl:getcodeUri;
        location.href = codeUrl;
    }
}
