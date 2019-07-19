$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "order/getOrderList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','订单号','商品名称','商品价格','实际支付金额','订单状态','支付方式','购买用户','下单时间'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'orderNumber', index:'orderNumber', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'names', index:'names', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'totalPrice', index:'totalPrice', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'actualPayment', index:'actualPayment', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'status', index:'status', width:100, align:'left', formatter:formatStatus, sortable:false},
						{name:'payment', index:'payment', width:100, align:'left', formatter:formatPayment, sortable:false},
						{name:'userName', index:'userName', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'createTimeString', index:'createTimeString', width:150, align:'left', sorttype:'string', sortable:false}
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

	//订单状态
	function formatStatus(cellvalue, options, rowObjec){
		if(cellvalue == 1){
			cellvalue = "未支付";
		}else if(cellvalue == 2){
			cellvalue = "已支付";
		}else{
			cellvalue = "已取消";
		}
		return cellvalue;
	}
	
	//支付方式
	function formatPayment(cellvalue, options, rowObjec){
		if(cellvalue == 1){
			cellvalue = "支付宝";
		}else if(cellvalue == 2){
			cellvalue = "微信";
		}else{
			cellvalue = "其它";
		}
		return cellvalue;
	}
}

/**
 * 查看按钮事件
 */
$("#view").click(function(){
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能查看一条记录.");
	}else if(selectRow.length == 1){
		document.location.href = basePath + "order/viewOrder.do?id=" + selectRow[0];
	}else {
		toastr.info("请选择需要查看的记录.");
	}
});


/**
 * 搜索按钮事件
 */
$("#search").click(function(){
	search();
});

/**
 * select改变事件
 */
$("#status").change(function(){
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
	var stime = $("#stime").val();
	var etime = $("#etime").val();
	params.keyWord = keyWord;
	params.state = state;
	if(stime != "" && etime != ""){
		params.stime = getDateToSeconds(stime);
		params.etime = getDateToSeconds(etime + " 23:59:59");
	}else{
		params.stime = "";
		params.etime = "";
	}
	$("#table").jqGrid('setGridParam',{  
        datatype:'json',  
        postData:params, //发送数据  
        page:1  
    }).trigger("reloadGrid"); //重新载入
}

/**
 * 将标准日期格式转成秒数
 */
function getDateToSeconds(date){
	date = date.replace(/-/g,'/'); 
	var timestamp = new Date(date).getTime();
	return timestamp/1000;
}

/**
 * 重新加载表格数据
 */
function loadTable(){
	$("#table").trigger("reloadGrid");
}