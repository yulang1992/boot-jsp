$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "report/userReportInit.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','类别','数量'];
	var JqGridColModel=[
						{name:'id', index:'id', width:50, align:'center', sorttype:'string', hidden:true, key:true, sortable:false},
						{name:'name', index:'name', width:255, align:'left', sorttype:'string', sortable:false},
						{name:'countNum', index:'countNum', width:150, align:'left', sorttype:'string', sortable:false},
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
            rowNum:50,
            //rowList:[15, 30, 50],
            pager:options.pager,
            viewrecords: true,		           
            width: "100%" ,
            height: $(window).height()*0.5,
            multiselect:true,	//定义是否可以多选
            multiselectWidth:50,
			autowidth:true,
			shrinkToFit:false,
			regional:'cn',
			loadComplete:function(data){
				viewChart(data);
            }
		});
	}
	
	jQuery(options.tableName).jqGrid('setLabel',0, '序号');
}

function viewChart(dataJson) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartUserLoginView'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: dataJson.data.titleName,
            subtext: '非实时数据'
        },
        tooltip: {  trigger: 'axis'},
        legend: {
            data:[''+dataJson.data.legendDataName+'']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis: {
            type: 'category',
            data: dataJson.data.xAxisName
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: dataJson.data.legendDataName,
            data: dataJson.data.seriesVal,
            type: 'bar',
            //设置柱子的宽度
            barWidth : 70,
            markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
           },
        }],

     };
    // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
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
 * 搜索
 */
function search(){
	var params = {};
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if(startTime != "" && endTime != ""){
		params.startITime = getDateToSeconds(startTime);
		params.endITime = getDateToSeconds(endTime + " 23:59:59");
	}else{
		params.startITime = "";
		params.endITime = "";
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