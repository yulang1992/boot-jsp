$(document).ready(function() {
	//保存
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		var contentId = $("#contentId").val();
		document.location.href = basePath + "content/initContentDetail.do?contentId=" + contentId;
	});
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ //验证不通过
				return false;
			}
			
			var key = document.getElementsByName("key");
		 	var val = document.getElementsByName("val");
		 	var type = document.getElementsByName("type");
		 	
			var jsonString = '';
		 	var json = new Array();
		 	var img = '';
		 	for(var i=0;i<key.length;i++) {
		 		if(type[i].value!=3){
		 			jsonString = jsonString + key[i].value + ':' + val[i].value + ',';
		 		}else{
		 			img += key[i].value + ';' + val[i].value + ",";
		 		}
		 	}
		 	json = jsonString.split(',');
			$("#json").val(json);
			document.commentForm.action = basePath +"content/saveContentDetail.do?imgKV=" + img;
			$("#commentForm").submit();
		}
	},
	
	check:{
		/**
		 * 保存表单提交验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkSubmit:function(){
			var b = this.checkDetailOrder();
			return b;
		},
		/**
		 * 内容顺序验证
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkDetailOrder : function(){
			var $this = $("#detailOrder");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"内容顺序不能为空！"});
				return false;
			}
			if(!$.isZZNum($this.val())){
				$this.validTip({title:"请输入非负整数！"});
				return false;
			}
			return true;
		}
	},
	
}
