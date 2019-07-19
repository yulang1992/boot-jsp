<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>资源菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${user.id == null}">添加资源</c:when><c:otherwise>编辑用户</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">资源菜单名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="resource-name" name="resourceName" value="${resource.resourceName }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" value="${resource.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">资源菜单链接：</label>
                    <div class="col-sm-8">
                        <input type="text" id="resource-url" name="resourceUrl" value="${resource.resourceUrl }" class="form-control">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">父菜单：</label>
                    <div class="col-sm-8">
                        <select name="parentId" id="parentId" class="form-control m-b">
                        	<option value>无父菜单</option>
							<c:forEach items="${firstMenu}" var="menu">
								<option value="${menu.id }" <c:if test="${resource.parentId == menu.id }">selected="selected"</c:if>>${menu.resourceName }</option>
							</c:forEach>
						</select>
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">菜单ICON：</label>
                    <div class="col-sm-8">
                        <select name="resourceIcon" id="resourceIcon" class="form-control m-b">
                        	<option value="fa-user" data-image="${basePath}/img/icon/user.png" <c:if test="${resource.resourceIcon == 'fa-user' }">selected="selected"</c:if>>fa-user</option>						
							<option value="fa-cog" data-image="${basePath}/img/icon/cog.png" <c:if test="${resource.resourceIcon == 'fa-cog' }">selected="selected"</c:if>>fa-cog</option>
							<option value="fa-home" data-image="${basePath}/img/icon/home.png" <c:if test="${resource.resourceIcon == 'fa-home' }">selected="selected"</c:if>>fa-home</option>
							<option value="fa-eye" data-image="${basePath}/img/icon/eye.png" <c:if test="${resource.resourceIcon == 'fa-eye' }">selected="selected"</c:if>>fa-eye</option>
							<option value="fa-desktop" data-image="${basePath}/img/icon/desktop.png" <c:if test="${resource.resourceIcon == 'fa-desktop' }">selected="selected"</c:if>>fa-desktop</option>
							<option value="fa-yen" data-image="${basePath}/img/icon/yen.png" <c:if test="${resource.resourceIcon == 'fa-yen' }">selected="selected"</c:if>>fa-yen</option>
							<option value="fa-envelope" data-image="${basePath}/img/icon/envelope.png" <c:if test="${resource.resourceIcon == 'fa-envelope' }">selected="selected"</c:if>>fa-envelope</option>
							<option value="fa-flag" data-image="${basePath}/img/icon/flag.png" <c:if test="${resource.resourceIcon == 'fa-flag' }">selected="selected"</c:if>>fa-flag</option>
							<option value="fa-star" data-image="${basePath}/img/icon/star.gif" <c:if test="${resource.resourceIcon == 'fa-star' }">selected="selected"</c:if>>fa-star</option>
							<option value="fa-group" data-image="${basePath}/img/icon/group.png" <c:if test="${resource.resourceIcon == 'fa-group' }">selected="selected"</c:if>>fa-group</option>
							<option value="fa-book" data-image="${basePath}/img/icon/book.png" <c:if test="${resource.resourceIcon == 'fa-book' }">selected="selected"</c:if>>fa-book</option>
							<option value="fa-award" data-image="${basePath}/img/icon/award.png" <c:if test="${resource.resourceIcon == 'fa-award' }">selected="selected"</c:if>>fa-award</option>
							<option value="fa-bars" data-image="${basePath}/img/icon/list.png" <c:if test="${resource.resourceIcon == 'fa-bars' }">selected="selected"</c:if>>fa-bars</option>
							<option value="fa-bar-chart" data-image="${basePath}/img/icon/chart.png" <c:if test="${resource.resourceIcon == 'fa-bar-chart' }">selected="selected"</c:if>>fa-bar-chart</option>
							<option value="space" data-image="${basePath}/img/icon/space.png" <c:if test="${resource.resourceIcon == 'space' }">selected="selected"</c:if>>space</option>
						</select>
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
<script src="${basePath}/js/auth/resource/resourceView.js?v=${version}"></script>
</body>
</html>