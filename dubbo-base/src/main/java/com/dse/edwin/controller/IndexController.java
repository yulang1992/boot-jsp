package com.dse.edwin.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.dse.edwin.entity.*;
import com.dse.edwin.service.ResourceService;
import com.dse.edwin.service.RoleResourceService;
import com.dse.edwin.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * FileName: IndexController
 * Author:   EdwinYu
 * Date:     2019-07-19 15:55
 * Description: home page
 * Version:1.0.0
 */
@Controller
public class IndexController {


    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private RoleResourceService roleResourceService;

    @RequestMapping("")
    public String index(){
        return "/index";
    }

    @RequestMapping("/home")
    public ModelAndView home(){
        ModelAndView mav = new ModelAndView();
        //查询当前用户拥有的角色
        User user =User.builder().id(2L).build();
                //getCurUser();

        QueryWrapper<UserRole> queryWrapper =new QueryWrapper<>();
        UserRole userRole =UserRole.builder().userId(user.getId()).build();
        queryWrapper.setEntity(userRole);
        List<UserRole> userRoleList = userRoleService.list(queryWrapper);

        List<RoleResource> roleResourceList =new ArrayList<>();
        for(UserRole uR : userRoleList){
           RoleResource roleResource =RoleResource.builder().roleId(uR.getRoleId()).build();
           QueryWrapper<RoleResource> query=new QueryWrapper<>();
           query.setEntity(roleResource);
           query.orderByAsc("id");
            List<RoleResource> roleResources = roleResourceService.list(query);
            roleResourceList.addAll(roleResources);
        }

        List<TreeVO> tree = new ArrayList<TreeVO>();
        for (RoleResource mroleResource : roleResourceList) {
            TreeVO treeVO = new TreeVO();
            Resource tresource =resourceService.getById(mroleResource.getResourceId());
            if(tresource != null){
                QueryWrapper<Resource> resourcequeryWrapper =new QueryWrapper<>();
               resourcequeryWrapper.eq("PARENT_ID",mroleResource.getResourceId());
                List<Resource> resourceList = resourceService.list(resourcequeryWrapper);

                treeVO.setIcon(tresource.getResourceIcon());
                treeVO.setRoot(tresource.getResourceName());
                treeVO.setLeaf(resourceList);
                tree.add(treeVO);
            }
        }
        mav.addObject("tree", tree);
        mav.addObject("user", user);
        mav.setViewName(ROOT + "home/home");
        return mav;
    }



   /* @SuppressWarnings("unchecked")
    @RequestMapping("/home")
    public ModelAndView home(HttpServletRequest request, HttpServletResponse response){
        ModelAndView mav = new ModelAndView();
        //查询当前用户拥有的角色
        Muser user = getCurUser();
        MuserRoleQuery ur_query = new MuserRoleQuery();
        ur_query.setUserId(user.getId());
        ur_query.setPageSize(Integer.MAX_VALUE);
        List<MuserRole> ur_list = muserRoleService.findPage(ur_query).getResult();

        //根据当前用户拥有的角色查询拥有的资源
        List<MroleResource> sum_list = new ArrayList<MroleResource>();
        for (MuserRole muserRole : ur_list) {
            MroleResourceQuery rr_query = new MroleResourceQuery();
            rr_query.setRoleId(muserRole.getRoleId());
            rr_query.setPageSize(Integer.MAX_VALUE);
            rr_query.setSortColumns("id asc");
            List<MroleResource> rr_list = mroleResourceService.findPage(rr_query).getResult();
            sum_list.addAll(rr_list);
        }

        //根据资源ID查询资源菜单
        List<TreeVO> tree = new ArrayList<TreeVO>();
        for (MroleResource mroleResource : sum_list) {
            TreeVO treeVO = new TreeVO();
            Mresource tresource = mresourceService.getById(mroleResource.getResourceId());
            if(tresource != null){
                MresourceQuery r_query = new MresourceQuery();
                r_query.setParentId(mroleResource.getResourceId());
                r_query.setPageSize(Integer.MAX_VALUE);
                List<Mresource> r_list = mresourceService.findPage(r_query).getResult();

                treeVO.setIcon(tresource.getResourceIcon());
                treeVO.setRoot(tresource.getResourceName());
                treeVO.setLeaf(r_list);
                tree.add(treeVO);
            }
        }

        mav.addObject("tree", tree);
        mav.addObject("user", user);
        mav.setViewName(ROOT + "home/home");
        return mav;
    } */

    @RequestMapping("/welcome")
    public ModelAndView welcome(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName(ROOT + "frame/welcome");
        return mav;
    }

    public static final String ROOT="/manager/";
}
