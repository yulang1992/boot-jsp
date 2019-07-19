$(document).ready(function() {
	$(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green",});
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		document.location.href = basePath + "user/initUser.do";
	});
	//显示隐藏密码
	$("#show").click(function(){
		var inputType = document.getElementById("password");
		if(inputType.type == "password"){
			inputType.type = "text";
			$("#imageValue").removeClass("fa-eye");
			$("#imageValue").addClass("fa-eye-slash");
		}else{
			inputType.type = "password";
			$("#imageValue").removeClass("fa-eye-slash");
			$("#imageValue").addClass("fa-eye");
		}
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
			//设置状态checkbox值
			var status = $("input[name='status']:checked").val();
			if(status == 'on'){
				status = 1;
			}else{
				status = 0;
			}
			var the_url = basePath + "user/saveUser.do?ids="+ids+"&status="+status;
			$.ajax({
				type : "post",
				url : the_url,
				dataType : "html",
				data : $('#commentForm').serialize(),
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
			var b = this.checkUserName();
			b = b && this.checkPassword() && this.checkName() && this.checkPhone();
			return b;
		},
		/**
		 * 用户名验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkUserName : function(){
			var $this = $("#name");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"用户名不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 密码验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkPassword : function(){
			var $this = $("#password");
			if(typeof($($this).val()) != 'undefined' && ($($this).val() == "" || $($this).val() == null)){
				$this.validTip({title:"密码不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 姓名验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#realName");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"姓名不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 手机验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkPhone : function(){
			var $this = $("#mobilePhone");
			if(!$.isPhone($this.val())){
				$this.validTip({title:"请输入正确格式的手机号码！"});
				return false;
			}
			return true;
		},
		/**
		 * 角色选择
		 * @return{string}
		 */
		getIds : function(){
			var checks = document.getElementsByName('roleIds');
			var ids = '';
			for(var i=0; i<checks.length; i++){
				if(checks[i].checked){
					ids = ids + checks[i].value + ',';
				}
			}
			if(ids == ''){
				var $this = $("#mesTip");
				$this.validTip({title:"请至少选择一个角色！"});
				return ids;
			}
			return ids = ids.substring(0,ids.length-1);
		}
	},
	
	
}