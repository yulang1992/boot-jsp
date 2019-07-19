$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "comment/getCommentList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','头像','会员昵称','图书名称','评论时间','审核状态','评论内容'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'userHead', index:'userHead', width:80, align:'left',formatter:formatHead,  sortable:false},
						{name:'userName', index:'userName', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'bookName', index:'bookName', width:200, align:'left', sorttype:'string',  sortable:false},
						{name:'createTimeString', index:'createTimeString', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'status', index:'status', width:100, align:'left',formatter:formatStatus, sortable:false},
						{name:'content', index:'content', width:320, align:'left', sorttype:'string', sortable:false}
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
	
	//头像
	function formatHead(cellvalue, options, rowObjec){
		if(cellvalue == null){
			cellvalue = basePath + "/img/default_head.jpg";
		}
		return "<img width='30px;' height='30px;' src= "+cellvalue+">";
	}
	
	//状态
	function formatStatus(cellvalue, options, rowObjec){
		if(cellvalue == 0){
			return '未审核';
		}else if(cellvalue == 1){
			return "<span style='color:green'>通过</span>";
		}else{
			return "<span style='color:red'>不通过</span>";	
	    }
	}
}

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
				url: basePath + 'comment/deleteComment.do',
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
 * 通过
 */
$("#success").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要审核的评论.");
	}else{
		$.ajax({
			url: basePath + 'comment/isSuccess.do',
			type: 'post',
			dataType: 'json',
			traditional: true,
			data: {
				"ids": getIds(selectRows),
				"flag": 1
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
	}
});



/**
 * 不通过
 */
$("#fail").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要审核的评论.");
	}else{
		$.ajax({
			url: basePath + 'comment/isSuccess.do',
			type: 'post',
			dataType: 'json',
			traditional: true,
			data: {
				"ids": getIds(selectRows),
				"flag": 2
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
	}
});


/**
 * 状态搜索按钮事件
 */
$("#status").change(function(){
	search();
});


/**
 * 搜索按钮事件
 */
$("#search").click(function(){
	search();
});

/**
 * 搜索input回车事件
 */
$("#keyWord").keydown(function(e){
	if(e.keyCode == 13){
		search();
	}
});

/**
 * 搜索
 */
function search(){
	var params = {};
	var keyWord = $("#keyWord").val();
	var status = $("#status").val();
	params.keyWord = keyWord;
	params.status = status;
	$("#table").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:params, //发送数据  
        page:1  
    }).trigger("reloadGrid"); //重新载入
}

/**
 * 重新加载表格数据
 */
function loadTable(){
	$("#table").trigger("reloadGrid");
}