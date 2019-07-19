<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>用户资料查看菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${myUpload.id == null}">用户资料查看</c:when><c:otherwise>用户资料查看</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户昵称：</label>
                    <div class="col-sm-8">
                       <input type="text" id="userName" name="userName" value="${myUpload.userName }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">资源名称：</label>
                    <div class="col-sm-8">
                       <input type="text" id="name" name="name" value="${myUpload.name }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">资源封面：</label>
                    <div class="col-sm-8">
                       <img  src="${myUpload.coverUrl }" width="90px;" height="120px;">
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">是否收费：</label>
                    <div class="col-sm-8">
                    <c:if test="${myUpload.isCharge == 1}"><input type="text" id="userName" name="userName" value="收费" class="form-control" maxlength="16"></c:if>
                    <c:if test="${myUpload.isCharge == 0}"><input type="text" id="userName" name="userName" value="免费" class="form-control" maxlength="16"></c:if>
                    </div>
                </div>
                
                   <div class="form-group">
                    <label class="col-sm-3 control-label">收费价格：</label>
                    <div class="col-sm-8">
                       <input type="text" id="name" name="name" value="${myUpload.name }" class="form-control" maxlength="16">
                    </div>
                </div>
              
              	<div class="form-group">
                    <label class="col-sm-3 control-label">资源类型：</label>
                    <div class="col-sm-8">
                     <select name="types" id="types" class="form-control m-b">
                        	<option value="1" <c:if test="${myUpload.types == 1 }">selected="selected"</c:if>>PDF</option>
						    <option value="2" <c:if test="${myUpload.types == 2 }">selected="selected"</c:if>>MP3</option>
						</select> 
                    </div>
                </div>
                
				<div class="form-group">
				  <label class="col-sm-3 control-label">资源内容：</label>
				  <div class="col-sm-9">
					<audio src="${myUpload.fileUrl }" controls="controls" style="width:100%"></audio>
				  </div>
				</div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">作品描述：</label>
                    <div class="col-sm-8">
                      <input type="text"  id="fileUrl" name="fileUrl" value="${myUpload.productDse }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">上传时间：</label>
                  <div class="col-sm-8">
                     <input type="text" id="createTimeString" name="createTimeString" value="${myUpload.createTimeString }" class="form-control" maxlength="16">
                  </div>
                </div>
                
                <div class="form-group">
                   <label class="col-sm-3 control-label">状态：</label>
                   <div class="col-sm-8">
                      <select name="types" id="types" class="form-control m-b">
                       	<option value="1" <c:if test="${myUpload.types == 1 }">selected="selected"</c:if>>未审核</option>
					    <option value="2" <c:if test="${myUpload.types == 2 }">selected="selected"</c:if>>已审核</option>
					</select>
                   </div>
                 </div>
                
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-3">
                        <button id="ret" class="btn btn-default" type="button">返回</button>
                    </div>
                </div>
            </form>
            
        </div>
		<!--内容结束-->
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/user/myUpload/myUploadView.js?v=${version}"></script>
</body>
</html>