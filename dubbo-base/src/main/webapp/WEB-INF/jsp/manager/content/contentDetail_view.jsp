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
			<h5><c:choose><c:when test="${contentDetail.id == null}">添加内容</c:when><c:otherwise>编辑内容</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content back-change">
            <form class="form-horizontal m-t" name="commentForm" id="commentForm" method="post" enctype="multipart/form-data">
            	<input type="hidden" name="json" id="json" value="">
            	<c:forEach items="${pd}" var="pd">
            		<input type="hidden" name="key" value="${pd.propertyCode}" />
					<input type="hidden" name="type" value="${pd.propertyType}" />
					<input type="hidden" id="contentId" name="contentId" value="${pd.contentId}" />
	                <div class="form-group" id="data_1">
	                    <label class="col-sm-3 control-label">${pd.propertyName }：</label>
	                    <div class="col-sm-8">
	                    	<c:if test="${pd.propertyType==1 || pd.propertyType==4}">
								<input type="text" name="val" id="${pd.propertyCode}" value="${pd.value }" class="form-control" />
							</c:if>
							<c:if test="${pd.propertyType==2}">
								<div class="input-group date">
	                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
	                                <input type="text" name="val" id="${pd.propertyCode}" value="${pd.value }" class="form-control">
	                            </div>
							</c:if>
							<c:if test="${pd.propertyType==3}">
								<div id="file-pretty">
									<c:choose>
										<c:when test="${contentDetail.id != null}">
											<label class="col-sm-11 control-label" style="padding-left:0px;">
										</c:when>
										<c:otherwise>
											<label class="control-label" style="padding-left:0px;">
										</c:otherwise>
									</c:choose>
										<input type="file" id="imgFile" name="${pd.propertyCode}" class="form-control"/>
									</label>
									<div class="col-sm-1" style="padding-left:0px;">
										<c:if test="${contentDetail.id != null}">					                  
											<img src="${fn:replace(pd.value, '.jpg', '_w_60.jpg')}"/>
										</c:if>
									</div>
								</div>
								<input type='hidden' name='val' id="${pd.propertyCode}" value='${pd.value }' />
							</c:if>
	                    </div>
	            	</div>
	  			</c:forEach> 
	                
                <div class="form-group">
                    <label class="col-sm-3 control-label">内容顺序(必填)：</label>
                    <div class="col-sm-8">
                        <input type="text" id="detailOrder" name="detailOrder" value="${contentDetail.detailOrder}" class="form-control">
                        <input name="id" type="hidden" value="${contentDetail.id}"/>
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
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
<script src="${basePath}/js/content/contentDetailView.js?v=${version}"></script>
</body>
</html>
<script type="text/javascript">
	$(document).ready(function() {
		if(${message != ''}){
			toastr.success("${message}");
		}
	});
</script>