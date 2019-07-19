<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../../include/taglib.jsp"%>
<%@include file="../../include/css.jsp"%>
<title>产品菜单页</title>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content animated fadeInRight">
  <div id="showdiv">
	  	<select name="previous" id="previous" onchange="getCity()">
	   	</select>
	   	<select name="city" id="city" onchange="getTown()">
	   	</select>
	   	<select name="town" id="town">
	   	</select>
  	</div>
</div>
<%@include file="../../include/js.jsp"%>
<script src="${basePath}/js/book/book/bookView.js?v=${version}"></script>
</body>
</html>