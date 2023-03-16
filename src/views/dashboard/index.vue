<template>
  <div class="dashboard-container">
    <div class="dashboard-selector">
      <el-form inline>
        <el-form-item label="查询">
          <el-select placeholder="-" v-model="searchProps.type">
            <el-option label="注册人数" value="register_num"></el-option>
            <el-option label="登录人数" value="login_num"></el-option>
            <el-option label="视频播放次数" value="video_view_num"></el-option>
            <el-option label="课程数量" value="course_num"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间范围">
          <el-date-picker
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
            v-model="searchProps.begin"
          ></el-date-picker>

          &nbsp;-&nbsp;

          <el-date-picker
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            v-model="searchProps.end"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <div class="dashboard-content">
      <div id="chart-main" class="chart"></div>
    </div>
  </div>
</template>

<script>
import dashboard from "@/api/dashboard";
import * as echarts from "echarts";

export default {
  data() {
    return {
      data: "",
      searchProps: {
        type: "login_num",
      },
    };
  },

  computed: {},

  mounted() {
    this.setupChart()
  },

  created() {
    let originalDate = new Date();
    let day = originalDate.getDate();
    let month = originalDate.getMonth() + 1;

    day = day <= 9 ? `0${day}` : day;
    month = month <= 9 ? `0${month}` : month;

    let year = originalDate.getFullYear();
    let date = `${year}-${month}-${day}`;

    // this.initData(date);
    // this.setupChart();
  },

  methods: {
    getData() {
      dashboard
        .getDataByType("login_num", "2021-04-17", "2021-04-21")
        .then((respond) => {
          this.data = respond.data;
        });
    },

    initData(date) {
      dashboard.initDataByDate(date).then((respond) => {
        this.data = respond.data;
      });
    },

    setupChart() {
      let chart = echarts.init(document.getElementById('chart-main'));
      let chartTitle;
      switch (this.searchProps.type) {
        case "login_num":
          chartTitle = "登录人数";
          break;
        case "register_num":
          chartTitle = "注册人数";
          break;
        case "video_view_num":
          chartTitle = "视频观看数";
          break;
        case "course_num":
          chartTitle = "课程数";
          break;
      }
      console.log(chartTitle);
      let options = {
        title: {
          text: chartTitle,
        },
      };
      chart.setOption(options);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.chart {
  width: 100%;
  height: 500px;
}
</style>
