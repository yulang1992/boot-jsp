<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>机构菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${mechanism.id == null}">添加机构</c:when><c:otherwise>编辑机构</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="name" name="name" value="${mechanism.name }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" id="id" value="${mechanism.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">用户昵称：</label>
                    <div class="col-sm-8">
                        <select  name="userId" id="userId" class="form-control m-b" >
                         <c:forEach items="${userList}" var="user">
                           <option value="${user.id }"   <c:if test="${mechanism.userId == user.id }">selected="selected"</c:if>>${user.nickName}</option>
						</c:forEach>
                          
                        </select> 
                    </div>
                </div>
                
                
              <div class="form-group">
                    <label class="col-sm-3 control-label">mac地址：</label>
                    <div class="col-sm-8">
                        <input type="text" id="macUrl" name="macUrl" value="${mechanism.macUrl }" class="form-control" maxlength="16">
                        
                    </div>
                </div>
                
              <div class="form-group">
                    <label class="col-sm-3 control-label">状态（启用/禁用）：</label>
                    <div class="col-sm-8">
                    	<label class="checkbox-inline i-checks">
                        	<input type="checkbox" name="status" id="status" <c:if test="${mechanism.status==1 || mechanism.id == null}">checked</c:if>/>
                        </label>
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
<script src="${basePath}/js/book/mechanism/mechanismView.js?v=${version}"></script>
</body>
</html>