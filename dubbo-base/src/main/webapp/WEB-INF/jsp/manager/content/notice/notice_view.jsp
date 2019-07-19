<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>公告菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${notice.id == null}">添加公告</c:when><c:otherwise>编辑公告</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">名称：</label>
                    <div class="col-sm-8">
                        <input type="text" id="name" name="name" value="${notice.name }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" id="id" value="${notice.id }">
                    </div>
                </div>
                
              <div class="form-group">
                    <label class="col-sm-3 control-label">内容：</label>
                    <div class="col-sm-8">
<%--                        <input type="text" id="content" name="content" value="${notice.content }" class="form-control" maxlength="16">--%>
<%--	               <textarea id="content" name="content" class="form-control" />${notice.content}</textarea>--%>
	               <script id="editor" name="content" type="text/plain" style="width:100%;height:400px;"></script>
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
<script src="${basePath}/js/content/notice/noticeView.js?v=${version}"></script>
<script type="text/javascript">
		var con='${notice.content}';
		$(document).ready(function() {
			UE.getEditor('editor', {
				onready : function() {//创建一个编辑器实例
					this.setContent(con);
				}
			});
		});
</script>
</body>
</html>