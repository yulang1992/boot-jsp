<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>订单详情页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
   <div class="ibox float-e-margins">
		<!--层头部开始-->
		<div class="ibox-title">
			<h5>查看订单</h5>
			<div class="ibox-tools"><a class="collapse-link7"><i class="fa fa-chevron-up"></i></a></div>
		</div>
		<!--层头部结束-->
				
		<!--内容开始-->
		 <div class="ibox-content">
            <form class="form-horizontal m-t" id="commentForm">
            
                <div class="form-group">
                    <label class="col-sm-3 control-label">订单号：</label>
                    <div class="col-sm-8">
                        <input type="text" id="orderNumber" name="orderNumber" value="${order.orderNumber }" class="form-control" maxlength="16">
                        <input type="hidden" name="id" id="id" value="${order.id }">
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-sm-3 control-label">产品名称：</label>
                    <div class="col-sm-8">
                       <input type="text" id="names" name="names" value="${order.names }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                   <div class="form-group">
                    <label class="col-sm-3 control-label">产品价格：</label>
                    <div class="col-sm-8">
                       <input type="text" id="totalPrice" name="totalPrice" value="${order.totalPrice }" class="form-control" maxlength="16">
                    </div>
                </div>
                
                   <div class="form-group">
                    <label class="col-sm-3 control-label">实际支付金额：</label>
                    <div class="col-sm-8">
                       <input type="text" id="actualPayment"  name="actualPayment"  value="${order.actualPayment }" class="form-control" maxlength="16">
                    </div>
                </div>
              
              <div class="form-group">
                    <label class="col-sm-3 control-label">订单状态：</label>
                    <div class="col-sm-8">
                    <c:if test="${order.status == 1}"><input type="text"  value="未支付" class="form-control" maxlength="16"></c:if>
                    <c:if test="${order.status == 2}"><input type="text"  value="已支付" class="form-control" maxlength="16"></c:if> 
                    <c:if test="${order.status == 3}"><input type="text"  value="已取消" class="form-control" maxlength="16"></c:if>   
                    </div>
                </div>
                
                   <div class="form-group">
                    <label class="col-sm-3 control-label">支付方式：</label>
                    <div class="col-sm-8">
                      <c:if test="${order.payment == 1}"><input type="text"  value="支付宝" class="form-control" maxlength="16"></c:if>
                      <c:if test="${order.payment == 2}"><input type="text"  value="微信" class="form-control" maxlength="16"></c:if>   
                    </div>
                </div>
                
                  <div class="form-group">
                    <label class="col-sm-3 control-label">购买用户：</label>
                    <div class="col-sm-8">
                       <input type="text" id="userName" name="userName" value="${order.userName }" class="form-control" maxlength="16">
                    </div>
                  </div>
                
                 <div class="form-group">
                    <label class="col-sm-3 control-label">联系电话：</label>
                    <div class="col-sm-8">
                       <input type="text" id="userPhone" name="userPhone" value="${order.userPhone }" class="form-control" maxlength="16">
                    </div>
                  </div>
                  
                   <div class="form-group">
                    <label class="col-sm-3 control-label">下单时间：</label>
                    <div class="col-sm-8">
                       <input type="text" id="createTimeString" name="createTimeString" value="${order.createTimeString }" class="form-control" maxlength="16">
                    </div>
                  </div>
                  
                   <div class="form-group">
                    <label class="col-sm-3 control-label">所使用优惠券：</label>
                    <div class="col-sm-8">
                      <c:if test="${order.couponName == 1}"><input type="text"  value="满减券" class="form-control" maxlength="16"></c:if>   
                      <c:if test="${order.couponName == 2}"><input type="text"  value="现金券" class="form-control" maxlength="16"></c:if>   
                    </div>
                  </div>
                 
                <div class="form-group">
                    <div class="col-sm-4 col-sm-offset-3">
                        <button id="ret" class="btn btn-default" type="button">返回</button>
                    </div>
                </div>
            </form>
            
        </div>
		<!--内容结束-->
    </div>         
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/order/order/orderView.js?v=${version}"></script>
</body>
</html>