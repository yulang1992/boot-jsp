/*验证密码的英文  数字 符号 6-8位 */
jQuery.isPassword = function(v) {
	var reg =  /^[\w\d\@\#\+\-\^\(\)\*\&\%\$\_\'\"\,\.\>\<\:\;]{6,8}$/;
	return reg.test(v);
};

/*密码至少包含数字、字母、符号中的2种*/
jQuery.isFormat=function(a){
	var reg= /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,8}$/;
	return reg.test(a);
};

/*允许中文 英文  数字  小数点 不允许特殊字符*/
jQuery.isCecpoint=function(a){
	var reg= /^[\u4E00-\u9FA5A-Za-z0-9\.]+$/;
	return reg.test(a);
};

/*允许中文英文 数字 符号 不允许特殊符号*/
jQuery.notSpecial=function(a){
	var reg= /^[\u4e00-\u9fa5\w\d\@\#\+\-\^\(\)\*\&\%\$]{2,125}$/;
	return reg.test(a);
};

/*允许 中 英文 小数点  不允许特殊字符  数字*/
jQuery.notCountSymbol=function(a){
	var reg= /^[\u4E00-\u9FA5A-Za-z\.]+$/;
	return reg.test(a);
};

/*允许 整数、小数（小数后保留两位）*/
jQuery.countAndLittle=function(a){
	var reg= /^\d+$|^\d{1,10}(\.\d{1,2})?$/;
	return reg.test(a);
};

/*正整数除0*/
jQuery.integer=function(a){
	var reg=/^[0-9]*[1-9][0-9]*$/;
	return reg.test(a);
};


//检查是否数字
jQuery.isNum=function(a){
  var reg =/^\d{15}$/;
  return reg.test(a);
};

//身份证账号
jQuery.isCard=function(a){
	var reg=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
	return reg.test(a);
};
//只允许数字和英文
jQuery.numEn=function(a){
	var reg=/^[0-9a-zA-Z]*$/;
	return reg.test(a);
};


/**
 * 验证字符串v是否为空（null 或者 空字符串——""）
 *
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 为空，false 不为空
 *         @example
 *         $.isEmpty(v) //需要被验证的字符串
 */
jQuery.isEmpty = function(v) {
	if (v == null || $.trim(v) == "") {
		return true;
	} else {
		return false;
	}
};

/**
 * 日期字符串格式验证
 * 
 * @param {str}
 * 			str 需要被验证的字符串
 * @return {boolean} true 符合日期字符串格式，false 不符合日期字符串格式
 * 			@example
 *          $.isDateStr(str) //需要被验证的字符串
 */
jQuery.isDateStr = function(str) {
	var reg = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
	return reg.test(str);
};

/**
 * 有效数字格式验证
 * 
 * @param {str}
 * 			str 需要被验证的字符串
 * @return {boolean} true 符合有效数字格式，false 不有效数字格式
 * 			@example
 *          $.isNumber(str) //需要被验证的字符串
 */
jQuery.isNumber = function(str) {
	var reg = /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/;
	return reg.test(str + "");
};

/**
 * 验证字符串v是否符合邮箱格式
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合邮箱格式，false 不符合邮箱格式
 * 			@example 
 * 			$.isEmail(v) //需要被验证的字符串
 */
jQuery.isEmail = function(v) {
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return reg.test(v);
};

/**
 * 验证字符串v是否符合手机格式
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合手机格式，false 不符合手机格式
 * 			@example 
 * 			$.isPhone(v) //需要被验证的字符串
 */
jQuery.isPhone = function(v) {
	var reg = /^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$/;
	return reg.test(v);
};

/**
 * 获取指定字符串v的长度，1个中文=2个字节
 * 
 * @param {string}
 *            v 字符串
 * @return {number} 字符串长度
 * 			@example 
 * 			$.getLength(v)
 */
jQuery.getLength = function(v) {
	if ($.isEmpty(v)) {
		return 0;
	} else {
		return v.replace(/[^\x00-\xff]/ig, "**").length;
	}
};

/**
 * 验证字符串是否只有字母和数字组成
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合格式，false 不符合格式
 * 			@example 
 * 			$.isLetterNumber (v) //需要被验证的字符串
 */
jQuery.isLetterNumber = function(v) {
	var reg = /^[0-9a-zA-Z]+$/;
	return reg.test(v);
};

/**
 * 验证字符串是否只有字母、数字和_组成
 * 
 * @param {string}
 *            v 需要被验证的字符串
 * @return {boolean} true 符合格式，false 不符合格式
 * 			@example 
 * 			$.isLetterNumberUnderline (v) //需要被验证的字符串
 */
jQuery.isLetterNumberUnderline = function(v) {
	var reg = /^[0-9a-zA-Z_]+$/;
	return reg.test(v);
};

/**
 * 非负整数判断
 * 
 * @param {v}
 * 			str 需要被验证的字符串
 * @return {boolean} true 是非负整数，false 不是非负整数
 * 			@example
 *          $.isZZNum(v) //需要被验证的字符串
 */
jQuery.isZZNum = function(v) {
	var reg = /^(([1-9])\d*|0{1})$/;
	return reg.test(v);
};
