$(document).ready(function() {
	$("#property-type").msDropdown().data("dd");	
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		var contentId = $("#contentId").val();
		document.location.href = basePath + "content/initContentPropertyDefine.do?contentId=" + contentId;
	});
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			var the_url = basePath + "content/saveContentPropertyDefine.do";
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
			b = b && this.checkCode()&&this.checkOrder();
			return b;
		},
		/**
		 * 属性名称验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#property-name");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"属性名称不能为空！"});
				return false;
			}
			if(pattern.test($($this).val())) {
				$this.validTip({title: "不能包含特殊符号！"});
				return false;
			}
			return true;
		},
		/**
		 * 属性标识验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkCode : function(){
			var $this = $("#property-code");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"属性标识不能为空！"});
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
		checkOrder : function(){
			var $this = $("#property-order");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"请填上属性的排序位置！"});
				return false;
			}
			return true;
		}
	},
}