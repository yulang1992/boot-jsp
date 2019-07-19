<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>用户页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>用户列表</h5>
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
						<button type="button" class="btn btn-primary" id="enabled"><i class="fa fa-check"></i> 启用</button>
						<button type="button" class="btn btn-danger" id="disable"><i class="fa fa-close"></i> 禁用</button>
					</div>
					<div class="col-sm-3">								
						<div class="input-group">
							<input class="input-sm form-control" type="text" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索用户名 / 姓名" name="q">
							<span class="input-group-btn">
								<span class="input-group-btn">
									<button class="btn btn-sm btn-primary" type="button" id="search"> &nbsp;搜索&nbsp;</button>
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
<script src="${basePath}/js/auth/user/userList.js?v=${version}"></script>
</body>
</html>