<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head> 
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
<link rel="icon" type="image/x-icon" href="${basePath}/img/favicon.ico" />
<title>后台登录入口</title>
<script type="text/javascript">var basePath="${basePath}";</script>
<style>
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,form,fieldset,legend,button,input,textarea,th,td,img
	{
	border: 0;
	margin: 0;
	padding: 0;
}

html {
	overflow: hidden;
}

.logintab {
	position: relative;
	top: 45%
}

.logintab td {
	line-height: 50px;
	white-space: nowrap
}

.loginuser{
	width:256px; 
	height:48px; 
	background:url(${basePath}/img/login/loginuser.png) no-repeat; 
	border:none; 
	line-height:48px; 
	padding-left:44px; 
	font-size:14px; 
	font-family:verdana; 
	font-weight:700;
}

.loginpwd{
	width:256px; 
	height:48px; 
	background:url(${basePath}/img/login/loginpassword.png) no-repeat; 
	border:none;
	line-height:48px; 
	padding-left:44px; 
	font-size:14px; 
	color:#90a2bc;
}


/* 按钮 */
.button {
	-moz-border-radius: 4px;
	-webkit-border-radius: 4px;
	-khtml-border-radius: 4px;
	border-radius: 4px;
	-moz-box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	-webkit-box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3);
	cursor: pointer;
	display: inline-block;
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	font-weight: bold;
	padding: 10px 131px;
	outline: none !important;
	text-align: center;
	text-decoration: none;
	position: relative;
	-moz-box-sizing: border-box !important;
	line-height: 20px;
}

