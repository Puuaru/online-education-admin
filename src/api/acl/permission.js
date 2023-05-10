import request from "@/utils/request";

export function list() {
  return request({
    url: `/acl/permission/list`,
    method: 'get'
  })
}

export function remove(permissionId) {
  return request({
    url: `/acl/permission/delete/${permissionId}`,
    method: 'delete'
  })
}

export function add(data) {
  return request({
    url: `/acl/permission/add`,
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: `/acl/permission/update`,
    method: 'put',
    data: data
  })
}

