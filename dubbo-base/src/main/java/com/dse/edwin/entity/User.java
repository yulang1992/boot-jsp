package com.dse.edwin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * <p>
 * 后台用户表
 * </p>
 *
 * @author yulang
 * @since 2019-07-19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TableName("m_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户名(帐号)
     */
    private String name;

    /**
     * 密码
     */
    private String password;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 手机
     */
    private String mobilePhone;

    /**
     * 用户状态
     */
    private Boolean status;

    /**
     * 创建时间
     */
    private Integer createTime;


}
