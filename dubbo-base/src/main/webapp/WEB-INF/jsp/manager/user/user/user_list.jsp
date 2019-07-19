<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>会员菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>会员列表</h5>
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
						<button type="button" class="btn btn-danger" id="reset"><i class="fa fa-exclamation-circle"></i> 重置密码</button>
					</div>
					<div class="col-sm-3">								
						<div class="input-group">
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索昵称/手机号" name="q">
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
<script src="${basePath}/js/user/user/userList.js?v=${version}"></script>
</body>
</html>