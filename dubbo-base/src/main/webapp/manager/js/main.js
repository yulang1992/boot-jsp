/**
 * 表单元素验证气泡提示插件
 * 
 * @description <input type="text" id="input-id" /> 设置显示验证提示
 *              $(inputSelecter).validTip({title:"提示文案"}); or
 *              $(inputSelecter).validTip("提示文案"); $(inputSelecter).validTip();
 * 
 * 设置隐藏验证提示 $($inputSelecter).validTip("method","hide");
 * 
 */
(function($) {
	$.fn.validTip = function(option) {
		if(arguments.length){
		   if(arguments.length==1){
		       if(typeof option == "string"){
		          option = {
		             title : option
		          };
		       }
		   }else if(arguments.length==2){
		       var arg1 = arguments[0];
		       var arg2 = arguments[1];
		       option = {};
		       option[arg1] = arg2;
		   }
		}else{
		   option = option || {};
		}
		option = option || {};
		var op = {
		   title : "提示文案", 
		   postop : 33,
		   posright : 50,
		   hideEven : "click",
		   trigger : "tipshow"
		};
		for (var key in op) {
			option[key] = option[key] || op[key];
		}
		if(option.method){
			option.trigger = option.method;
		}
		var vtipidcode = $(this).data("vtipidcode");
		var tipDom;
		if(vtipidcode){
			tipDom = $("#"+vtipidcode);
		}
		if(tipDom==null || $(tipDom).length==0){
			vtipidcode = "vtipidcode"+new Date().getTime();
			vtipidcode += parseInt(Math.random()*1000000);
			var tipHtml = '<div class="yktipWAI" id="'+vtipidcode+'"><div class="yktip"></div></div>';
			tipDom = $(tipHtml);
			$("body").append(tipDom);
			$(tipDom).bind({
				tipshow : function(){
					$(this).show();
					$(this).trigger("timeoutClose");
				},
				tiphide : function(){
					$(this).hide();
					$(this).trigger("tipdestroy");
				},
				hide : function(){
					$(this).trigger("tiphide");
				},
				tipdestroy : function(){
					$(this).remove();
				},
				click : function(){
					
				},
				timeoutClose : function(){
					var $this = this;
					var id = $(this).attr("timeid");
					clearTimeout(id);
					id = setTimeout(function(){
						$($this).trigger("tiphide");
					},4000);
					$(this).attr("timeid",id);
				}
			});
			$(this).data("vtipidcode",vtipidcode);
			$(this).focus(function(e){
				var t = $(this).data("vtipidcode");
				t = $("#"+t);
				if(t && $(t).length>0 ){
					try{
						$(t).hide();
					}catch(e){
					
					}
				}
			});
		}
		$(tipDom).find(".yktip").html(option.title);
		var iwidth = $(this).width();
		var iheight = $(this).height();
		var ioffset = $(this).offset();
		var top = ioffset.top-option.postop;
		var left = ioffset.left+iwidth-option.posright-52;
		$(tipDom).css({"left":left,"top":top});
		if(option.trigger){
			$(tipDom).trigger(option.trigger);
		}
	}
})(jQuery);


/**
 * 输入框或者文本域内嵌内容输入提示文案插件,在绑定的元素获取焦点时，提示文案隐藏；在绑定的元素失去焦点时，提示文案显示
 * 
 * @param {object}
 *            option 参数 option.title 提示文案 缺省则直接读取表单元素的title属性
 * @description 方案1、 <input type="text" id="input-id" />
 *              $("#input-id").flagTip({title:"提示文案"}); 方案2、 <input type="text"
 *              id="input-id" title="提示文案"/> $("#input-id").flagTip(); 方案3、（推荐）
 *              <input type="text" id="input-id" flagtip="tip"/>
 * 
 */
(function($) {
	$.fn.flagTip = function(option) {
		option = option || {};
		$(this).each(function() {
					var tnames = "[name=flag-tip-name]";
					option["class"] = option["class"] || "input-flag-tip";
					var ftipd = '<div class="' + option["class"]+ '" name="flag-tip-name"></div>';
					var title = option.title || $(this).attr("title");
					var ftip = $(this).siblings(tnames);
					if (ftip.length == 0) {
						$(this).after(ftipd);
						ftip = $(this).siblings(tnames);
						option.width = option.width || $(this).width();
					}
					$(ftip).html(title);
					$(this).focus(function() {
								$(this).siblings("[name=flag-tip-name]").hide();
							}).bind("flagTipBlur", function() {
								var v = $(this).val();
								if ($.isEmpty(v)) {
									$(this).siblings("[name=flag-tip-name]").show();
								} else {
									$(this).siblings("[name=flag-tip-name]").hide();
								}
							}).blur(function() {
								$(this).trigger("flagTipBlur");
							}).trigger("flagTipBlur");
					$(ftip).click(function() {
						$(this).prev("input,textarea").focus();
					});
				});
	}
})(jQuery);


/* 枚举常量 */
var CONSTANTS={
	/**
	 * 返回结果
	 */
	CONTROLLER_RESULT : {
		SUCCESS : 1 ,
		/** 未知错误 */
		ERROR : -999,
		/** 业务异常 */
		SERVICE_EXCEPTION : -998,
		/** 未登录 */
		NOT_LOGIN : -1,
		/** 参数为空 */
		NULL_PARAMETER : -2,
		/** 对象为空 */
		NULL_OBJECT : -3,
		/** 没有操作权限 */
		UNAUTHORIZED : -4,
		/** 用户名错误*/
		ERROR_USERNAME : -5,
		/** 密码错误*/
		ERROR_PASSWORD : -6,
		/** 对象已存在*/
		ISEXIST : -7,
		/** 已存在 */
		IS_QUIT : -8
	},	
};

