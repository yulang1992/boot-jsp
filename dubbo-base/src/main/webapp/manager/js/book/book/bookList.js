$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "book/getBookList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','图片','产品名称','产品类型','所属一级分类','所属二级分类','所属三级分类','作者','出版社','现价','是否上架'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'imageUrl', index:'imageUrl', width:100, align:'left', formatter:formatImg, sortable:false},
						{name:'name', index:'name', width:200, align:'left', sorttype:'string', sortable:false},
						{name:'types', index:'types', width:100, align:'left', formatter:formatTypes, sortable:false},
						{name:'categoryOneName', index:'categoryOneName', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'categoryTwoName', index:'categoryTwoName', width:110, align:'left', sorttype:'string', sortable:false},
						{name:'categoryName', index:'categoryName', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'author', index:'author', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'press', index:'press', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'price', index:'price', width:80, align:'left', sorttype:'string', sortable:false},
						{name:'status', index:'status', width:80, align:'center', formatter:formatIsStatus, sortable:false}
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
	
	
	//图片
	function formatImg(cellvalue, options, rowObjec){
		return "<img id=" + rowObjec.id + " class='mark_data' width='30px;' height='30px;' style='cursor:pointer;' src="+cellvalue+">";
	}
	
	//产品类型
	function formatTypes(cellvalue, options, rowObjec){
		return cellvalue == 1?"文本":"音频";
	}
	
	//禁用、启用
	function formatIsStatus(cellvalue, options, rowObjec){
		return cellvalue == 1?"√":"╳";
	}
}

/**
 * 图片的点击事件
 */
$("#table").on("click", ".mark_data", function(){	
	layer.open({
	  type: 1,
	  title: false,
	  closeBtn: 0,
	  area: '200px',
	  skin: 'layui-layer-nobg', //没有背景色
	  shadeClose: true,
	  content: "<img width='200px' src='" + $(this).attr("src") + "'>"
	});
});


/**
 * 添加按钮事件
 */
$("#add").click(function(){
	document.location.href = basePath + "book/viewBook.do";
});

/**
 * 编辑按钮事件
 */
$("#edit").click(function(){
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能编辑一条记录.");
	}else if(selectRow.length == 1){
		document.location.href = basePath + "book/viewBook.do?id=" + selectRow[0];
	}else {
		toastr.info("请选择需要编辑的记录.");
	}
});


/**
 * 上架
 */
$("#enabled").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要上架的产品.");
	}else{
		$.ajax({
			url: basePath + 'book/isEnabled.do',
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
 * 下架
 */
$("#disable").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要下架的产品.");
	}else{
		$.ajax({
			url: basePath + 'book/isEnabled.do',
			type: 'post',
			dataType: 'json',
			traditional: true,
			data: {
				"ids": getIds(selectRows),
				"flag": 0
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
 * 下载图书资源
 */
$("#load").click(function(){
	swal({
		title: "您确定要从资源库里获取图书资源吗",
		text: "导入数据需要一定时间，请耐心等待！",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "下载",
		closeOnConfirm: true
	},function(){
		var index = parent.layer.load(0, {shade: [0.5,'#000']});
		$.ajax({
			url: basePath + 'book/loadBooks.do',
			type: 'post',
			dataType: 'json',
			traditional: true,
			success: function(data) {
				parent.layer.closeAll('loading');
				if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
					toastr.success(data.desc);
					loadTable();
		    	}else{
		    		toastr.error(data.desc);
		    	}
			}
		});
	});
});


/**
 * 搜索按钮事件
 */
$("#search").click(function(){
	search();
});

/**
 * 状态改变事件 
 */
$("#status").change(function(){
	search();
});

/**
 * 类型改变事件
 */
$("#types").change(function(){
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
	var state = $("#status").val();
	var type = $("#types").val();
	params.keyWord = keyWord;
	params.state = state;
	params.type = type;
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