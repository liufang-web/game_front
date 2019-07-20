
var gameName = getSigleUrl();

new Vue({
    el: "#logo_search",
    data: {
        gameList: [],
        showList: true
    },
    created: function () {
        var that = this;
        $.ajax({
            type: "GET",
            url: baseUrl + "/games/search?gameName=" + gameName,
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                    var list = result.data;
                    console.log(list);
                    if (list.length!==0) {
                        that.gameList = list;
                    }
                    else {
                        that.showList = false;
                    }
                }
            }
        });
    },
    methods: {
        //搜索功能
        logo_search: function () {
            var input=$(".search-input").val();
            if(input===null||input===''){
                return;
            }else{
                window.location.href='logo_search.html?gameName='+input;
            }
        },
    }
});
