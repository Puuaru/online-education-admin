import request from "@/utils/request";

export default {
  initDataByDate(date) {
    return request({
      url: `/statistic/${date}`,
      method: "get",
    });
  },

  getDataByType(type, begin, end) {
    return request({
      url: `/statistic/${type}/${begin}/${end}`,
      method: "get",
    });
  },
};
