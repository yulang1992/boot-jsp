$(function() {
	loadData();
});

function loadData() {
	var options = {
			tableName: "#table", //显示表格名称
			loadTableUrl: basePath + "report/bookCatgeInit.do",
			pager:"#pager"
	};
	
	$.jgrid.defaults.responsive = true;
	$.jgrid.defaults.styleUI = 'Bootstrap';
	
	var colNames = ['ID','图书分类','图书数量'];
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
			// beforeSelectRow: function(rowid, e) {
			// 	var check = $(e.target).is('input[type=checkbox]');
			// 	if(check){
			// 		$(options.tableName).jqGrid('setSelection',rowid);
			// 	}
			// 	return check;
			// },
			loadComplete:function(data){
				viewChart(data);
            }
		});
	}
	
	jQuery(options.tableName).jqGrid('setLabel',0, '序号');
}

/**
 * FusionCharts 目前就只IE支持的比较好，
 * @param data
 * myChart.setOption({
        title: {
            text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
 */
function viewChart(dataJson) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chartBookCategeView'));
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
            markPoint : {
            data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
            ]
           },
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        },
      //设置柱子的宽度
        barWidth : 30,
        //配置样式
        itemStyle: {   
            //通常情况下：
            normal:{  
　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params){
                    var colorList = ['rgb(42,170,227)'];
                    return colorList[params.dataIndex];
                }
            },
            //鼠标悬停时：
            emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }],
       　//控制边距　
        grid: {
                left: '0%',
                right:'10%',
                containLabel: true,
        },
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