import request from "@/utils/request";

export default {
  initDataByDate(date) {
    return request({
      url: `/statistic/${date}`,
      method: "get",
    });
  },

  getDataByType(begin, end) {
    return request({
      url: `/statistic/${begin}/${end}`,
      method: "get",
    });
  },
};
