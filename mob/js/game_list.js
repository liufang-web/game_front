
var categoryId = getSigleUrl();

new Vue({
    el: "#app-list",
    data: {
        gameList: [],
        categoryName: ""
    },
    created: function () {
        var that = this;
        $.ajax({
            type: "GET",
            url: baseUrl + "/category/getgames?categoryId=" + categoryId,
            dataType: "json",
            success: function (result) {
                if (result.code === 0) {
                   var list = result.data;
                   that.gameList = list;
                }
            }
        });
        $.get(baseUrl+"/category/get/categroy/name?categoryId="+categoryId,function (result) {
            if (result.code ===0){
                that.categoryName = result.data;
            }
        },"json");
    }
});
