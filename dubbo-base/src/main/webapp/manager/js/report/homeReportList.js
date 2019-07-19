$(function() {
	loadData();
});

function loadData() {
 var the_url = basePath +"/report/orderReportList.do";
	$.ajax({
		type : "post",
		url : the_url,
		dataType : "json",
		success : function(data){
			//console.log(data);
			bannerView(data);
			viewChart(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {   
			alert("XMLHttpRequest.status="+XMLHttpRequest.status+"\nXMLHttpRequest.readyState="+XMLHttpRequest.readyState+"\ntextStatus="+textStatus);
    	}
	});
}

/**
 * js 暂未调试好
 * @param dataJson
 * @return
 */
function bannerView(dataJson){
	var userList=dataJson.data.reportUserVoList;
	var orderList=dataJson.data.reportOrderVoList;
	var orderMoneyList=dataJson.data.reportMoneyVoList;
//	console.log(userList);
	if(userList !='' || userList !=null){
		for(i in userList){
			var user=userList[i];
			if(user.id==1){
				$('#userO').find("h1").html(user.countNum);
				$('#userO').find("small").text(user.name);
			}else{
				$('#userT').find("h1").html(user.countNum);
				$('#userT').find("small").text(user.name);
			}
		}
		
	}
	
	if(orderList !='' || orderList !=null){
		for(i in orderList){
			var order=orderList[i];
			if(order.id==1){
				$('#orderO').find("h1").html(order.countNum);
				$('#orderO').find("small").text(order.name);
			}else{
				$('#orderT').find("h1").html(order.countNum);
				$('#orderT').find("small").text(order.name);
			}
		}
		
	}
	
	if(orderMoneyList !='' || orderMoneyList !=null){
		for(i in orderMoneyList){
			var orderMone=orderMoneyList[i];
			if(orderMone.id==1){
				$('#MoneyO').find("h1").html("&yen;&nbsp;"+orderMone.countNum);
				$('#MoneyO').find("small").text(orderMone.name);
			}else{
				$('#MoneyT').find("h1").html("&yen;&nbsp;"+orderMone.countNum);
				$('#MoneyT').find("small").text(orderMone.name);
			}
		}
		
	}
}

function viewChart(dataJson) {
    // 基于准备好的dom，初始化echarts实例  用户图表
	var ChartUser=document.getElementById('chartUserView');
    var myChartUser = echarts.init(ChartUser);
   
    // 指定图表的配置项和数据
   var optionUser = {
    	    title : {
    	        text: '当月用户数据明细',
    	        subtext: '官方实时数据'
    	    },
    	    tooltip : {
    	        trigger: 'axis'
    	    },
    	    legend: {
    	    	data:['每日用户增量']
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
    	    xAxis : [
    	        {
    	            type : 'category',
    	            data: dataJson.data.xAxisNameGold
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	       
    	        {
    	        	name :'每日用户增量',
    	            type:'bar',
    	            data:dataJson.data.seriesValUser,
    	            markPoint : {
    	                data : [
    	                    {type : 'max', name: '最大值'},
    	                    {type : 'min', name: '最小值'}
    	                ]
    	               },
    	            markLine : {
    	                data : [
    	                    {type : 'average', name : '平均值'}
    	                ]
    	            }
    	        }
    	    ]
    	};
   myChartUser.setOption(optionUser);
   
  
   //订单图表
   var ChartOrder=document.getElementById('chartOrderView');
   var myChartOrder = echarts.init(ChartOrder);
   var optionOrder = {
   	    title : {
   	        text: '当月订单数据明细',
   	        subtext: '官方实时数据'
   	    },
   	    tooltip : {
   	        trigger: 'axis'
   	    },
   	    legend: {
   	    	data:['每日订单量']
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
   	    xAxis : [
   	        {
   	            type : 'category',
   	            data: dataJson.data.xAxisNameGold
   	        }
   	    ],
   	    yAxis : [
   	        {
   	            type : 'value'
   	        }
   	    ],
   	    series : [
   	       
   	        {
   	        	name :'每日订单量',
   	            type:'bar',
   	            data:dataJson.data.seriesValorder,
   	            markPoint : {
   	                data : [
   	                    {type : 'max', name: '最大值'},
   	                    {type : 'min', name: '最小值'}
   	                ]
   	               },
   	            markLine : {
   	                data : [
   	                    {type : 'average', name : '平均值'}
   	                ]
   	            }
   	        }
   	    ]
   	};
   myChartOrder.setOption(optionOrder);
   
   
   //订单金额图表
   var ChartMoney=document.getElementById('chartMoneyView');
   var myChartMoney = echarts.init(ChartMoney);
   var optionMoney = {
   	    title : {
   	        text: '当月订单金额数据明细',
   	        subtext: '官方实时数据'
   	    },
   	    tooltip : {
   	        trigger: 'axis'
   	    },
   	    legend: {
   	    	data:['每日订单总金额']
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
   	    xAxis : [
   	        {
   	            type : 'category',
   	            data: dataJson.data.xAxisNameGold
   	        }
   	    ],
   	    yAxis : [
   	        {
   	            type : 'value'
   	        }
   	    ],
   	    series : [
   	       
   	        {
   	        	name :'每日订单总金额',
   	            type:'bar',
   	            data:dataJson.data.seriesValMoney,
   	            markPoint : {
   	                data : [
   	                    {type : 'max', name: '最大值'},
   	                    {type : 'min', name: '最小值'}
   	                ]
   	               },
   	            markLine : {
   	                data : [
   	                    {type : 'average', name : '平均值'}
   	                ]
   	            }
   	        }
   	    ]
   	};

    // 使用刚指定的配置项和数据显示图表。
   myChartMoney.setOption(optionMoney);
}

