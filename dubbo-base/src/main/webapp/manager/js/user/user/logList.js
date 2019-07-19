$(function () {
    loadData();   //数据记载
});

function loadData() {
    var options = {
        tableName: "#table", //显示表格名称
        loadTableUrl: basePath + "log/logData.do?logType=1",
        pager:"#pager"
    };

    
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
    	var  colNames = ['ID','操作用户','日志类型','操作内容','记录时间'];
    	var  JqGridColModel=[
            {name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
            {name:'userName', index:'userName', width:300, align:'left', sorttype:'string', sortable:false},
            {name:'types', index:'types', width:200, align:'left', sorttype:'string',formatter:logType, sortable:false},
            {name:'operationContent', index:'operationContent', width:200, align:'left', sorttype:'string', sortable:false},
            {name:'operationTimeStr', index:'operationTimeStr', width:150, align:'left',  sortable:false}
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

    //格式化编辑内容
//    function formatId(cellvalue, options, rowObject){
//        return "<button class='btn btn-outline btn-primary' onclick = property(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;margin-right:5px;'>属性</button> <button class='btn btn-outline btn-danger' onclick = content(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;'>内容</button>";
//    }
    

}
function logType(cellvalue, options, rowObjec){
	var cvalue = "";
	if(cellvalue == 1){
		cvalue = "登录日志" ;
	}else{
		cvalue = "登录日志" ;
	}
	return cvalue  ;
}

/**
 * 添加按钮事件
 */
//$("#add").click(function(){
//    document.location.href = basePath + "content/viewContentDefine.do";
//});

/**
 * 编辑按钮事件
 */
//$("#edit").click(function(){
//    var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
//    if(selectRow.length > 1){
//        toastr.info("一次只能编辑一条记录.");
//    }else if(selectRow.length == 1){
//        document.location.href = basePath + "content/viewContentDefine.do?id=" + selectRow[0];
//    }else {
//        toastr.info("请选择需要编辑的记录.");
//    }
//});

/**
 * 删除按钮事件
 */
//$("#del").click(function(){
//    var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
//    if(selectRows.length > 0){
//        swal({
//            title: "您确定要删除这些信息吗",
//            text: "删除后将无法恢复，请谨慎操作！",
//            type: "warning",
//            showCancelButton: true,
//            confirmButtonColor: "#DD6B55",
//            confirmButtonText: "删除",
//            closeOnConfirm: true
//        },function(){
//            $.ajax({
//                url: basePath + 'content/delContentDefine.do',
//                type: 'post',
//                dataType: 'json',
//                traditional: true,
//                data: {
//                    "ids": getIds(selectRows)
//                },
//                success: function(data) {
//                    if(data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS){
//                        toastr.success(data.desc);
//                        loadTable();
//                    }else{
//                        toastr.error(data.desc);
//                    }
//                }
//            });
//        });
//    }else {
//        toastr.error("请选择需要删除的记录.");
//    }
//});

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
    var logType=$("#logType option:selected").val();
    params.keyWord = keyWord;
    params.logType=logType;
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

/**
 * 属性
 */
//function property(contentId){
//    document.location.href = basePath + "content/initContentPropertyDefine.do?contentId=" + contentId;
//}

/**
 * 内容
 */
//function content(contentId){
//    document.location.href = basePath + "content/initContentDetail.do?contentId=" + contentId;
//}
