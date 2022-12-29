import request from "@/utils/request";

export default {
  // 根据课程id查找其对应的章节与小节信息
  getChapterVideo(courseId) {
    return request({
      url: `/edu/chapter/details/${courseId}`,
      method: "get",
    });
  },
  getChapter(chapterId) {
    return request({
      url: `/edu/chapter/${chapterId}`,
      method: "get",
    });
  },
  updateChapter(chapter) {
    return request({
      url: `/edu/chapter`,
      data: chapter,
      method: "put",
    });
  },
  saveChapter(chapter) {
    return request({
      url: `/edu/chapter`,
      data: chapter,
      method: "post",
    });
  },
  deleteChapter(chapterId) {
    return request({
      url: `/edu/chapter/${chapterId}`,
      method: "delete",
    });
  },
};
