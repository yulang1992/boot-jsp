<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>活动菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>活动列表</h5>
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
					    <button type="button" class="btn btn-success" id="add"><i class="fa fa-paste"></i> 新增</button>
						<button type="button" class="btn btn-info" id="edit"><i class="fa fa-paste"></i> 编辑</button>
					    <button type="button" class="btn btn-primary" id="fafang"><i class="fa fa-check"></i> 发放</button>
						<button type="button" class="btn btn-danger" id="del"><i class="fa fa-close"></i> 删除</button>
					</div>
					
					<div class="col-sm-2">
	                    <select class="form-control m-b" name="types" id="types" >
	                    	<option value="0">卡券类型</option>
	                        <option value="1">满减券</option>
	                        <option value="2">现金券</option>
	                    </select>
	                </div>
	                
	                <div class="col-sm-2">
	                    <select class="form-control m-b" name="status" id="status" >
	                    	<option value="0">卡券状态</option>
	                        <option value="1">待发送</option>
	                        <option value="2">已发送</option>
	                    </select>
	                </div>
	                
	                <div class="col-sm-3">
	                	<div class="form-group" id="data_5">
			                <div class="input-daterange input-group" id="datepicker">
		                        <input type="text" class="input-sm form-control" name="start" id="stime" placeholder="开始时间" />
		                        <span class="input-group-addon">到</span>
		                        <input type="text" class="input-sm form-control" name="end" id="etime" placeholder="结束时间" />
		                    </div>
	                    </div>
                    </div>
                    
                    <div class="col-sm-1"> 
	                    <span class="input-group-btn">
							<span class="input-group-btn">
								<button class="btn btn-sm btn-primary" type="button" id="search"> &nbsp;搜索&nbsp;</button>
							</span>
						</span>
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
<script src="${basePath}/js/coupon/coupon/couponList.js?v=${version}"></script>
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
</body>
</html>