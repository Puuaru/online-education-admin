<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="信息描述">
        <el-tag type="info">Excel模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download"></i>
          <a
            href="'https://online-education-puuaru.oss-cn-shenzhen.aliyuncs.com/subject-template.xlsx'"
            >点击下载模板</a
          >
        </el-tag>
      </el-form-item>

      <el-form-item label="选择 Excel 文件">
        <el-upload
          class="upload"
          ref="upload"
          drag
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :action="actionUrl"
          :limit="1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传xlsx文件，且不超过500kb
          </div>
        </el-upload>
        <el-button
          icon="el-icon-upload"
          size="small"
          @click="submitUpload"
          type="success"
        >
          上传到服务器
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actionUrl: process.env.VUE_APP_BASE_API + "/edu/subject",
    };
  },
  components: {},
  methods: {
    fileUploadSuccess() {
      this.$message({
        type: "success",
        message: "上传成功",
      });
      this.$router.push({
        path: "/subject/list",
      });
    },
    fileUploadError() {
      this.$message({
        type: "error",
        message: "添加失败",
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style></style>

