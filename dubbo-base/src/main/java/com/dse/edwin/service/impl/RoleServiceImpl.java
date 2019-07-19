package com.dse.edwin.service.impl;

import com.dse.edwin.entity.Role;
import com.dse.edwin.mapper.RoleMapper;
import com.dse.edwin.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* <p>
    * 角色表 服务实现类
    * </p>
*
* @author yulang
* @since 2019-07-19
*/
@Service
@Transactional
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

}
