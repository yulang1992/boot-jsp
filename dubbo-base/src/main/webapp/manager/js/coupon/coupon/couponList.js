$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "coupon/getImgCouponList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','活动标题','活动图片','卡券类型','金额','有效时间','状态'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'title', index:'title', width:200, align:'left', sorttype:'string', sortable:false},
						{name:'imgs', index:'imgs', width:150, align:'left', formatter:formatImgs, sortable:false},
						{name:'types', index:'types', width:100, align:'left', formatter:formatTypes, sortable:false},
						{name:'types', index:'types', width:100, align:'left',formatter:formatcouponMoney, sortable:false},
						{name:'endTimeString', index:'endTimeString', width:250, align:'left', formatter:formatEndTimes, sortable:false},
						{name:'status', index:'status', width:100, align:'left', formatter:formatStatus, sortable:false}
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
	
	//类型
	function formatImgs(cellvalue, options, rowObjec){
		return '<img alt="" src="'+ cellvalue +'" width="65px" height="30px"> ';
	}
	
	//类型
	function formatTypes(cellvalue, options, rowObjec){
		if(1 == cellvalue){
			return '满减券';
		}else{
		   return '现金券';
		}
	}
	
	function formatcouponMoney(cellvalue, options, rowObjec){
		var couponMoney = rowObjec.couponMoney
		var satisfyMoney = rowObjec.satisfyMoney
		if(1 == cellvalue){
			return '满'+satisfyMoney+'减'+couponMoney ;
		}else{
		   return '立减'+ couponMoney ;
		}
	}

	//产品类型
	function formatEndTimes(cellvalue, options, rowObjec){
		var endTime = rowObjec.endTimeString
		var startTime = rowObjec.startTimeString
		return startTime + '  -  ' +  endTime;
	}
	
	//产品类型
	function formatStatus(cellvalue, options, rowObjec){
		return cellvalue == 1?"<span style='color:red'>待发放</span>":"<span style='color:green'>已发放</span>";
	}
}

/**
 * 添加按钮事件
 */
$("#add").click(function(){
	document.location.href = basePath + "coupon/viewCoupon.do";
});

/**
 * 详情按钮事件
 */
$("#edit").click(function(){
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能查看一条记录.");
	}else if(selectRow.length == 1){
		var rowData = jQuery("#table").jqGrid('getRowData',selectRow[0]);
			document.location.href = basePath + "coupon/viewCoupon.do?id=" + selectRow[0];
	}else {
		toastr.info("请选择需要查看的记录.");
	}
});


/**
 * 发放
 */
$("#fafang").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要发放的活动优惠券.");
	}else{
		$.ajax({
			url: basePath + 'coupon/isStatus.do',
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
				url: basePath + 'coupon/delCoupon.do',
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
 * 搜索按钮事件
 */
$("#search").click(function(){
	search();
});

/**
 * 类型搜索按钮事件
 */
$("#types").change(function(){
	search();
});

/**
 * 状态搜索按钮事件
 */
$("#status").change(function(){
	search();
});

/**
 * 搜索
 */
function search(){
	var params = {};	
	var state = $("#status").val();
	var type = $("#types").val();
	var stime = $("#stime").val();
	var etime = $("#etime").val();
	params.state = state;
	params.type = type;
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