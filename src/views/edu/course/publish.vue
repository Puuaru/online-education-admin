<template>
  <div class="app-container">

    <h2 style="text-align: center">编辑课程</h2>

    <el-steps :active="active"
              finish-status="success"
              align-center
              style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <!-- {{ publishInfo }} -->
    <div class="publishInfo">
      <img :src="publishInfo.cover"
           alt="课程封面">
      <div class="main">
        <h2>{{ publishInfo.title }}</h2>
        <p><span>共{{ publishInfo.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publishInfo.subjectFirst }} - {{ publishInfo.subjectSecond }}</span></p>
        <p><span>课程讲师：{{ publishInfo.teacherName }}</span></p>
        <h3>￥{{ publishInfo.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous()">上一步</el-button>
      <el-button :disabled="disableSaveButton"
                 type="primary"
                 @click="publishCourse()">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import course from '@/api/edu/course'

export default {
  name: '',
  data() {
    return {
      active: 2,
      disableSaveButton: false,
      courseId: '',
      publishInfo: {},
    }
  },
  components: {},
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getPublishInfo(this.courseId)
    }
  },
  methods: {
    getPublishInfo(courseId) {
      course.getPublishInfo(courseId).then((result) => {
        this.publishInfo = result.data.items
      })
    },

    previous() {
      this.$router.push({
        path: '/course/chapter/' + this.courseId,
      })
    },

    publishCourse() {
      course.publishCourse(this.courseId).then(() => {
        this.$router.push({
          path: '/course/list/',
        })
      })
    },
  },
}
</script>
<style scoped>
.publishInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px #ddd;
  margin-bottom: 40px;
  position: relative;
}

.publishInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}

.publishInfo .main {
  margin-left: 520px;
}

.publishInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  /* font-weight: normal; */
}

.publishInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.publishInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>