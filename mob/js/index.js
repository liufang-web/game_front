var userId = window.localStorage.getItem("userId");
new Vue({
    el: '#app',
    data: {
        swiperList: [],
        showSwiper: false,
        hots: [],
        newList: [],
        recommends: [],
        historys: [],
        hotCount: 8,
        newCount: 8,
        recoCount: 8,
        totalList: []
    },
    created: function () {
        let that = this;
        getUserInfo(); //获取用户信息
        share();
        $.ajax({
            type: "GET",
            url: baseUrl + "/swiper/list",
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    that.swiperList = result.data;
                    that.$nextTick(()=>{
                        initSwiper();
                    })
                }
            }
        });
        $.ajax({
            type: "GET",
            url: baseUrl + "/games/hot",
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {
                    that.hots = result.data;

                }
            }
        });
        $.ajax({
            type: "GET",
            url: baseUrl + "/games/recommend",
            dataType: "json",
            success: function (result) {
                if (result.code == 0) {
                    that.recommends = result.data;
                }
            }
        });
        $.ajax({           //请求用户玩过数据
            type: "GET",
            url: baseUrl + "/games/history?userId=" + userId,
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    that.historys = result.data;
                }
            }
        });
        that.hotSize();
        that.newSize();
        that.recoSize();
        $.ajax({           //获取各个游戏的总数
            type: "GET",
            url: baseUrl + "/games/total",
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    that.totalList = result.data;
                }
            }
        });
    },
    methods: {
        hotPlay: function (gameId) {
            location.href = "game_detail.html?gameId=" + gameId;
        },
        newPlay: function (gameId) {
            location.href = "game_detail.html?gameId=" + gameId;
        },
        recommendPlay: function (gameId) {
            location.href = "game_detail.html?gameId=" + gameId;
        },
        // 热门新游推荐
        changeHot: function () {
            $("#hot").show();
            $("#newdis").hide();
            $("#recommend").hide();
            $(".jump-hot").css("background","#007aff");
            $(".jump-new").css("background-color","white");
            $(".jump-recomm").css("background","white");
            $(".jump-hot").css("color","white");
            $(".jump-new").css("color","#007aff");
            $(".jump-recomm").css("color","#007aff");
        },
        changeNewdis: function () {
            $("#newdis").show();
            $("#hot").hide();
            $("#recommend").hide();
            $(".jump-new").css("background-color","#007aff");
            $(".jump-hot").css("background-color","white");
            $(".jump-recomm").css("background-color","white");
            $(".jump-hot").css("color","#007aff");
            $(".jump-new").css("color","white");
            $(".jump-recomm").css("color","#007aff");
        },
        changeRec: function(){
            $("#recommend").show();
            $("#newdis").hide();
            $("#hot").hide();
            $(".jump-recomm").css("background-color","#007aff");
            $(".jump-new").css("background-color","white","color");
            $(".jump-hot").css("background-color","white","color");
            $(".jump-hot").css("color","#007aff");
            $(".jump-new").css("color","#007aff");
            $(".jump-recomm").css("color","white");
        },
        //点击加载更多
        loadMoreHot: function () {
            var that=this;
            this.hotCount=this.hotCount+8;
            this.hotSize();
        },
        loadMoreNew: function () {
            var that=this;
            this.newCount=this.newCount+8;
            this.newSize();
        },
        loadMoreReco: function () {
            var that=this;
            this.recoCount=this.recoCount+8;
            this.recoSize();
        },
        //热门新游
        hotSize: function() {
            var that = this;
            $.ajax({//加载更多热门游戏
                type: "GET",
                url: baseUrl + "/games/hot?size=" + that.hotCount,
                dataType: "json",
                success: function (result) {
                    if (result.code === 0) {
                        that.hots = result.data;
                    }
                }
            });
        },
        newSize: function(){
            var that = this;
            $.ajax({//加载更多新游游戏
                type: "GET",
                url: baseUrl+"/games/new?size="+that.newCount,
                dataType: "json",
                success: function (result) {
                    if (result.code===0){
                        that.newList=result.data;
                    }
                }
            });
        },
        recoSize: function(){
            var that = this;
            $.ajax({//加载更多推荐游戏
                type: "GET",
                url: baseUrl+"/games/recommend?size="+that.recoCount,
                dataType: "json",
                success: function (result) {
                    if (result.code===0){
                        that.recommends=result.data;
                    }
                }
            });
        },
        //搜索功能
        logo_search: function () {
            var input=$(".search-input").val();
            if(input===null||input===''){
                return;
            }else{
                window.location.href='logo_search.html?gameName='+input;
            }
        },
        //页游专区更多
        more_game: function(){
            window.location.href='game_list.html?category='+6;
        }
    }
});





