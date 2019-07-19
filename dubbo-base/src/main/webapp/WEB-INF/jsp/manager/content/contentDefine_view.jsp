<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<%@include file="../include/css.jsp"%>
<title>内容位定义页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${mcontentDefine.id == null}">添加内容位</c:when><c:otherwise>编辑内容位</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">内容位名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="content-name" name="contentName" value="${mcontentDefine.contentName }" class="form-control">
                        <input type="hidden" name="id" value="${mcontentDefine.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">内容位数据条数：</label>
                    <div class="col-sm-8">
                        <input type="text" id="content-count" name="contentCount" value="${mcontentDefine.contentCount }" class="form-control">
                    </div>
                </div>
                
                <div class="form-group">
                	<label class="col-sm-3 control-label">所属分组：</label>
                    <div class="col-sm-8">
                        <select name="contentGroup" id="content-group" class="form-control m-b">
							<option value="PC组" data-image="${basePath}/img/icon/television-off.png" <c:if test="${mcontentDefine.contentGroup == 'PC组' }">selected="selected"</c:if>>PC组</option>
							<option value="APP组" data-image="${basePath}/img/icon/media-player-phone.png" <c:if test="${mcontentDefine.contentGroup == 'APP组' }">selected="selected"</c:if>>APP组</option>
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
<%@include file="../include/js.jsp"%>
<script src="${basePath}/js/content/contentDefineView.js?v=${version}"></script>
</body>
</html>