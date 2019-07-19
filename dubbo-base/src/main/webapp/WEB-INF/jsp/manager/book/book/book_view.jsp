<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>产品菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${book.id == null}">添加产品</c:when><c:otherwise>编辑产品</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">产品名称：</label>
                    <div class="col-sm-9">
                        <input type="text" id="name" name="name" value="${book.name }" class="form-control" disabled="disabled">
                        <input type="hidden" name="id" id="id" value="${book.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">产品分类：</label>
                    <div class="col-sm-9">
                       <input type="text" id="categoryName" name="categoryName" value=" ${book.categoryOneName}       ${book.categoryTwoName}       ${book.categoryName}" class="form-control" disabled="disabled">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">修改分类：</label>
                     <div class="col-sm-3">
                        <select name="categoryOneId" id="categoryOneId" onchange="getCity()"  class="form-control">
						</select>
					 </div>
					 
				     <div class="col-sm-3">
						 <select name="categoryTwoId" id="categoryTwoId" onchange="getTown()" class="form-control">
						  <option value='0'>请选择</option>
						</select>
					 </div>
					
					 <div class="col-sm-3">
						 <select  name="categoryId" id="categoryId"  class="form-control">
						  <option value='0'>请选择</option>
						</select>
                    </div>
                </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">产品类型：</label>
                    <div class="col-sm-9">
                        <select name="types" id="types" class="form-control" disabled="disabled">
                        	<option value="1" <c:if test="${book.types == 1 }">selected="selected"</c:if>>文本</option>
						    <option value="2" <c:if test="${book.types == 2 }">selected="selected"</c:if>>音频</option>
						</select>
                    </div>
                </div>
                
               	<div class="form-group">
                    <label class="col-sm-3 control-label">作者：</label>
                    <div class="col-sm-9">
                       <input type="text" id="author" name="author" value="${book.author }" class="form-control" disabled="disabled">
                    </div>
                </div>
                
               <div class="form-group">
                    <label class="col-sm-3 control-label">主播：</label>
                    <div class="col-sm-9">
                       <input type="text" id="anchor"  name="anchor"  value="${book.anchor }" class="form-control" disabled="disabled">
                    </div>
                </div>
              
				<div class="form-group">
                    <label class="col-sm-3 control-label">标签：</label>
                    <div class="col-sm-9">
                       <input type="text" id="label" name="label" value="${book.label }" class="form-control" disabled="disabled">
                    </div>
                </div>
                
               <div class="form-group">
                    <label class="col-sm-3 control-label">上传时间：</label>
                    <div class="col-sm-9">
                       <input type="text" id="createTimeString" name="createTimeString" value="${book.createTimeString }" class="form-control" disabled="disabled">
                    </div>
                </div>
                
                <div class="form-group">
                	<label class="col-sm-3 control-label">状态：</label>
                	<div class="col-sm-9">
                   		<select name="status" id="status" class="form-control m-b">
		                    <option value="1" <c:if test="${book.status == 1 }">selected="selected"</c:if>>审核通过</option>
						    <option value="0" <c:if test="${book.status == 0 }">selected="selected"</c:if>>审核不通过</option>
						</select>                  
		     		</div>
                 </div>
                
                <c:if test="${book.types == 1 }">
	                <div class="form-group">
	                    <label class="col-sm-3 control-label">图书目录：</label>
	                    <div class="col-sm-9">
	                       	<c:forTokens items="${book.catalogue}" delims="," var="name" varStatus="status">
		                       	<div class="list-group">
		                       		<a class="list-group-item" id="au_${status.index}" href="javascript:openBook(${book.id},${status.index});">
		                                <span><c:out value="${name}"/></audio></span>
		                            </a>
		                       	</div>
	                       	</c:forTokens>
	                    </div>
	                </div>
                </c:if>
                
                <c:if test="${book.types == 2 }">
	                <div class="form-group">
	                    <label class="col-sm-3 control-label">图书目录：</label>
	                    <input type="hidden" id="contentUrl" name="contentUrl" value="${book.contentUrl }"/>
	                    <div class="col-sm-9">
	                    	<p><audio src="" controls="controls" style="width:100%" id="myAudio"></audio></p>
	                       	<c:forTokens items="${book.catalogue}" delims="," var="name" varStatus="status">
		                       	<div class="list-group">
		                       		<a class="list-group-item" id="au_${status.index}" href="javascript:setVoice(${status.index});">
		                                <span><c:out value="${name}"/></audio></span>
		                            </a>
		                       	</div>
	                       	</c:forTokens>
	                    </div>
	                </div>
                </c:if>
                
                
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
<script src="${basePath}/js/book/book/bookView.js?v=${version}"></script>
</body>
</html>