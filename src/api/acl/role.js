import request from "@/utils/request";

const roleApis = {
  addRole(role) {
    return request({
      url: "/acl/role/add",
      method: "post",
      data: role,
    });
  },

  getRoleCondition(current, limit, nameQuery) {
    return request({
      url: `/acl/role/condition/${current}/${limit}`,
      method: "get",
      params: {
        nameQuery: nameQuery,
      },
    });
  },

  listRoles() {
    return request({
      url: '/acl/role/list',
      method: 'get'
    })
  },

  // ========== 修改已有角色 ===========
  grantPermissions(roleId, permissionIds) {
    return request({
      url: `/acl/role/permissions/grant/${roleId}`,
      method: "post",
      data: permissionIds,
    });
  },

  alterPermissionsForRole(roleId, permissionIds) {
    return request({
      url: `/acl/role/permissions/alter/${roleId}`,
      method: "post",
      data: permissionIds
    })
  },

  getRolePermissions(roleId) {
    return request({
      url: `/acl/role/permissions/list/${roleId}`,
      method: "get"
    })
  },

  deleteRoleById(roleId) {
    return request({
      url: `/acl/role/remove/${roleId}`,
      method: "delete"
    })
  },

  updateRole(role) {
    return request({
      url: '/acl/role/update',
      method: "post",
      data: role
    })
  }

};

export default roleApis;
