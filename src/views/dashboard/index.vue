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
      xData: "",
      yData: "",
      searchProps: {
        type: "login_num",
        // begin: "",
        // end: "",
      },
    };
  },

  computed: {},

  mounted() {
    this.getData().then(() => {
      this.setupChart();
    });
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
  },

  methods: {
    getData() {
      return new Promise((resolve) => {
        dashboard
          .getDataByType(
            this.searchProps.type,
            this.searchProps.begin,
            this.searchProps.end
          )
          .then((respond) => {
            this.xData = respond.data.items.dateList;
            this.yData = respond.data.items.countList;
            resolve();
          });
      });
    },

    initData(date) {
      dashboard.initDataByDate(date).then((respond) => {
        this.data = respond.data;
      });
    },

    setupChart() {
      let chart = echarts.init(document.getElementById("chart-main"));
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
          left: "center",
          top: 2,
        },
        dataZoom: [
          {
            show: true,
            height: 25,
            xAxisIndex: [0],
            bottom: 15,
            start: 0,
            end: 100,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#1f1a1a",
            },
            borderColor: "#90979c",
          },
        ],
        grid: {
          left: "5%",
          right: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: {
          type: "line",
          data: this.yData,
        },
        tooltip: {
          show: true,
          trigger: "axis",
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
