define(['jquery','template','util','uploadify'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/course/add');
	//获取课程ID
	var csId = util.qs('cs_id');
	//根据课程ID查询课程封面信息
	$.ajax({
		type:'get',
		url:'/api/course/picture',
		data:{cs_id:csId},
		dataType:'json',
		success:function(data){
			console.log(data);
			//解析数据，渲染页面
			var html = template('pictureTpl',data.result);
			$('#pictureForm').html(html);
		}
	})
});