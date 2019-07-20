var userName = window.localStorage.getItem("userName");
var userId = window.localStorage.getItem("userId");
var userJifen = window.localStorage.getItem("userJifen");
var userIcon = window.localStorage.getItem("userIcon");
var register = window.localStorage.getItem("register");    //register
var signDay = window.localStorage.getItem("signDay");
if (register >= 1) {  // 已签到
    $(".yes1").html("已签到");
    $(".yes1").css("color", "#e0e0e0");
    $(".yes1").css("border", "2px solid #dbdbdb");
}
// 公告滚动
/*
* 参数说明
* obj : 动画的节点，本例中是ul
* top : 动画的高度，本例中是-35px;注意向上滚动是负数
* time : 动画的速度，即完成动画所用时间，本例中是500毫秒，即marginTop从0到-35px耗时500毫秒
* function : 回调函数，每次动画完成，marginTop归零，并把此时第一条信息添加到列表最后;
*
*/
function noticeUp(obj,top,time) {
    $(obj).animate({
        marginTop: top
    }, time, function () {
        $(this).css({marginTop: "0"}).find(":first").appendTo(this);
    })
}
$(function () {
    // 调用 公告滚动函数
    setInterval("noticeUp('.notice-ul','-60px',2000)", 2000);
});
new Vue({
    el: "#app",
    data: {
        userName: userName,
        userId: userId,
        userJifen: userJifen,
        userIcon: userIcon,
        register: register,
        signDay: signDay,
        matterList: [],
        dummyList: [],
        notice: [],
        canList: [],
        diamondList: [],
        getRecordList: [],
        changeRecord: [],
        goodsList: [],
        phone: '',
        name: '',
        address1: '',
        address2: '',
        address3: '',
    },
    created: function () {
        var that=this;
        share();
        getUserInfo();
        // 商品兑换记录
        $.get(baseUrl + "/shop/board/list", function (result) {
            that.notice = result.data;
        });
        // 实物商品
        $.get(baseUrl + "/shop/list?type=1", function (result) {
            that.matterList = result.data;
        });
        // 虚拟物品
        $.get(baseUrl + "/shop/list?type=0", function (result) {
            that.dummyList = result.data;
        });
        // 可兑换的实物列表
        $.get(baseUrl + "/shop/enough?userId="+that.userId, function (result) {
            that.canList = result.data;
        });
        //获取积分记录
        $.get(baseUrl + "/shop/record/list?userId="+that.userId, function (result) {
            that.getRecordList = result.data;
        });
        //兑换积分记录
        $.get(baseUrl + "/shop/order/list?userId="+that.userId, function (result) {
            that.changeRecord = result.data;
        });
        // 用户的钻石数
        $.get(baseUrl + "/user/diamond?userId="+that.userId, function (result) {
            that.diamondList = result.data;
            window.localStorage.setItem("userJifen", that.diamondList.diamond);
            that.userJifen = that.diamondList.diamond;
        });
    },
    methods: {
        //register签到
        handleRegister: function () {
            var that=this;
            $(".dayWeek").css("display","block");
            $("body").css("overflow","hidden");
            if (userId != null) {
                $.ajax({
                    type: "POST",
                    url: baseUrl + "/user/sign?userId=" + that.userId,
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
            $("body").css("overflow","auto");
            $(".yes1").html("已签到");
            $(".yes1").css("color", "#e0e0e0");
            $(".yes1").css("border", "2px solid #dbdbdb");
        },
        // 积分商城，积分纪录，积分规则互换
        shopMall: function () {
            $(".mall-content").show();
            $(".shop-mall").css("background","#007aff");
            $(".shop-mall").css("color","white");
            $(".record-content").hide();
            $(".shop-record").css("background","white");
            $(".shop-record").css("color","gray");
            $(".rule-content").hide();
            $(".shop-rule").css("background","white");
            $(".shop-rule").css("color","gray");
            $(".goods-details").hide();
        },
        shopRecord: function () {
            $(".record-content").show();
            $(".shop-record").css("background","#007aff");
            $(".shop-record").css("color","white");
            $(".mall-content").hide();
            $(".shop-mall").css("background","white");
            $(".shop-mall").css("color","gray");
            $(".rule-content").hide();
            $(".shop-rule").css("background","white");
            $(".shop-rule").css("color","gray");
            $(".goods-details").hide();
        },
        shopRule: function () {
            $(".rule-content").show();
            $(".shop-rule").css("background","#007aff");
            $(".shop-rule").css("color","white");
            $(".mall-content").hide();
            $(".shop-mall").css("background","white");
            $(".shop-mall").css("color","gray");
            $(".record-content").hide();
            $(".shop-record").css("background","white");
            $(".shop-record").css("color","gray");
            $(".goods-details").hide();
        },
        // 积分商城实物与虚拟互换
        matter: function () {
            $(".matter-content").show();
            $(".matter").css("border-bottom","2px solid #007aff");
            $(".dummy-content").hide();
            $(".dummy").css("border-bottom","2px solid #dbdbdb");
        },
        dummy: function () {
            $(".dummy-content").show();
            $(".dummy").css("border-bottom","2px solid #007aff");
            $(".matter-content").hide();
            $(".matter").css("border-bottom","2px solid #dbdbdb");
        },
        // 实物商品全部与可兑互换
        total: function () {
            $(".total-content").show();
            $(".total").css("background","gray");
            $(".total").css("color","white");
            $(".can-content").hide();
            $(".can").css("background","white");
            $(".can").css("color","gray");
        },
        can: function () {
            $(".can-content").show();
            $(".can").css("background","gray");
            $(".can").css("color","white");
            $(".total-content").hide();
            $(".total").css("background","white");
            $(".total").css("color","gray");
        },
        // 积分纪录获取与兑换
        getRecord: function () {
            $(".get").show();
            $(".get-record").css("border-bottom","2px solid #007aff");
            $(".change").hide();
            $(".change-record").css("border-bottom","2px solid #dbdbdb");
        },
        ChangeRecord: function () {
            var that=this;
            $(".change").show();
            $(".change-record").css("border-bottom","2px solid #007aff");
            $(".get").hide();
            $(".get-record").css("border-bottom","2px solid #dbdbdb");
        },
        // 实物详情
        goodsDetails(productId) {
            var that=this;
            $(".goods-details").show();
            $(".mall-content").hide();
            $.get(baseUrl + "/shop/real/detail?productId="+productId, function (result) {
                that.goodsList = result.data;
            });
        },
        // 实物详情页面返回
        reply() {
            $(".select-name").val("");
            $(".name-number").val("");
            $(".detailed").val("");
            $('#target').distpicker('reset');
            $(".mall-content").show();
            $(".goods-details").hide();
        },
        // 实物兑换
        getGoods(productId) {
            var that = this;
            var userId = that.userId;
            var productId = productId;
            var name = that.name;
            var phone = that.phone;
            var address = that.address1 + that.address2 + that.address3;
            if (name !='' && phone !='' && address !=''){
                layer.open({
                    anim: 'up'
                    ,content: '确认兑换吗?'
                    ,btn: ['确认', '取消'],
                    yes: function (index) {
                        $.ajax({
                            async: true,
                            type: "POST",
                            data: JSON.stringify({"userId":that.userId,"productId": productId,"name": that.name,
                                "phone": that.phone,"address": that.address1 + that.address2 + that.address3}),
                            data: JSON.stringify({"userId":userId,"productId": productId,"name": name,
                                "phone": phone,"address": address}),
                            url: baseUrl + "/shop/order",
                            dataType: "json",
                            contentType: "application/json",
                            success: function () {
                                // 用户的钻石数
                                $.get(baseUrl + "/user/diamond?userId="+that.userId, function (result) {
                                    that.diamondList = result.data;
                                    window.localStorage.setItem("userJifen", that.diamondList.diamond);
                                    that.userJifen = that.diamondList.diamond;
                                });
                                //兑换积分记录
                                $.get(baseUrl + "/shop/order/list?userId="+that.userId, function (result) {
                                    that.changeRecord = result.data;
                                });
                            }
                        })
                        layer.close(index);
                        that.shopRecord();
                        that.ChangeRecord();
                    }
                });
            }else {
                layer.open({
                    content: '请填写正确的信息'
                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                    ,time: 3
                });
            }

        },
        //兑换商品的订单详情
        handleOrder(number) {
            window.location.href = "order_detail.html?orderNumber="+number;
            // var html = window.location.href='order_detail.html?orderNumber='+number
            // layer.open({
            //     type: 1
            //     ,content: html
            //     ,anim: 'up'
            //     ,style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
            // });

        },
    },

});




























