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
 * 资源权限表
 * </p>
 *
 * @author yulang
 * @since 2019-07-19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@TableName("m_resource")
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 资源名称
     */
    private String resourceName;

    /**
     * 资源路径
     */
    private String resourceUrl;

    /**
     * 资源图标
     */
    private String resourceIcon;

    /**
     * 父ID
     */
    private Long parentId;

}
