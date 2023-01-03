import request from "@/utils/request";

export default {
  // 添加课程信息
  saveCourseInfo(courseInfo) {
    return request({
      url: `/edu/course/`,
      method: "post",
      data: courseInfo,
    });
  },

  // 查询所有讲师
  getAllTeachaer() {
    return request({
      url: `/edu/teacher/list`,
      method: "get",
    });
  },

  updateCourseInfo(courseInfo) {
    return request({
      url: `/edu/course/`,
      method: "put",
      data: courseInfo,
    });
  },

  getCourseInfo(id) {
    return request({
      url: `/edu/course/${id}`,
      method: "get",
    });
  },

  getPublishInfo(id) {
    return request({
      url: `/edu/course/publish/${id}`,
      method: "get",
    });
  },

  publishCourse(id) {
    return request({
      url: `/edu/course/publish/${id}`,
      method: "put",
    });
  },

  getPage(current, limit, query) {
    return request({
      url: `/edu/course/condition/${current}/${limit}`,
      method: "post",
      data: query,
    });
  },

  deleteCourse(id) {
    return request({
      url: `/edu/course/${id}`,
      method: "delete",
    });
  },
};
