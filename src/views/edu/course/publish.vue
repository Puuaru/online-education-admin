<template>
  <div class="app-container">

    <h2 style="text-align: center">编辑课程</h2>

    <el-steps :active="active"
              finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      active: 2,
    }
  },
  components: {},
}
</script>
<style>
</style>