import request from "@/utils/request";

export default {
  getVideo(id) {
    return request({
      url: `/edu/video/${id}`,
      method: "get",
    });
  },
  deleteVideo(id) {
    return request({
      url: `/edu/video/${id}`,
      method: "delete",
    });
  },
  saveVideo(video) {
    return request({
      url: `/edu/video`,
      method: "post",
      data: video,
    });
  },
  updateVideo(video) {
    return request({
      url: `/edu/video`,
      method: "put",
      data: video,
    });
  },
  deleteCloudVideo(id) {
    return request({
      url: `/vod/${id}`,
      method: "delete",
    });
  },
};
