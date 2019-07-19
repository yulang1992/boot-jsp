package com.dse.edwin.service.impl;

import com.dse.edwin.entity.Resource;
import com.dse.edwin.mapper.ResourceMapper;
import com.dse.edwin.service.ResourceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* <p>
    * 资源权限表 服务实现类
    * </p>
*
* @author yulang
* @since 2019-07-19
*/
@Service
@Transactional
public class ResourceServiceImpl extends ServiceImpl<ResourceMapper, Resource> implements ResourceService {

}
