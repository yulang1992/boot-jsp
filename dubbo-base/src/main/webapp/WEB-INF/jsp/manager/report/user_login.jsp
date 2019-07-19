<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<%@include file="../include/css.jsp"%>
<%@include file="../include/js.jsp"%>
<title>会员数据信息统计</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>会员数量列表</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-6">
				<!-- 操作按钮开始  -->
				<div class="row form-group">
					
				</div>
				<!-- 操作按钮结束  -->
				<table id="table"></table>
				<div id="pager"></div>
               </div>
               <div class="col-sm-6">
	               <div class="wrapper wrapper-content animated fadeInRight">
					   <div id="chartUserLoginView" align="center" style="height:430px;"></div>
				   </div>
               </div>
           </div>
       	</div>
		<!-- 表格结束 -->
    </div>         
</div>

<script src="${basePath}/js/report/userLoginList.js?v=${version}"></script>
</body>
</html>