<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<%@include file="../include/css.jsp"%>
<%@include file="../include/js.jsp"%>
<title>图书类别统计</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>图书类别列表</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-6">
				<!-- 操作按钮开始  -->
				<div class="row form-group">
					<div class="col-sm-10">
					  <div class="form-group" id="data_5">
			                <div class="input-daterange input-group" id="datepicker">
		                        <input type="text" class="input-sm form-control" name="startTime" id="startTime" placeholder="开始时间" />
		                        <span class="input-group-addon">到</span>
		                        <input type="text" class="input-sm form-control" name="endTime" id="endTime" placeholder="结束时间" />
		                    </div>
	                    </div>
					</div>
					<div class="col-sm-2">								
						<div class="input-group">
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
				<div class="col-sm-6">
					<div class="wrapper wrapper-content animated fadeInRight">
						<div id="chartBookTypeView" align="center" style="height:430px;"></div>
					</div>
               	</div>
           </div>
       	</div>
		<!-- 表格结束 -->
    </div>         
</div>

<script src="${basePath}/js/report/reportBookTypeList.js?v=${version}"></script>
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
</body>
</html>