$(document).ready(function() {
	$("#content-group").msDropdown().data("dd");	
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		document.location.href = basePath + "content/initContentDefine.do";
	});
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			var the_url = basePath + "content/saveContentDefine.do";
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
			b = b && this.checkCount();
			return b;
		},
		/**
		 * 内容位名称验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#content-name");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"内容位名称不能为空！"});
				return false;
			}
			if(pattern.test($($this).val())) {
				$this.validTip({title: "不能包含特殊符号！"});
				return false;
			}
			return true;
		},
		/**
		 * 内容位数据条数验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkCount : function(){
			var $this = $("#content-count");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"内容位数据条数不能为空！"});
				return false;
			}
			return true;
		}
	},
}