<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<%@include file="../include/css.jsp"%>
<%@include file="../include/js.jsp"%>
<title>会员数据信息统计</title>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">

			<div class="col-md-4">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<span class="label label-primary pull-right">今日</span>
						<h5>用户数量</h5>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class="col-md-6" id="userO">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small></small>
								</div>
							</div>
							<div class="col-md-6" id="userT">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small id="userTwoName"></small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<span class="label label-primary pull-right">今日</span>
						<h5>
							订单数量
						</h5>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class="col-md-6" id="orderO">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small></small>
								</div>
							</div>
							<div class="col-md-6" id="orderT">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small></small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<span class="label label-primary pull-right">今日</span>
						<h5>
							交易金额
						</h5>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class="col-md-6" id="MoneyO">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small></small>
								</div>
							</div>
							<div class="col-md-6" id="MoneyT">
								<h1 class="no-margins"></h1>
								<div class="font-bold text-navy">
									<small></small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
        
         <div class="row">
            <div class="col-sm-12">
                <div class="tabs-container">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">每日新增用户量</a>
                        </li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">每日新增订单数量</a>
                        </li>
                         <li class=""><a data-toggle="tab" href="#tab-3" aria-expanded="false">每日新增订单金额</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <div id="chartUserView" align="center" style="width: 100%; height: 400px;"></div>
                            </div>
                        </div>
                        <div id="tab-2" class="tab-pane">
                            <div class="panel-body">
 								<div id="chartOrderView" align="center" style="width: 1042px; height: 400px;"></div>
                            </div>
                        </div>
                        <div id="tab-3" class="tab-pane">
                            <div class="panel-body">
                             <div id="chartMoneyView" align="center" style="width: 1042px; height: 400px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
</div>
<script src="${basePath}/js/report/homeReportList.js?v=${version}"></script>
</body>
</html>