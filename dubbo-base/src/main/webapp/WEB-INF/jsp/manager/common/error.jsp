<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="../include/taglib.jsp"%>
<!DOCTYPE>
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  </head>
  
  <body>
  	【错误页面】<p>
  	<span style="color:red;">${msg}</span>
  	&nbsp;&nbsp;&nbsp;&nbsp;code:${exception.result}<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;desc:${exception.desc}请联系管理员.
  </body>
</html>