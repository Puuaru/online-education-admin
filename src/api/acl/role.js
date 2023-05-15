import request from "@/utils/request";

export function grantPermissions(roleId, permissionIds) {
  return request({
    url: `/acl/role/grant/${roleId}`,
    method: 'post',
    data: permissionIds
  })
}
