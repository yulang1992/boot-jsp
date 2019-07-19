<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>用户页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${user.id == null}">添加用户</c:when><c:otherwise>编辑用户</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户名：</label>
                    <div class="col-sm-8">
                        <input type="text" id="name" name="name" value="${user.name }" class="form-control" >
                        <input type="hidden" name="id" value="${user.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">密码：</label>
                    <div class="col-sm-8">
                    	<div class="input-group">
	                        <input type="password" id="password" name="password" value="${user.password }" class="form-control" maxlength="8">
	                        <span class="input-group-addon" id="show"><i class="fa fa-eye" id="imageValue"></i></span>
                       	</div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">姓名：</label>
                    <div class="col-sm-8">
                        <input type="text" id="realName" name="realName" value="${user.realName }" class="form-control" >
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">手机：</label>
                    <div class="col-sm-8">
                        <input type="text" id="mobilePhone" name="mobilePhone" value="${user.mobilePhone }" class="form-control" maxlength="11">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">状态（启用/禁用）：</label>
                    <div class="col-sm-8">
                    	<label class="checkbox-inline i-checks">
                        	<input type="checkbox" name="status" id="status" <c:if test="${user.status || user.id == null}">checked</c:if>/>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">角色：</label>
                    <div class="col-sm-8" id="mesTip">
                    	<c:forEach items="${roleList}" var="role" varStatus="index">
							<label class="checkbox-inline i-checks">
								<input type="checkbox" name="roleIds" value="${role.id }" <c:forEach items="${ids}" var="id"><c:if test="${role.id == id}">checked</c:if></c:forEach>/>${role.description }
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
<script src="${basePath}/js/auth/user/userView.js?v=${version}"></script>
</body>
</html>