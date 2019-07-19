<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>角色页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${user.id == null}">添加角色</c:when><c:otherwise>编辑角色</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">角色名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="role-name" name="roleName" value="${role.roleName }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" value="${role.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">角色描述：</label>
                    <div class="col-sm-8">
                        <input type="text" id="description" name="description" value="${role.description }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">角色权限：</label>
                    <div class="col-sm-8" id="mesTip">
                    	<c:forEach items="${firstMenu}" var="resource" varStatus="index">
							<label class="checkbox-inline i-checks">
								<input type="checkbox" name="resourceIds" value="${resource.id }" <c:forEach items="${ids}" var="id"><c:if test="${resource.id == id}">checked</c:if></c:forEach>/>${resource.resourceName }
                            </label>
						</c:forEach>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-3">
                        <button id="nav" class="btn btn-primary" type="button">提交</button>
                        <button id="ret" class="btn btn-default" type="button">返回</button>
                    </div>
                </div>
            </form>
            
        </div>
		<!--内容结束-->
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/auth/role/roleView.js?v=${version}"></script>
</body>
</html>