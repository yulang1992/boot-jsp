<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>三级分类菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${category.id == null}">添加三级分类</c:when><c:otherwise>编辑三级分类</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">二级分类名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="parentCategoryName" name="parentCategoryName" value="${category.parentCategoryName }" class="form-control" maxlength="16" disabled="disabled">
                        <input type="hidden" name="categoryTwoId" id="categoryTwoId" value="${category.parentCategoryId}">
                        <input type="hidden" name="superCategoryId" id="superCategoryId" value="${superCategoryId}">
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">三级分类名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="name" name="name" value="${category.name }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" id="id" value="${category.id }">
                    </div>
                </div>
                
              <div class="form-group">
                    <label class="col-sm-3 control-label">是否启用：</label>
                    <div class="col-sm-8" id="mesTip">
							<label class="checkbox-inline i-checks">
								<input type="checkbox"  id="isEnable"  <c:if test="${category.isEnable == 1}">checked</c:if> />
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
<script src="${basePath}/js/book/category/categoryThreeView.js?v=${version}"></script>
</body>
</html>