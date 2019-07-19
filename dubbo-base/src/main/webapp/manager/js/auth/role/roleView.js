$(document).ready(function() {
	$(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green",});
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		document.location.href = basePath + "role/initRole.do";
	});
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			var ids = save.check.getIds();
			if(ids == ""){
				return false;
			}
			var the_url = basePath + "role/saveRole.do?ids="+ids;
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
			b = b && this.checkDesc();
			return b;
		},
		/**
		 * 角色名称验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#role-name");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"角色名称不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 角色描述验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkDesc : function(){
			var $this = $("#description");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"角色描述不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 角色权限选择
		 * @return{string}
		 */
		getIds : function(){
			var checks = document.getElementsByName('resourceIds');
			var ids = '';
			for(var i=0; i<checks.length; i++){
				if(checks[i].checked){
					ids = ids + checks[i].value + ',';
				}
			}
			if(ids == ''){
				var $this = $("#mesTip");
				$this.validTip({title:"请至少选择一个角色权限！"});
				return ids;
			}
			return ids = ids.substring(0,ids.length-1);
		}
	},
}