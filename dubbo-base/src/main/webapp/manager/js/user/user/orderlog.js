$(function () {
    loadData();   //数据记载
});

function loadData() {
    var options = {
        tableName: "#table", //显示表格名称
        loadTableUrl: basePath + "log/logData.do?logType=2",
        pager:"#pager"
    };

  
    
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    
    var colNames = ['ID','订单号','操作用户','支付方式 ','价格 ','支付状态'];
    var JqGridColModel=[
            {name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
            {name:'orderNo', index:'orderNo', width:200, align:'left', sorttype:'string', sortable:false},
            {name:'userName', index:'userName', width:200, align:'left', sorttype:'string', sortable:false},
            {name:'payment', index:'payment', width:200, align:'left', formatter:paymentType,sorttype:'string', sortable:false},
            {name:'price', index:'price', width:150, align:'left', sorttype:'string', sortable:false},
            {name:'status', index:'status', width:150, align:'left', formatter:paymentStatus, sortable:false}
        ];
   
    loadtable();

    function loadtable(){
        $(options.tableName).jqGrid({
            url: options.loadTableUrl,
            mtype: "POST",
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

}

//订单状态 1：未支付 2：已支付 3：已取消
function paymentStatus(cellvalue, options, rowObjec){
	var cvalue = "";
	if(cellvalue == 1){
		cvalue = "未支付" ;
	}else if(cellvalue == 2){
		cvalue = "已支付" ;
	}else if(cellvalue==3){
		cvalue = "已取消" ;
	}
	return cvalue  ;
}

//支付类型  支付方式 1：支付宝 2：微信
function paymentType(cellvalue, options, rowObjec){
	var cvalue = "";
	if(cellvalue == 1){
		cvalue = "支付宝" ;
	}else if(cellvalue == 2){
		cvalue = "微信" ;
	}else{
		cvalue = "" ;
	}
	return cvalue  ;
}


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
    var status = $("#status").val();
    var keyWord = $("#keyWord").val();
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