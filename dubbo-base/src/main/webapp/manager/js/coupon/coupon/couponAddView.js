$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", // 显示表格名称
			loadTableUrl: basePath + "coupon/getBookList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','图片','产品名称','产品类型','作者','出版社','现价','是否上架'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'imageUrl', index:'imageUrl', width:100, align:'left', formatter:formatImg, sortable:false},
						{name:'name', index:'name', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'types', index:'types', width:100, align:'left', formatter:formatTypes, sortable:false},						
						{name:'author', index:'author', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'press', index:'press', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'price', index:'price', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'status', index:'status', width:100, align:'left', formatter:formatIsStatus, sortable:false}
	                ];
	loadtable();
	
	function loadtable(){
		$(options.tableName).jqGrid({
			url: options.loadTableUrl,
			mtype: "get",
			datatype: "json",
			jsonReader: {	
					root: "data.rows", // 每页显示记录List
					page: "data.page", // 当前页码
			        total: "data.total", // 总页数
			        records: "data.records", // 总记录数
					repeatitems: false
			},
			colNames:colNames,          
            colModel:JqGridColModel,
            sortable:false,			            
            rownumbers:true,
            rownumWidth:50,
            rowNum:-1,
            pager:options.pager,
            viewrecords: true,		           
            width: "100%" ,
            height: 210,
            multiselect:true,	// 定义是否可以多选
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
	
	// 图片
	function formatImg(cellvalue, options, rowObjec){
		return "<img id=" + rowObjec.id + " class='mark_data' width='25px;' height='25px;' style='cursor:pointer;' src="+cellvalue+">";
	}
	
	// 产品类型
	function formatTypes(cellvalue, options, rowObjec){
		return cellvalue == 1?"文本":"音频";
	}
	
	// 禁用、启用
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
 * 类型改变事件
 */
$("#types").change(function(){
	search();
});


/**
 * 状态改变事件
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
	var state = $("#status").val();
	var type = $("#types").val();
	params.keyWord = keyWord;
	params.state = state;
	params.type = type;
	$("#table").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:params, // 发送数据
        page:1  
    }).trigger("reloadGrid"); // 重新载入
}

/**
 * 重新加载表格数据
 */
function loadTable(){
	$("#table").trigger("reloadGrid");
}


/**
 * 确定按钮事件
 */
$("#queding").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length > 0){
		$.ajax({
			url: basePath + 'coupon/getBook.do',
			type: 'post',
			dataType: 'json',
			traditional: true,
			data: {
				"ids": getIds(selectRows),
			},
			success: function(data) {
				if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
					parent.getBookList(data.data);
					parent.closeWin();
					
		    	}else{
		    		toastr.error(data.desc);
		    	}
			}
		});
	
	}else{
		toastr.info("请选择需要添加优惠券的图书.");
	}
});