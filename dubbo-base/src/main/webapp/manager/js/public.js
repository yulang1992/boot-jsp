/* 获取ids串 */
function getIds(selectRow){
	var ids = '';
	for(var i=0; i<selectRow.length; i++){
		ids = ids + selectRow[i] + ',';
	}
	return ids = ids.substring(0,ids.length-1);
}

/* 时间戳与日期转换 */
(function($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)  
             */
            CurTime: function(){
                return Date.parse(new Date())/1000;
            },
            /**              
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式              
             * @return <int>        unix时间戳(秒)              
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                        )).getTime() / 1000;
            },
            /**              
             * 时间戳转换日期              
             * @param <int> unixTime    待时间戳(秒)              
             * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)              
             * @param <int>  timeZone   时区              
             */
            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')
                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
                }
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += getZF(time.getUTCFullYear()) + "-";
                ymdhis += getZF((time.getUTCMonth()+1)) + "-";
                ymdhis += getZF(time.getUTCDate());
                if (isFull === true)
                {
                    ymdhis += " " + getZF(time.getUTCHours()) + ":";
                    ymdhis += getZF(time.getUTCMinutes()) + ":";
                    ymdhis += getZF(time.getUTCSeconds());
                }
                return ymdhis;
            }
        }
    });
})(jQuery);

/* 补0操作 */
function getZF(num){
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;  
}

/**
 * 使用方法 console.log($.myTime.DateToUnix('2018-05-15 20:20:20'));
 * console.log($.myTime.UnixToDate(1325347200));
 */