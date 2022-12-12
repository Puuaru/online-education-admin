import request from "@/utils/request";

export default {
  // 根据课程id获取分类好的章节和视频数据
  getChapterVideo(courseId) {
    return request({
      url: `/edu/chapter/details/${courseId}`,
      method: "get",
    });
  },
};
