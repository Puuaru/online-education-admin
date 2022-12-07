<template>
  <div class="app-container">
    <h2 style="text-align: center">编辑课程</h2>

    <el-steps :active="active"
              finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;"
               @click="previous"
               type="primary"
               icon="el-icon-back">上一步</el-button>

    <el-button style="margin-top: 12px;"
               @click="next"
               type="primary"
               icon="el-icon-right">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      active: 1,
    }
  },
  components: {},
  created() {},
  methods: {
    next() {
      this.$router.push({
        path: '/course/publish/' + '1',
      })
    },
    previous() {
      this.$router.push({
        path: '/course/info/' + '1',
      })
    },
  },
}
</script>
<style>
</style>