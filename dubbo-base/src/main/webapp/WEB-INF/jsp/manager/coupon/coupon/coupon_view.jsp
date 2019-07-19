<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>活动菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5><c:choose><c:when test="${coupon.id == null}">添加活动</c:when><c:otherwise>编辑活动</c:otherwise></c:choose></h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
             <div class="form-group">
                    <label class="col-sm-3 control-label">活动标题：</label>
                     <div class="col-sm-8">
                         <input type="text" id="title" name="title" value="${coupon.title }" class="form-control" maxlength="16">
						 <input type="hidden" name="id" id="id" value="${coupon.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">活动封面：</label>
                     <div class="col-sm-8">
	                    <div class="back-change" id="data_5">
	                        <div id="file-pretty">
	                        	<c:choose>
									<c:when test="${coupon.imgs != null}">
										<label class="col-sm-10 control-label" style="padding-left:0px;">
									</c:when>
									<c:otherwise>
										<label class="control-label" style="padding-left:0px;">
									</c:otherwise>
								</c:choose>
									<input type="file" id="imgFile" name="imgFile" class="form-control"/>
								</label>
		                        <div class="col-sm-2" style="padding-left:0px;">
									<c:if test="${coupon.imgs != null}">					                  
										<img src="${coupon.imgs}" width="95px" height="45px"/>
									</c:if>
								</div>
							</div>
	                    </div>
                    </div>
                </div>
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">卡券类型：</label>
                    
                     <div class="col-sm-8">
                        <select name="types" id="types" class="form-control">
                        	<option value="1" <c:if test="${coupon.types == 1 }">selected="selected"</c:if>>满减券</option>
						    <option value="2" <c:if test="${coupon.types == 2 }">selected="selected"</c:if>>现金券</option>
						</select>
                    </div>
                </div>
                
                <div class="form-group">
                  <label class="col-sm-3 control-label">满足条件：</label>
                    <div class="col-sm-8">
                    <input type="text" id="satisfyMoney" name="satisfyMoney" value="${coupon.satisfyMoney }" class="form-control" maxlength="16">
                    </div>
                </div>
              
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">优惠金额：</label>
                    <div class="col-sm-8">
                      <input type="text" id="couponMoney" name="couponMoney" value="${coupon.couponMoney }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">有效时间：</label>
                    <div class="col-sm-8">
	                    <div class="form-group7" id="data_5">
			                <div class="input-daterange input-group" id="datepicker">
		                        <input type="text" class="form-control" id="startTimeString"  name="startTimeString" value="${coupon.startTimeString }" />
		                        <span class="input-group-addon">到</span>
		                        <input type="text" class="form-control" id="endTimeString"  name="endTimeString" value="${coupon.endTimeString }" />
		                    </div>
	                    </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">状态：</label>
                    <div class="col-sm-8">
                       <select name="status" id="status" class="form-control">
                        	<option value="1" <c:if test="${coupon.status == 1 }">selected="selected"</c:if>>待发放</option>
						    <option value="2" <c:if test="${coupon.status == 2 }">selected="selected"</c:if>>已发放</option>
						</select>
                     </div>
                </div>
            
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-3">
                    	<button id="tan" class="btn btn-success" type="button">选择图书</button>
                        <button id="nav" class="btn btn-primary" type="button" <c:if test="${coupon.status == 2 }"> style="display:none"</c:if> >提交保存</button>
                        <button id="ret" class="btn btn-default" type="button">返回列表</button>
                    </div>
                </div>
                
                <input type="hidden" value="${ids}" id="ids">
                <div class="form-group" id="div1" style="margin:12px"></div>

            </form>
        </div>
		<!--内容结束-->
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/coupon/coupon/couponView.js?v=${version}"></script>
<script src="${basePath}/js/plugins/demo/form-advanced-demo.min.js"></script>
</body>
</html>