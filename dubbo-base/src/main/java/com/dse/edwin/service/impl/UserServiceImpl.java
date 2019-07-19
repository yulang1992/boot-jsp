package com.dse.edwin.service.impl;

import com.dse.edwin.entity.User;
import com.dse.edwin.mapper.UserMapper;
import com.dse.edwin.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* <p>
    * 后台用户表 服务实现类
    * </p>
*
* @author yulang
* @since 2019-07-19
*/
@Service
@Transactional
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
