var userId = window.localStorage.getItem("userId");
new Vue({
	el: "#app",
	data: {
		categoryList: [],
		userId: userId
	},
	created: function(){
		var that = this;
		$.ajax({
			type: "GET",
			url: baseUrl + "/category/list",
			dataType: "json",
			success: function(result){
				if(result.code ===0){
					that.categoryList = result.data;
				}else{
					console.log(result.msg);
				}
			}
		})
	}
});
