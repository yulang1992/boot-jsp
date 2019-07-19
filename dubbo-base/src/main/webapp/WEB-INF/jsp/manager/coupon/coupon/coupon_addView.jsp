<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>优惠券菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>图书列表</h5>
			<div class="ibox-tools"><i class="fa fa-chevron-up"></i></div>
		</div>
		<!-- 层头部结束 -->			
		<!-- 表格开始 -->
       	<div class="ibox-content">
           <div class="row row-lg">
               <div class="col-sm-12">
				<!-- 操作按钮开始  -->
				<div class="row">
					<div class="col-sm-4">
					    <button type="button" class="btn btn-success" id="queding">选择确定</button>
					</div>
					
	               <div class="row">
					<div class="col-sm-2">
	                    <select class="form-control m-b" name="status" id="status" >
	                    	<option value="-1">选择图书状态</option>
	                        <option value="1">上架</option>
	                        <option value="0">下架</option>
	                    </select>
	                </div>
	                <div class="col-sm-2">
	                    <select class="form-control m-b" name="types" id="types" >
	                    	<option value="-1">选择图书类型</option>
	                        <option value="1">文本</option>
	                        <option value="2">音频</option>
	                    </select>
	                </div>
					
					<div class="col-sm-3">								
						<div class="input-group">
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索产品名称" name="q">
							<span class="input-group-btn">
								<span class="input-group-btn">
									<button type="button" class="btn btn-sm btn-primary" id="search"> &nbsp;搜索&nbsp;</button>
								</span>
							</span>
						</div>
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
<script src="${basePath}/js/coupon/coupon/couponAddView.js?v=${version}"></script>
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
</body>
</html>