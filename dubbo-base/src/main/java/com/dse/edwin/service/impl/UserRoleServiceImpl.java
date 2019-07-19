package com.dse.edwin.service.impl;

import com.dse.edwin.entity.UserRole;
import com.dse.edwin.mapper.UserRoleMapper;
import com.dse.edwin.service.UserRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* <p>
    * 用户_角色表 服务实现类
    * </p>
*
* @author yulang
* @since 2019-07-19
*/
@Service
@Transactional
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole> implements UserRoleService {

}
