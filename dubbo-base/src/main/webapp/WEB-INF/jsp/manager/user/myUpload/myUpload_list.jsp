<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>用户上传资源页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!-- 层头部开始 -->
		<div class="ibox-title">
			<h5>用户上传资源列表</h5>
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
						<button type="button" class="btn btn-success" id="view"><i class="fa fa-file-text"></i> 查看</button>
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
							<input type="text"class="input-sm form-control" name="keyWord" id="keyWord" value="${keyWord }" placeholder="搜索资源名称" name="q">
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
		<!-- 模态框（Modal） -->
  <button type="button" class="btn btn-primary btn-lg" id="formShow" data-toggle="modal" data-target="#myModal"></button>
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">驳回理由</h4>
            </div>
            <div class="modal-body"><input id="contentDse" type="text" value="" /></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" id="saveSubmit" class="btn btn-primary">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/user/myUpload/myUploadList.js?v=${version}"></script>
</body>
</html>