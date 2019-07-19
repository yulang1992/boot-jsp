$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "users/getUserList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','头像','会员昵称','手机号码','注册时间','最后登陆时间','登陆次数'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'headUrl', index:'headUrl', width:150, align:'left',formatter:formatHead,  sortable:false},
						{name:'nickName', index:'nickName', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'name', index:'name', width:150, align:'left', sorttype:'string',  sortable:false},
						{name:'regtimeString', index:'regtimeString', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'lastLoginTimeString', index:'lastLoginTimeString', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'loginNum', index:'loginNum', width:100, align:'left',sorttype:'string', sortable:false}
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
	
}


/**
 * 添加按钮事件
 */
$("#reset").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要重置密码的会员.");
	}else{
		$.ajax({
			url: basePath + 'users/resetPassword.do',
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
	}
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
	params.keyWord = keyWord;
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