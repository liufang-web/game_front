var userId = window.localStorage.getItem("userId");
var userName = window.localStorage.getItem("userName");
var userJifen = window.localStorage.getItem("userJifen");
var userIcon = window.localStorage.getItem("userIcon");
var recode = getQueryString("gameId") ;
/*
todo 服务器
 */
// var getCodeUri ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx14bb61a2fc39ded5&redirect_uri=" +
//     "http://game.baicaogame.com/baicao/iframe.html?gameId="+recode+
//     "&response_type=code&scope=snsapi_userinfo&state=STAT&connect_redirect=1#wechat_redirect";
var getCodeUri ="https://open.weixin.qq.com/connect/oauth2/authorize" +
    "?appid=wx00b91746955649fd&redirect_uri=http://2vf2808162.iok.la:43699/baicao/iframe.html?gameId=" +recode+
    "&response_type=code&scope=snsapi_userinfo&state=STAT&connect_redirect=1#wechat_redirect";
new Vue({
    el: "#app",
    data: {
        iframeUrl: null,
        userName: userName,
        userId: userId,
        userJifen: userJifen,
        userIcon: userIcon,
        gameList: [],
        gameHot: []
    },
    created: function () {
        layer.open({
            type: 1
            ,content: '<html>' +
                '<head></head>' +
                '<body></body>' +
                '</html>'
            ,anim: 'scale'
            ,time: 3
            ,style: 'background-image: url(\'./img/comp/baicao.gif\'); position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
        });
        var that = this;
        $.ajax({
            type: "GET",
            url: baseUrl + "/games/iframe?gameId=" + recode,
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    var game = result.data;
                    that.iframeUrl = game.gameUrl + "?userId=" + userId;
                    //TODO
                    var shareUrl ='http://2vf2808162.iok.la:43699/baicao/iframe.html?gameId='+recode+'&share=1';
                    var gameUrl = 'http://2vf2808162.iok.la:43699/baicao/'+game.gameIcon;
                    // var shareUrl ='http://game.baicaogame.com/baicao/iframe.html?gameId='+recode+'&share=1';
                    // var gameUrl = 'http://game.baicaogame.com/baicao/'+game.gameIcon;
                    share(game.gameName,game.gameProfile,gameUrl,shareUrl);
                } else {
                    console.log(result.msg);
                }
            }
        });
        if (userId != null) {
            $.ajax({
                type: "GET",
                url: baseUrl + "/games/played?gameId=" + recode + "&userId=" + userId,
                dataType: "json",
                success: function (result) {
                    if (result.code === 0) {
                        var played = result.data;
                        console.log(played.playNumber);
                        window.localStorage.setItem("userJifen", played.userJifen);
                        window.localStorage.setItem("playNumber", played.playNumber);
                    }
                }
            });
        };
        // 抽屉更多游戏
        $.get(baseUrl + "/games/drawer?number=6", function (result) {
            that.gameList = result.data;
        })
        // 抽屉游戏排行
        $.get(baseUrl+"/rank/list?gameId="+recode+"&number=7",function (result) {
            that.gameHot = result.data;
        })
    },
    mounted:function(){
        getUserInfo(getCodeUri)
    },
    methods: {
        // 更多游戏，游戏排行
        changeMore: function () {
            $(".more-game").show();
            $(".game-hot").hide();
            $(".jump-more").css("background","#dbdbdb");
            $(".jump-hot").css("background-color","white");
        },
        changeHot: function () {
            $(".more-game").hide();
            $(".game-hot").show();
            $(".jump-more").css("background-color","white");
            $(".jump-hot").css("background-color","#dbdbdb");
        },
        refreshMore: function () {
            var that=this;
            $.get(baseUrl + "/games/drawer?number=6", function (result) {
                that.gameList = result.data;
            });
        },
        // 关注二维码
        follow: function () {
            $(".info-content").hide();
            $(".qr-code").show();
        },
        // 二维码退出
        codeExit: function () {
            $(".info-content").show();
            $(".qr-code").hide();
        }
    }
});

function handleSuspend() {
    $(".suspend").css("display","none");
    $(".drawer").css("display","block");
    $(".opacityShow").css("z-index","3");
};
//退出
function handleClose() {
    $(".drawer").css("display","none");
    $(".grayDiv").css("display","block");
};
//是否确认退出
function yes() {
    window.location.href="game_detail.html?gameId="+recode;
};
function no() {
    $(".grayDiv").css("display","none");
    $(".suspend").css("display","block");
    $(".opacityShow").css("z-index","0");
};
//返回
function handleRefresh() {
    $(".suspend").css("display","block");
    $(".drawer").css("display","none");
    $(".opacityShow").css("z-index","0");
    $(".suspend").css("z-index","3");
    $(".grayDiv").css("display","none");
    $("#iframe").focus();
};

