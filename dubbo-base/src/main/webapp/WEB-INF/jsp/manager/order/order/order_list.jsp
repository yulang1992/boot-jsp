<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>订单列表页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>订单列表</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-12">
				<!-- 操作按钮开始  -->
				<div class="row form-group">
					<div class="col-sm-4">
						<button type="button" class="btn btn-success" id="view"><i class="fa fa-file-text"></i> 查看详情</button>
					</div>
					
					<div class="col-sm-2">
	                    <select class="form-control m-b" name="status" id="status">
	                    	<option value="0">订单状态</option>
	                        <option value="1">未支付</option>
	                        <option value="2">已支付</option>
	                        <option value="3">已取消</option>
	                    </select>
	                </div>
	                
	                <div class="col-sm-3">
	                	<div class="form-group" id="data_5">
			                <div class="input-daterange input-group" id="datepicker">
		                        <input type="text" class="input-sm form-control" name="stime" id="stime" placeholder="开始时间" />
		                        <span class="input-group-addon">到</span>
		                        <input type="text" class="input-sm form-control" name="etime" id="etime" placeholder="结束时间" />
		                    </div>
	                    </div>
                    </div>
					
					<div class="col-sm-3">								
						<div class="input-group">
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索订单号/商品名称" name="q">
							<span class="input-group-btn">
								<span class="input-group-btn">
									<button type="button" class="btn btn-sm btn-primary" id="search"> &nbsp;搜索&nbsp;</button>
								</span>
							</span>
						</div>
					</div>
				</div>
				<!-- 操作按钮结束  -->
					
				<table id="table"></table>
				<div id="pager"></div>
               </div>
           </div>
       	</div>
		<!-- 表格结束 -->
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/order/order/orderList.js?v=${version}"></script>
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
</body>
</html>