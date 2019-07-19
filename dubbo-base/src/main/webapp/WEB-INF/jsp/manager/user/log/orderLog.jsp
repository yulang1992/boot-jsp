<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>日志菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>订单日志数据列表</h5>
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
						<%--<button type="button" class="btn btn-success" id="view"><i class="fa fa-file-text"></i> 查看</button>
					--%></div>
                   <div class="col-sm-2">
	                    <select class="form-control m-b" name="status" id="status" >
	                        <option value="0">支付状态</option>
	                    	<option value="1">未支付</option>
	                        <option value="2">已支付</option>
	                        <option value="3">已取消</option>
	                    </select>
	                </div>
	                

					<div class="col-sm-3">								
						<div class="input-group">
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="订单号" name="q">
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
<script src="${basePath}/js/user/user/orderlog.js?v=${version}"></script>
</body>
</html>