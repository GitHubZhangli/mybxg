define(['jquery','template','util','validate','form'],function($,template,util){
	//设置导航菜单选中
	util.setMenu('/course/add');
	//获取课程id
	var csId= util.qs('cs_id');
	//获取添加和编辑的标识位
	var flag = util.qs('flag');

	//根据ID调用接口查询课程详情信息
	$.ajax({
		type:'get',
		url:'/api/course/basic',
		data:{cs_id:csId},
		dataType:'json',
		success:function(data){
			// console.log(data);
			// 解析数据渲染页面
			
			if(flag){
				data.result.operate='课程编辑';
			}else{
				data.result.operate='课程添加';
			}

			var html= template('basicTpl',data.result);
			$('#basicInfo').html(html);
			//处理二级分类的联动
			$('#firstType').change(function(){
				// alert(123);
				//先获取当前一级分类的Id
				var fId = $(this).val();
				// console.log(fId);
				$.ajax({
					type:'get',
					url:'/api/category/child',
					data:{cg_id:fId},
					dataType:'json',
					success:function(data){
						var tpl ='<option value="">请选择二级分类...</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
						var html = template.render(tpl,{list:data.result});
						$('#secondType').html(html);
					}
				})
			})
		}
	})
})