.button-blue {
	background: #0095cd;
	background: -webkit-gradient(linear, left top, left bottom, from(#00adee),to(#0078a5) );
	background: -moz-linear-gradient(top, #00adee, #0078a5);
	-pie-background: linear-gradient(top, #00adee, #0078a5);
	border: 1px solid #034462;
	color: #fff;
	text-shadow: 0 1px 1px #00adee;
}

.button-blue:hover,.button-blue:focus {
	background: #007ead;
	background: -webkit-gradient(linear, left top, left bottom, from(#0095cc),to(#00678e) );
	background: -moz-linear-gradient(top, #0095cc, #00678e);
	-pie-background: linear-gradient(top, #0095cc, #00678e);
	border: 1px solid #234;
	color: #fff;
}
</style>
</head>
<script type="text/javascript" src="${basePath}/js/jquery-1.7.1.js" ></script>
<script type="text/javascript" src="${basePath}/js/jquery.cycle.all.js" ></script>
<script type="text/javascript" src="${basePath}/js/main.js" ></script>
<script type="text/javascript" src="${basePath}/js/myvalidate.js"></script>
<script type="text/javascript" src="${basePath}/js/login/login.js" ></script>
<link type="text/css" rel="stylesheet" href="${basePath}/css/main.css">
<script type="text/javascript" >
jQuery(function(){
	var sWidth = $(document).width();
	var sHeight = $(document).height();
	var mTop = sHeight/2-110;
	var mLeft = sWidth/2-322;
	$("#nav").css("top",mTop-90);
	$("#loginpanel").css("top",mTop-50);
	$(".slideDiv").height(sHeight);
    $(function() {
		var iconImg="${basePath}/img/login/graypoint.png"
        var iconImg_over="${basePath}/img/login/redpoint1.png"
		$('#slideshow').cycle({
            fx:      'fade',
            timeout:  5000,
			speed  :  2000,
            prev:    '#crossPrev',
            next:    '#crossNext', 
            pager:   '#nav',
            pagerAnchorBuilder: pagerFactory,
            before:  function(currSlideElement, nextSlideElement, options, forwardFlag) {  
						if($.browser.version=="6.0") {
							DD_belatedPNG.fix('a,div,img,background,span');
						}
                        var curIndex=$(currSlideElement).attr("index");
                        var curSlidnavtitle=$($("#slideDemo .slidnavtitle")[curIndex]);
                        if(curSlidnavtitle!=null){
                            curSlidnavtitle.css("background","url("+iconImg+") center center no-repeat");
                        }    
                        var nextIndex=$(nextSlideElement).attr("index");    
                        var nextSlidnavtitle=$($("#slideDemo .slidnavtitle")[nextIndex]);
                        if(nextSlidnavtitle!=null){
                            var tesy = "url("+iconImg_over+") no-repeat";
                            var tempInt = parseInt(nextIndex)  + 1;
                            nextSlidnavtitle.css("background","url(${basePath}/img/login/redpoint" + tempInt + ".png) center center  no-repeat");
                        }
                    }                       
        }); 
        function pagerFactory(idx, slide) {
            var s = idx > 20 ? ' style="display:none"' : '';
            return ' <span class="m-t-5  slidnavtitle"  style="cursor:pointer;background:url('+(idx==0?iconImg_over:iconImg)+') center center no-repeat;height:32px;width:32px;display:inline-block;">&nbsp;</span>';
        };
        setRandomBg(sHeight,sWidth);
    }); 	
});

function setRandomBg(sHeight,sWidth) {
    var discnt = 5;
    var i = Math.floor(Math.random()*10+1);
    var j = Math.floor(Math.random()*10+1);
    var k = Math.floor(Math.random()*10+1);
    var x = Math.floor(Math.random()*10+1);
    var y = Math.floor(Math.random()*10+1);
    var z = Math.floor(Math.random()*10+1);
    while (i > discnt ) {
        i = Math.floor(Math.random()*10+1);
    }
    while (j > discnt || j == i) {
        j = Math.floor(Math.random()*10+1);
    }
    while (k > discnt || k == i || k == j) {
        k = Math.floor(Math.random()*10+1);
    }    
    var image_suffix = ".jpg";
    if(sHeight < 800 && sWidth < 1368){
        console.info("${basePath}/img/login/" + i + "_min" + image_suffix);
	    $("#disimg1").css("background", "url(${basePath}/img/login/" + i + "_min" + image_suffix + ") no-repeat");
	    $("#disimg2").css("background", "url(${basePath}/img/login/" + j + "_min" + image_suffix + ") no-repeat");
	    $("#disimg3").css("background", "url(${basePath}/img/login/" + k + "_min" + image_suffix + ") no-repeat");
    }else{
	    $("#disimg1").css("background", "url(${basePath}/img/login/" + i + image_suffix + ") no-repeat");
	    $("#disimg2").css("background", "url(${basePath}/img/login/" + j + image_suffix + ") no-repeat");
	    $("#disimg3").css("background", "url(${basePath}/img/login/" + k + image_suffix + ") no-repeat");
    }
}
</script>

<body style=" margin:0px; padding:0px; background: #ebeeef; width:100%; height:100%; z-index:10;" onresize="this.location.reload();">
    <div style=" width:100%; overflow:hidden;" id="slideDemo"> 
        <div style="margin:0px; clear:left; top:0px; width:100%; height:100%;" id="slideshow" class="slideDivContinar">
            <div style="cursor:pointer;width:100%;" id="disimg1" class="slideDiv" index="0"></div>
            <div style="cursor:pointer;width:100%;" id="disimg2" class="slideDiv" index="1"></div>
            <div style="cursor:pointer;width:100%;" id="disimg3" class="slideDiv" index="2"></div>
    	</div>
    <div id="nav" style="position:absolute; z-index:100; width:100%; text-align:center;"></div>
    </div>    
    <div id="loginpanel" style="position:absolute;z-index:100; width:100%; text-align:center;">
    	<table width="100%" border="0" >
        	<tr>
                <td>
                	<table width="803" border="0" align="center" style="background:url(${basePath}/img/login/boxbg.png) no-repeat;">
                    	<tr>
                        	<td width="380" height="320">
                            </td>
                            <td>
                            	<form name="form1" id="form1" method="post">
                                    <table id="langchoosetable" cellspacing="0" cellpadding="0" width="266" height="100%" valign="top" border="0" align="left">
                                        <tbody>
                                            <tr>
                                                <td style="height:50px;padding:0px 0px 8px 10px;" align="left">
													<table border="0" width="240" height="205" cellspacing="0" cellpadding="0" align="left" class="logintab">
														<tr>														
															<td><input name="name" value="" id="sign-user-id" type="text" class="loginuser" autocomplete="off" maxlength="16" title="用户名"/></td>
														</tr>
														<tr>															
															<td><input name="password" value="" id="sign-pass-id" type="password" class="loginpwd" autocomplete="off" maxlength="16" title="密码"/></td>
														</tr>
														<tr>															
															<td>
																<a id="sign-btn-id" class="button button-blue">登&nbsp;&nbsp;录</a>
															</td>
														</tr>
													</table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <div style="width:100%; height:91px; background:#333; z-index:100; background:url() repeat-x; position:absolute; top:0px;" >
    <table width="100%">
    	<tr>
        	<td height="80" width="50%" valign="middle" >
            	<div style="margin-left:15px;"></div>
            </td>           
        </tr>
    </table>
    </div>
    <div style="width:100%; height:42px; line-height:42px; text-align:center; padding-top:20px; background:url(${basePath}/img/login/bg_foot.png); z-index:100; position:absolute; bottom:0px; color:white; font: 15px '微软雅黑', 宋体;" >武汉科技有限公司版权所有&copy;2018 all rights reserved &nbsp;&nbsp; ICP备案号：xxxxxxxxxx号</div>
</body>
</html>