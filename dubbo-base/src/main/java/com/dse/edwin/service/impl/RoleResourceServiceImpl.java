package com.dse.edwin.service.impl;

import com.dse.edwin.entity.RoleResource;
import com.dse.edwin.mapper.RoleResourceMapper;
import com.dse.edwin.service.RoleResourceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* <p>
    * 角色_资源表 服务实现类
    * </p>
*
* @author yulang
* @since 2019-07-19
*/
@Service
@Transactional
public class RoleResourceServiceImpl extends ServiceImpl<RoleResourceMapper, RoleResource> implements RoleResourceService {

}
