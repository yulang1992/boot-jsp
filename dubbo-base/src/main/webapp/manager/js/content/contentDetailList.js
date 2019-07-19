$(function() {
	loadData();
});

function loadData() {
	var contentId = $("#contentId").val();
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "content/getContentDetailList.do?contentId=" + contentId,
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = $("#colNames").val().split(",");
	var arrayObj = $("#JqGridColModel").val().split(";");
	var JqGridColModel = new Array();
	for(var i=0;i<arrayObj.length;i++){
		var json = eval('(' + arrayObj[i] + ')'); 
		JqGridColModel.push(json)
	}
	
	loadtable();
	
	function loadtable(){
		$(options.tableName).jqGrid({
			datatype: "local",
			colNames:colNames,          
            colModel:JqGridColModel,
            sortable:false,			            
            rownumbers:true,
            rownumWidth:50,
            rowNum:15,
            rowList:[15, 30, 50],
            pager:options.pager,
            viewrecords: true,		           
            width: "100%" ,
            height: $(window).height()*0.5,
            multiselect:true,	//定义是否可以多选
            multiselectWidth:50,
			autowidth:true,
			shrinkToFit:false,
			regional:'cn',
			beforeSelectRow: function(rowid, e) { 
				var check = $(e.target).is('input[type=checkbox]');
				if(check){
					$(options.tableName).jqGrid('setSelection',rowid);
				}
				return check;
			},
			loadComplete:function(data){
				$(options.tableName).find('td').find(':checkbox').removeClass();
				$("#jqgh_table_cb").css("text-align","center");
			}
		});
		
		$.ajax({
			url: options.loadTableUrl,
			type: 'get',
			dataType: 'json',
			traditional: true,
			success: function(data) {
				if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
					var tableData = data.data.rows;
					var mydata = tableData.split(";");
					var myObject = new Array();
					for(var i=0;i<mydata.length;i++){
						var json = eval('(' + mydata[i] + ')'); 
						myObject.push(json)
					}
					for (var j = 0; j < myObject.length; j++){
						jQuery("#table").jqGrid('addRowData', myObject[j].id, myObject[j]);
					}
					$("#table").setGridParam({ rowNum: 15 }).trigger("reloadGrid"); //加载完数据再重新reload就行
		    	}else{
		    		toastr.error(data.desc);
		    	}
			}
		});
	}
	
	jQuery(options.tableName).jqGrid('setLabel',0, '序号');
	
	//格式化编辑内容
	function formatType(cellvalue, options, rowObject){
		if(typeof(cellvalue) != "undefined" && cellvalue.indexOf(".jpg") != -1){
			res = "<img src=" + cellvalue.replace('.jpg', '_w_30.jpg') + ">";
		}else {
			res = cellvalue;
		}
		return res;
	}
	
}

/**
 * 添加按钮事件
 */
$("#add").click(function(){
	var contentId = $("#contentId").val();
	document.location.href = basePath + "content/viewContentDetail.do?contentId=" + contentId;
});

/**
 * 编辑按钮事件
 */
$("#edit").click(function(){
	var contentId = $("#contentId").val();
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能编辑一条记录.");
	}else if(selectRow.length == 1){
		document.location.href = basePath + "content/viewContentDetail.do?id=" + selectRow[0] + "&contentId=" + contentId;
	}else {
		toastr.info("请选择需要编辑的记录.");
	}
});

/**
 * 删除按钮事件
 */
$("#del").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length > 0){
		swal({
			title: "您确定要删除这些信息吗",
			text: "删除后将无法恢复，请谨慎操作！",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			closeOnConfirm: true
		},function(){
			$.ajax({
				url: basePath + 'content/deleteContentDetail.do',
				type: 'post',
				dataType: 'json',
				traditional: true,
				data: {
					"ids": getIds(selectRows)
				},
				success: function(data) {
					if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
						toastr.success(data.desc);
						$("#table").jqGrid('clearGridData');  //清空表格
						loadData();
			    	}else{
			    		toastr.error(data.desc);
			    	}
				}
			});
		});
	}else {
		toastr.error("请选择需要删除的记录.");
	}
});

/**
 * 返回按钮事件
 */
$("#reply").click(function(){
	document.location.href = basePath + "content/initContentDefine";
});
