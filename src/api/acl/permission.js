import request from "@/utils/request";

export default {
  list() {
    return request({
      url: `/acl/permission/list`,
      method: "get",
    });
  },

  remove(permissionId) {
    return request({
      url: `/acl/permission/delete/${permissionId}`,
      method: "delete",
    });
  },

  add(data) {
    return request({
      url: `/acl/permission/add`,
      method: "post",
      data: data,
    });
  },

  update(data) {
    return request({
      url: `/acl/permission/update`,
      method: "put",
      data: data,
    });
  },
};
