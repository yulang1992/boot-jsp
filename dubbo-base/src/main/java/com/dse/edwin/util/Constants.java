package com.dse.edwin.util;

/**
 * 系统常量
 * 
 * @author wangxuejun
 */
public class Constants {


	public static final long APP_SESSION_TIME_OUT =60 * 60 * 7 ;


	/**
	 * 商城订单状态
	 * 
	 */
	public enum ORDER_STATUS {
		/**
		 * 未付款状态
		 */
		UNPAYMENT(1),
		/**
		 * 已付款状态
		 */
		PAYMENTED(2),
		/**
		 * 卖家已发货状态
		 */
		SELLER_SEND(3),
		/**
		 * 已签收状态
		 */
		SIGNIN(4),
		/**
		 * 成交状态
		 */
		BARGAIN(5),
		/**
		 * 退款状态
		 */
		REFUND_MONEY(6),
		/**
		 * 取消状态
		 */
		CANCEL(7),
		/**
		 * 退货状态
		 */
		REFUND_GOODS(8),
		/**
		 * 等待买家发货状态
		 */
		WAIT_BUYER_SEND(9),
		/**
		 * 买家已发货状态
		 */
		BUYER_SEND(10),
		/**
		 * 卖家不同意买家退款退货,直接冻结，后台处理
		 */
		FREEZE(-1);

		private final Integer value;

		ORDER_STATUS(Integer value) {
			this.value = value;
		}

		public int intValue() {
			return this.value;
		}
	}
	

	/**
	 * controller返回值状态
	 */
	public enum CONTROLLER_RESULT {
		/** 成功 */
		SUCCESS(1),

		/** 未知错误 */
		ERROR(-999),

		/** 业务异常 */
		SERVICE_EXCEPTION(-998),

		/** 未登录 */
		NOT_LOGIN(-1),

		/** 参数为空 */
		NULL_PARAMETER(-2),

		/** 对象为空 */
		NULL_OBJECT(-3),

		/** 没有操作权限 */
		UNAUTHORIZED(-4),

		/** 用户名错误 */
		ERROR_USERNAME(-5),

		/** 密码错误 */
		ERROR_PASSWORD(-6),

		/** 对象已存在 */
		ISEXIST(-7),

		/** 已离职 */
		IS_QUIT(-8),

		/** 验证码错误 */
		ERROR_VERIFICATION(-9),

		/** 密码不一致 */
		ERROR_REPASSWORD(-10),

		/** 短信验证码错误 */
		ERROR_MESSAGE_VERIFICATION(-11),

		/** 图片过大 */
		ERROR_IMAGE_SIZE(-12),

		/** 图片上传失败 */
		ERROR_IMAGE(-13),
		
		/** 短信发送失败 */
		FAIL_VERIFICATION(-14);

		private final Integer value;

		CONTROLLER_RESULT(Integer value) {
			this.value = value;
		}

		public int intValue() {
			return this.value;
		}
	}

}
