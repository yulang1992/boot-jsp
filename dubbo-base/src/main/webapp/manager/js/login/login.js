$(function(){
	$("#langchoosetable").find("input[name=name]").flagTip();
    $("#langchoosetable").find("input[name=password]").flagTip();

    //登录按钮点击事件
	$("#sign-btn-id").click(function(){
		login.ajax.loginAjax();
	});
	
	//密码框绑定回车事件
	$("#langchoosetable").find("input[name=password]").bind("keypress",function(event){
		if(event.keyCode == "13"){
			login.ajax.loginAjax();
		}
	});
});

var login = {
	ajax:{
		/**
		 * 登录按钮Ajax后台交互
		 */
		loginAjax : function(){
			if(!login.check.checkSubmit()){ //验证不通过
				return false;
			}
			var the_url = basePath +"/loginAjax.do";
			var data = {
					name : $("#sign-user-id").val(),
					password : $("#sign-pass-id").val()
			};
			$.ajax({
				type : "post",
				url : the_url,
				dataType : "json",
				data : data,
				success : function(data){
					if(data.result == 200){
						window.location.href = data.data.url;
					}else if(data.result == -999){
						$("#langchoosetable").find("input[name=name]").validTip({title:"用户不存在！"});
					}else if(data.result ==-9001){
						$("#langchoosetable").find("input[name=password]").validTip({title:"密码错误！"});
					}else{
						$("#langchoosetable").find("input[name=name]").validTip({title:"用户已离职！"});
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
		 * 登录表单提交验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checkSubmit : function(){
			var b = this.checkUsername();
			b = b && this.checkPassword();
			return b;
		},
		/**
		 * 用户名验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checkUsername : function(){
			var $this = $("#sign-user-id");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"用户名不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 密码验证
		 * @return{boolean} true 验证通过; false 验证不通过
		 */
		checkPassword : function(){
			var $this = $("#sign-pass-id");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"密码不能为空！"});
				return false;
			}
			return true;
		}
	},
		
}