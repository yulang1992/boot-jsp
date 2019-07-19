$(document).ready(function() {
	//提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	//返回
	$('#ret').click(function(){
		document.location.href = basePath + "book/initBook.do";
	});
	
	getPrevious();
});

// 获取省的信息
function getPrevious(){
	getData();
}
// 获取市的信息
function getCity(){
	getDatas(1)
}
// 获取城镇信息
function getTown(){
	getDatas(2)
}

function getData(){
	var data={				
	}
	$.post(basePath + "category/getCategoryLists",data,function(data){
		// 使用eval函数将响应的数据转换为可执行的js代码
		var areas= data.data.categoryList;
		// 获取显示响应数据的HTML元素对象
		var cdata=$("#categoryOneId");
		// 将原有数据清空
		cdata.empty();
		// 遍历循环结果
		cdata.append("<option value='0'>请选择</option>");
		for(var i=0;i<areas.length;i++){
			cdata.append("<option value="+areas[i].id+">"+areas[i].name+"</option>");
		}
	})
}
   	

function getDatas(e){
	var pid = "";
	if(1 == e){
		 pid= $("#categoryOneId").val();
	}else{
		 pid= $("#categoryTwoId").val();
	}
		
	var data={
		superId:pid
	}
	$.post(basePath + "category/getCategoryXiaJiList",data,function(data){
		//使用eval函数将响应的数据转换为可执行的js代码
		var areas= data.data.categoryList;
		//获取显示响应数据的HTML元素对象
		var cdata= "";
		if(1 == e){
			cdata= $("#categoryTwoId");
		}else{
			cdata= $("#categoryId");
		}
		
		//将原有数据清空
		cdata.empty();
		//遍历循环结果
		if(0 == pid && e == 1){
			cdata.append("<option value='0'>请选择</option>");
			var a = $("#categoryId");
			a.empty();
			a.append("<option value='0'>请选择</option>");
		}
		for(var i=0;i<areas.length;i++){
			cdata.append("<option value="+areas[i].id+">"+areas[i].name+"</option>");
		}
		if(areas.length < 1){
			cdata.append("<option value='0'>请选择</option>");
			}
		})
}

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
			var the_url = basePath + "book/saveBook.do?isEnable="+isEnable;
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
//			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"名称不能为空！"});
				return false;
			}
//			if(pattern.test($($this).val())) {
//				$this.validTip({title: "输入格式不正确！"});
//				return false;
//			}
			return true;
		}
	
	},
}

/**
 * 根据图书目录播放音频
 * @return
 */
function setVoice(index){
	$(".col-sm-9 a").each(function(){
		$(this).removeClass("active");
	});
	$("#au_"+index).addClass("active");
	var contentUrl = $("#contentUrl").val();
	var audioVule = contentUrl.split(",");
	$("#myAudio").attr('src',audioVule[index]);
	var audio = $("#myAudio")[0];
	audio.load();
	audio.play();
}

/**
 * 根据图书目录打开图书
 * @return
 */
function openBook(id,index){
	$(".col-sm-9 a").each(function(){
		$(this).removeClass("active");
	});
	$("#au_"+index).addClass("active");
	var url = "https://f.91pin.xyz/#/reader?bookId=" + id + "&index=" + index;
	window.open(url);
}