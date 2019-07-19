<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>评论菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>评论管理</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-12">
				<!-- 操作按钮开始  -->
				<div class="row form-group">
					<div class="col-sm-7">
						<button type="button" class="btn btn-primary" id="success"><i class="fa fa-check"></i> 审核通过</button>
						<button type="button" class="btn btn-warning" id="fail"><i class="fa fa-warning"></i> 审核不通过</button>
						<button type="button" class="btn btn-danger" id="del"><i class="fa fa-close"></i> 删除</button>
					</div>
					
					  <div class="col-sm-2">
	                    <select class="form-control m-b" name="status" id="status" >
	                        <option value="-1">审核状态</option>
	                    	<option value="0">未审核</option>
	                        <option value="1">审核通过</option>
	                        <option value="2">审核不通过</option>
	                    </select>
	                </div>
	                
					
					<div class="col-sm-3">								
						<div class="input-group">
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索图书名称" name="q">
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
<script src="${basePath}/js/user/comment/commentList.js?v=${version}"></script>
</body>
</html>