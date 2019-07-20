function getSigleUrl() {
    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var recode = url.substr(url.indexOf("=") + 1);
    }
    return recode;
}
var gameId = parseInt(getSigleUrl());
var userId = window.localStorage.getItem("userId");
var playNumber = window.localStorage.getItem("playNumber");

new Vue({
    el: "#app",
    data: {
        game: {},
        commentList: [],
        commentNumber: null,
        swiperLoops: [],
        gamekey: null,
    },
    created: function () {
        getUserInfo(); //获取用户信息
        share();
        var that = this;
        $.ajax({
            type: "GET",
            async:false,
            url: baseUrl + "/games/detail?gameId="+gameId,
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    that.swiperLoops = result.data;
                }
            }
        });
    },
    mounted: function(){
        var that = this;
        setInterval(function () {
            that.initSwiperSlider()
            },0)
    },
    methods: {
        //随机按钮
        suiji: function(){
            var that = this;
            $.ajax({
                type: "GET",
                url: baseUrl+ "/games/random",
                dataType: "json",
                success: function (result) {
                    if (result.code === 0) {
                        that.swiperLoops = result.data;
                    }
                }
            });
        },
        //显示评论列表
        showCom: function (key) {
            var that=this;
            that.gamekey = key;
            var gameid = this.swiperLoops[key].gameId;
            $.ajax({
                type: "GET",
                url: baseUrl + "/comment/list?gameId=" + gameid,
                dataType: "json",
                success: function (result) {
                    if (result.code === 0) {
                        that.commentList = result.data;
                    }
                }
            });
            that.getCommentNumber(gameid);
            $(".box-comment").show();
            $(".btn-group").hide();
            $(".start-game").hide();
        },
        //返回首页
        back: function () {
            $(location).attr('href', 'index.html');
        },
        //关闭评论
        closeComment: function () {
            $(".box-comment").hide();
            $(".btn-group").show();
            $(".start-game").show();
        },
        //添加评论
        addComment: function () {
            if (userId != null) {
                var that = this;
                var gameid = that.swiperLoops[that.gamekey].gameId;
                var comments = document.getElementById("content").value;
                if (comments === "") {
                    console.log("请输入评论")
                } else {
                    var content = $('#content').val();
                    $.ajax({
                        type: "POST",
                        url: baseUrl + "/comment/addComment",
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json",
                        processData: false,
                        data: JSON.stringify({"userId": userId, "gameId": gameid, "content": content}),
                        success: function (result) {
                            if (result.code === 0) {
                                that.commentList = result.data;
                                that.getCommentNumber(gameid);
                            }
                        }
                    });
                }
            }
            $("#content").val("");
        },
        //获取评论数量
        getCommentNumber: function (gameid) {
            var that= this;
            $.ajax({
                type: "GET",
                url: baseUrl + "/comment/number?gameId=" + gameid,
                dataType: "json",
                success: function (result) {
                    if (result.code === 0) {
                        that.commentNumber = result.data;
                    } else {
                        console.log(result.msg);
                    }
                }
            });
        },
        initSwiperSlider: function () {
            $("#flexslider").flexslider({
                slideshow: false,
                direction: 'vertical',
                directionNav: false,
                controlNav: false,
                animationLoop: true, //是否循环滚动
                end: function (event) {
                    layer.open({
                        content: '<div>点击随机按钮 &nbsp;<i class="fa fa-random fa-2x"></i>&nbsp;加载更多</div>'
                        ,style: 'margin-bottom:250px;' //自定风格
                        ,time: 3,skin: 'msg',anim:'up',
                    });
                }
            })
        }
    }

});
