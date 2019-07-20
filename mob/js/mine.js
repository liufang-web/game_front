var userName = window.localStorage.getItem("userName");
var userId = window.localStorage.getItem("userId");
var userJifen = window.localStorage.getItem("userJifen");
var userIcon = window.localStorage.getItem("userIcon");
var register = window.localStorage.getItem("register");    //register
var signDay = window.localStorage.getItem("signDay");
var playNumber = window.localStorage.getItem("playNumber");
var shareNumber = window.localStorage.getItem("shareNumber");
if (register >= 1) {  // 已签到
    $(".yes1").html("已完成");
    $(".yes1").css("color", "#e0e0e0");
}
if (playNumber >= 2) { // 已玩过两款游戏
    $(".yes3").html("已完成");
    $(".yes3").css("color", "#e0e0e0");
}
if (shareNumber >= 1) {//已分享
    $(".yes2").html("已完成");
    $(".yes2").css("color", "#e0e0e0");
}
// 关于索拓
function aboutSuo(){
    layer.open({
        content: '百草平台隶属于河北索拓网络科技有限公司。'
        ,style: 'background-color:white; color:black; border:none;' //自定风格
    });
};
// 联系我们
function contactme() {
    var img = '<div style="text-align: center"><img src="./img/comp/code.jpg"></div>'
    layer.open({
        type: 1,//Page层类型
        title: '长按关注公众号',
        shade: 0.6 ,//遮罩透明度
        maxmin: true ,//允许全屏最小化
        anim: 1 ,//0-6的动画形式，-1不开启
        content: img
    });
}
new Vue({
    el: "#app",
    data: {
        userName: userName,
        userId: userId,
        userJifen: userJifen,
        register: register,
        signDay: signDay,
        playNumber: playNumber,
        userIcon: userIcon,
    },
    created: function () {
        share();
        getUserInfo();
    },
    methods: {
        //register签到
        handleRegister: function () {
            var that=this;
            $(".dayWeek").css("display","block");
            if (userId != null) {
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/user/sign?userId=" + this.userId,
                    dataType: "json",
                    success: function (result) {
                        if (result.code == 0) {
                            var data = result.data;
                            window.localStorage.setItem("userJifen", data.userJifen);
                            window.localStorage.setItem("register", data.signNumber);//控制变灰
                            window.localStorage.setItem("signDay", data.signDay);//连续签到天数
                            that.userJifen = data.userJifen;
                            that.signDay=data.signDay;
                        }
                    }
                });
            }
        },
        registerEx: function(){
            $(".dayWeek").css("display","none");
            $(".yes1").html("已完成");
            $(".yes1").css("color", "#e0e0e0");
        },
        //每日玩两款游戏
        handleGame: function () {
            if (userId != null && playNumber < 2) {
                window.location.href = "index.html";
            }
        },
        //去分享
        toShare: function () {
             var that=this;
             if (userId != null && shareNumber<1) {
                 window.setTimeout(function(){
                     $.ajax({
                         type: "GET",
                         url: baseUrl + "/user/add/share?userId=" + this.userId,
                         dataType: "json",
                         success: function (result) {
                             if (result.code === 0) {
                                 var data = result.data;
                                 window.localStorage.setItem("userJifen", data.userJifen);
                                 window.localStorage.setItem("shareNumber", data.shareNumber);
                                 $(".yes2").html("已完成");
                                 $(".yes2").css("color", "#e0e0e0");
                                 that.userJifen = data.userJifen;
                                 console.log("share success");
                             }
                         }
                     })}
             ,3000);
            }
            $(".grayDiv").css("display","block");
            $(".yes2").css("color", "#e0e0e0");
        },
        handleGoRegi: function () {
            $(".grayDiv").hide();
            $(".box").show();
        }
    },

});
