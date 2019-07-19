<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<%@include file="../include/css.jsp"%>
<title>内容位定义页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>属性列表</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-12">
				<!-- 操作按钮开始  -->
				<div class="row form-group">
					<div class="col-sm-9">
						<button type="button" class="btn btn-success"  id="add"><i class="fa fa-plus"></i> 添加</button>
						<button type="button" class="btn btn-info" id="edit"><i class="fa fa-paste"></i> 编辑</button>
						<button type="button" class="btn btn-danger" id="del"><i class="fa fa-close"></i> 删除</button>
						<button type="button" class="btn btn-warning" id="reply"><i class="fa fa-reply"></i> 返回内容位</button>
						<input type="hidden" id="contentId" name="contentId" value="${contentId}">
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
<%@include file="../include/js.jsp"%>
<script src="${basePath}/js/content/contentPropertyDefineList.js?v=${version}"></script>
</body>
</html>