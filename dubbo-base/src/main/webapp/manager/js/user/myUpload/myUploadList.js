$(function() {
	$('#myModal').modal('hide');
	$('#formShow').hide();
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "myUpload/getMyUploadList.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','资源名称','是否收费','收费价格','资源类型','上传用户','状态','上传时间'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'name', index:'name', width:150, align:'left', sorttype:'string', sortable:false},
						{name:'isCharge', index:'isCharge', width:100, align:'left', formatter:formatIsCharge, sortable:false},
						{name:'price', index:'price', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'types', index:'types', width:100, align:'left', formatter:formatTypes, sortable:false},
						{name:'userName', index:'userName', width:100, align:'left', sorttype:'string', sortable:false},
						{name:'status', index:'status', width:100, align:'left',formatter:formatStatus, sortable:false},
						{name:'createTimeString', index:'createTimeString', width:150, align:'left', sorttype:'string', sortable:false}
						//{name:'id', index:'id', width:150, align:'left', formatter:formatId, sortable:false},
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
		var cvalue = "";
		if(cellvalue == 0){
			cvalue = "待审核" ;
		}else if(cellvalue == 1){
			cvalue = "<span style='color:green'>通过</span>" ;
		}else{
			cvalue = "<span style='color:red'>不通过</span>" ;
		}
		return cvalue  ;
	}
	
	
	
	function formatIsCharge(cellvalue, options, rowObjec){
		return cellvalue == 1?"收费":"免费";
	}
	
	//支付方式
	function formatTypes(cellvalue, options, rowObjec){
		return cellvalue == 1?"PDF":"MP3";
	}
	
//	//格式化编辑内容
//	function formatId(cellvalue, options, rowObject){
//		//return "<button class='btn btn-outline btn-primary' onclick = property(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;margin-right:5px;'>审核通过</button> <button class='btn btn-outline btn-danger' onclick = content(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;'>内容</button>";
//		if(rowObject.status ==1){
//			return "<button class='btn btn-outline btn-primary' onclick = viewData(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;'>查看</button> <button class='btn btn-outline btn-danger' onclick = content(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;'>驳回</button>";
//		}else{
//			return " <button class='btn btn-outline btn-primary' onclick = viewData(" + cellvalue + ") style='padding:1px 12px;margin-bottom:0px;'>查看</button>";
//		}
//		
//	}
}



/**
 * 添加按钮事件
 */
$("#add").click(function(){
	document.location.href = basePath + "book/viewBook.do";
});

function content(id){
  $("#formShow").click();
  $("#saveSubmit").on('click',function() {
      var content = $("#contentDse").val();
      swal({
          title: "你确定对次条记录进行驳回[审核不通]操作",
          text: "审核不通过需要用户重新上传信息，请谨慎操作！",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "OK",
          closeOnConfirm: true
      }, function () {
          $.ajax({
              url: basePath + 'myUpload/aduit.do',
              type: 'post',
              dataType: 'json',
              traditional: true,
              data: {
                  "ids": id,
                  "contentDse": content,
                  "status": 3
              },
              success: function (data) {
                  if (data.result == CONSTANTS.CONTROLLER_RESULT.SUCCESS) {
                	  $('#myModal').modal('hide');
                	  $('#formShow').hide();
                      toastr.success(data.desc);
                      loadTable();
                  } else {
                      toastr.error(data.desc);
                  }
              }
          });
      });
  } );
}

function viewData(id){
	document.location.href = basePath + "myUpload/viewMyUpload.do?id="+id;
}

/**
 * 查看按钮事件
 */
$("#view").click(function(){
	var selectRow = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRow.length > 1){
		toastr.info("一次只能编辑一条记录.");
	}else if(selectRow.length == 1){
		document.location.href = basePath + "myUpload/viewMyUpload.do?id=" + selectRow[0];
	}else {
		toastr.info("请选择需要编辑的记录.");
	}
});

/**
 * 审核按钮
 */
$("#enabled").on('click',function () {
    var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
    if(selectRows.length == 0){
        toastr.info("请选择需要审核的记录.");
    }else{
        $.ajax({
            url: basePath + 'myUpload/aduit.do',
            type: 'post',
            dataType: 'json',
            traditional: true,
            data: {
                "ids": getIds(selectRows),
                "contentDse":"",
                "status":2
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
 * 通过
 */
$("#success").click(function(){
	var selectRows = $("#table").jqGrid('getGridParam','selarrrow');
	if(selectRows.length == 0){
		toastr.info("请选择需要审核的文件.");
	}else{
		$.ajax({
			url: basePath + 'myUpload/isSuccess.do',
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
		toastr.info("请选择需要审核的文件.");
	}else{
		$.ajax({
			url: basePath + 'myUpload/isSuccess.do',
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
 * 上架
 */
/*$("#enabled").click(function(){
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
});*/



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
				url: basePath + 'category/delCategory.do',
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