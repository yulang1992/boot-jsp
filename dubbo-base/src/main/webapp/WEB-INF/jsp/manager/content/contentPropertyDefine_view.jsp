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
			<h5><c:choose><c:when test="${mcontentPropertyDefine.id == null}">添加属性</c:when><c:otherwise>编辑属性</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">属性名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="property-name" name="propertyName" value="${mcontentPropertyDefine.propertyName }" class="form-control">
                        <input type="hidden" id="contentId" name="contentId" value="${mcontentPropertyDefine.contentId }">
                        <input type="hidden" name="id" value="${mcontentPropertyDefine.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">属性标识：</label>
                    <div class="col-sm-8">
                        <input type="text" id="property-code" name="propertyCode" value="${mcontentPropertyDefine.propertyCode }" class="form-control">
                    </div>
                </div>
                
                <div class="form-group">
                	<label class="col-sm-3 control-label">属性类型：</label>
                    <div class="col-sm-8">
                        <select name="propertyType" id="property-type">
							<option value="1" data-image="${basePath}/img/icon/label-link.png" <c:if test="${mcontentPropertyDefine.propertyType==1}">selected="selected"</c:if>>文字</option>
							<option value="2" data-image="${basePath}/img/icon/calendar.png" <c:if test="${mcontentPropertyDefine.propertyType==2}">selected="selected"</c:if>>日期</option>
							<option value="3" data-image="${basePath}/img/icon/image.png" <c:if test="${mcontentPropertyDefine.propertyType==3}">selected="selected"</c:if>>图片</option>
							<option value="4" data-image="${basePath}/img/icon/site-link.png" <c:if test="${mcontentPropertyDefine.propertyType==4}">selected="selected"</c:if>>链接</option>
						</select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">属性顺序：</label>
                    <div class="col-sm-8">
                        <input type="text" id="property-order" name="propertyOrder" value="${mcontentPropertyDefine.propertyOrder }" class="form-control">
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
<script src="${basePath}/js/content/contentPropertyDefineView.js?v=${version}"></script>
</body>
</html>