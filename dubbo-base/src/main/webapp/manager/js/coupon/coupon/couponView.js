$(document).ready(function() {
	// 提交
	$('#nav').click(function(){
		save.ajax.saveAjax();
	});
	// 返回
	$('#ret').click(function(){
		document.location.href = basePath + "coupon/initCoupon.do";
	});
	
	var ids = $('#ids').val();
	if(ids != ''){
		$.ajax({
			type : "post",
			url: basePath + 'coupon/getBook.do',
			dataType : "json",
			data: {
				"ids":ids
			},
			success : function(data){
				if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
					getBookList(data.data);
				}else{
					toastr.error(data.desc);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {   
				alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
	    	}
		});	
	}
});

var save = {
	ajax:{
		saveAjax : function(){
			if(!save.check.checkSubmit()){ // 验证不通过
				return false;
			}
			var ids = $('#ids').val();
			var the_url = basePath + "coupon/saveCoupon.do?bookIds="+ids;
			
			var stime = $("#startTimeString").val();
			var sdate = new Date(stime);
			var startTime = sdate.getTime()/1000;
			var etime = $("#endTimeString").val();
			var edate = new Date(etime);
			var endTime = edate.getTime()/1000;
		 	var imgFile = document.getElementById("imgFile").files[0];
		 	var formdata  = new FormData();
		 	formdata.append("imgFile",imgFile);			
			formdata.append("title",$("#title").val());		
			formdata.append("id",$("#id").val());		
			formdata.append("types",$("#types").val());		
			formdata.append("satisfyMoney",$("#satisfyMoney").val());		
			formdata.append("couponMoney",$("#couponMoney").val());		
			formdata.append("startTime",startTime);		
			formdata.append("endTime",endTime);		
			formdata.append("status",$("#status").val());		
			$.ajax({
				type: "post",
				url: the_url,
				contentType: "multipart/form-data",
				dataType: "json",
				contentType: false,
				processData: false,
				data: formdata,
				cache: false,
				success: function(data){
				var obj = data;
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
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkSubmit:function(){
			var b = this.checkTitle() ;
			b = b && this.checkName() && this.checkTime() && this.checkIds() && this.checkSatisfyMoney();
			return b;
		},
		/**
		 * 资源菜单名称验证
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkTitle : function(){
			var $this = $("#title");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$this.validTip({title:"活动标题不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 资源菜单名称验证
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkName : function(){
			var $this = $("#couponMoney");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val()){
				 if(!$.integer($this.val())){
						$this.validTip({title:"优惠金额只能为正整数！"});
						return false;
					}
				 return true;
			}else{
				$this.validTip({title:"优惠金额不能为空！"});
				return false;
			}
		},
		/**
		 * 资源菜单名称验证
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkSatisfyMoney : function(){
			var $this = $("#satisfyMoney");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val()){
				 if(!$.integer($this.val())){
						$this.validTip({title:"满足金额只能为正整数！"});
						return false;
					}
			}
			return true;
		},
		/**
		 * 资源菜单名称验证
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkIds : function(){
			var $this = $("#ids");
			var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\]<>/?\\；：%……+￥【】‘”“'。，、？]");
			if($($this).val() == "" || $($this).val() == null){
				$("#tan").validTip({title:"书籍不能为空！"});
				return false;
			}
			return true;
		},
		/**
		 * 资源菜单名称验证
		 * 
		 * @return{boolean} true验证通过;false验证不通过
		 */
		checkTime : function(){
			
			var stime = $("#startTimeString").val();
			if('' == stime){
				$("#startTimeString").validTip({title:"开始时间不能为空！"});
				return false;
			}
			
			var etime = $("#endTimeString").val();
			if('' == etime){
				$("#endTimeString").validTip({title:"结束时间不能为空！"});
				return false;
			}
				
			var sdate = new Date(stime);
			var startTime = sdate.getTime()/1000;
			
			var edate = new Date(etime);
			var endTime = edate.getTime()/1000;
			
			if(startTime > endTime){
				$("#endTimeString").validTip({title:"开始时间不能大于结束时间！"});
				return false;
			}
			return true;
		}
	},
}


$('#tan').click(function(){
	var the_url = basePath + "coupon/initAddCoupon.do";
	layer.open({
	  type: 2,
	  title: '选择图书',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['1000px', '510px'],
	  content: the_url
	});

});

function closeWin(){
	$(".layui-layer-close").click();
}

function getBookList(obj){
	var bookList = obj.bookList; 
	var ids = obj.bookIds;
	ids = ids.substring(0 , ids.length -1 );
	$('#ids').val(ids);
	
	var content = '';
	for(var i=0;i < bookList.length;i ++){
		content += '<div class="file-box">' +
						'<div class="file">' +                               
						    '<span class="corner"></span>' +
						    '<div style="width:150px">' +
								'<img alt="image" class="img-responsive" src="'+ bookList[i].imageUrl + '">' +
						    '</div>' +
						    '<div class="file-name title-omit">' +
						    	bookList[i].name +
								'<div style="text-align:right"><small style="cursor:pointer" onclick="shanchu(' + bookList[i].id + ')">删除</small></div>' +
							'</div>' +
						'</div>' +
					'</div>'; 
	}
	var div1 = $("#div1");
	div1.text("");// 清空数据
	div1.append(content);
}


function shanchu(e){
	var id = e;
	var ids = $('#ids').val();
	if(e > 0){
		$.ajax({
			type : "post",
			url: basePath + 'coupon/delBooks.do',
			dataType : "json",
			data: {
				"ids":ids,
				"id":id 
			},
			success : function(data){
				if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
					getBookList(data.data);
				}else{
					toastr.error(data.desc);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {   
				alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
	    	}
		});	
	}
	
}