$(document).ready(function() {
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		var superCategoryId = $("#superCategoryId").val();
		var categoryTwoId = $("#categoryTwoId").val();
		
		document.location.href = basePath + "category/initCategoryThree.do?categoryTwoId="+categoryTwoId+"&superCategoryId="+superCategoryId;
	});
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			var isEnable = 0;
			if($("#isEnable").is(":checked")){
				isEnable = 1;
		    }
			var the_url = basePath + "category/saveCategory.do?isEnable="+isEnable;
			$.ajax({
				type : "post",
				url : the_url,
				dataType : "html",
				data : $('#commentForm').serialize(),
				cache: false,
				async : false,
				success : function(data){
					var obj = eval('(' + data + ')');
					if(obj.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
						toastr.success(obj.desc);
					}else if(obj.result == CONSTANTS.CONTROLLER_RESULT.ISEXIST){
						toastr.warning(obj.desc);
					}else{
						toastr.error(obj.desc);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {   
					alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
		    	}
			});
		}
	},
	
	check:{
		/**
		 * 保存表单提交验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkSubmit:function(){
			var b = this.checkName();
			return b;
		},
		/**
		 * 资源菜单名称验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#name");
			
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"名称不能为空！"});
				return false;
			}
		
			return true;
		}
	
	},
}