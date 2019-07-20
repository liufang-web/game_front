function share(titl,des,icon,share) {
    //TODO 修改share地址
    //服务器 start
    // var baseUrl = "http://118.89.225.133:9000";
    // var shareUrl = (share == null) ? "http://game.baicaogame.com/baicao/index.html?share=1":share;
    // var imageUrl = (icon == null) ? "http://game.baicaogame.com/baicao/img/comp/logo.jpg":icon;
    //end

    //本地 start
    var baseUrl = "http://2vf2808162.iok.la";
    var shareUrl = (share == null) ? "http://2vf2808162.iok.la:43699/baicao/index.html?share=1":share;
    var imageUrl = (icon == null) ? "http://2vf2808162.iok.la:43699/baicao/img/comp/logo.jpg":icon;
    //end
    var requestUrl = encodeURIComponent(window.location.href.split('#')[0]);
    var title = (titl == null) ? '百草游戏平台':titl;
    var desc =(des == null) ? '百草游戏，快乐生活':desc;
    $.ajax({
        type: "GET",
        url: baseUrl + "/share?url=" + requestUrl,
        dataType: "json",
        async: false,
        success: function (result) {
            if (result.code === 0) {
                var data = result.data;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名
                    jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function () {
                    wx.updateAppMessageShareData({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imageUrl, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    });
                    wx.updateTimelineShareData({
                        title: title, // 分享标题
                        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imageUrl, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imageUrl, // 分享图标
                        success: function () {

                        },
                        cancel: function () {
                            alert("分享失败")
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imageUrl, // 分享图标
                        success: function () {

                        },
                        cancel: function () {
                            alert("分享失败")
                        }
                    });
                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: shareUrl, // 分享链接
                        imgUrl: imageUrl, // 分享图标
                        success: function () {

                        },
                        cancel: function () {
                            alert("分享失败")
                        }
                    });
                });
            }
        }
    });
}
