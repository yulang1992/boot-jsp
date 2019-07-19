$(function() {
	loadData();
});

function loadData() {
	var contentId = $("#contentId").val();
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "content/getContentPropertyDefineList.do?contentId=" + contentId,
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','属性名称','属性标识','属性类型','属性排序'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'propertyName', index:'propertyName', width:300, align:'left', sorttype:'string', sortable:false},
						{name:'propertyCode', index:'propertyCode', width:200, align:'left', sorttype:'string', sortable:false},
						{name:'propertyType', index:'propertyType', width:200, align:'left', formatter:formatType, sortable:false},
						{name:'propertyOrder', index:'propertyOrder', width:200, align:'left', sorttype:'string', sortable:false}
	                ];
	loadtable();
	
	function loadtable(){
		$(options.tableName).jqGrid({
			url: options.loadTableUrl,
			mtype: "get",
			datatype: "json",
			jsonReader: {	
					root: "data.rows", //每页显示记录List
					page: "data.page", //当前页码
			        total: "data.total", //总页数
			        records: "data.records", //总记录数
					repeatitems: false
			},
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
		})
	}
	
	jQuery(options.tableName).jqGrid('setLabel',0, '序号');
	
	//格式化编辑内容
	function formatType(cellvalue, options, rowObject){
		var res = "";
		if(cellvalue == 1){
			res = "文字"
		}else if(cellvalue == 2){
			res = "日期"
		}else if(cellvalue == 3){
			res = "图片"
		}else {
			res = "链接"
		}
		return res;
	}
	
}

/**
 * 添加按钮事件
 */
$("#add").click(function(){
	var contentId = $("#contentId").val();
	document.location.href = basePath + "content/viewContentPropertyDefine.do?contentId=" + contentId;
});

/**
 * 编辑按钮事件
 */
$("#edit").click(function(){
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能编辑一条记录.");
	}else if(selectRow.length == 1){
		document.location.href = basePath + "content/viewContentPropertyDefine.do?id=" + selectRow[0];
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
				url: basePath + 'content/delContentPropertyDefine.do',
				type: 'post',
				dataType: 'json',
				traditional: true,
				data: {
					"ids": getIds(selectRows)
				},
				success: function(data) {
					if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
						toastr.success(data.desc);
						loadTable();
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

/**
 * 重新加载表格数据
 */
function loadTable(){
	$("#table").trigger("reloadGrid");
}