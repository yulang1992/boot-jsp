$(document).ready(function() {
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		document.location.href = basePath + "notice/initNotice.do";
	});
	
//	UE.getEditor('editor', {
//		onready : function() {//创建一个编辑器实例
//			this.setContent(con);
//		}
//	});
//	var con='${notice.content}';
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			
			var the_url = basePath + "notice/saveNotice.do";
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
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"名称不能为空！"});
				return false;
			}
			if(pattern.test($($this).val())) {
				$this.validTip({title: "输入格式不正确！"});
				return false;
			}
			return true;
		}
	
	},
}