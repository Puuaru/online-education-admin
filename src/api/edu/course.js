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
};