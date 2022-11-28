<template>
  <div class="app-container">
    <h2>讲师信息管理</h2>
    <el-form ref="teacher"
             :model="teacherData"
             label-width="80px">

      <el-form-item label="讲师名称">
        <el-input v-model="teacherData.name"></el-input>
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="teacherData.sort"
                         :min="0" />
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="teacherData.level"
                   placeholder="请选择讲师头衔">
          <el-option v-for="item in levels"
                     :value="item.value"
                     :label="item.label"
                     :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="teacherData.career"></el-input>
      </el-form-item>

      <el-form-item label="讲师介绍">
        <el-input type="textarea"
                  v-model="teacherData.intro"></el-input>
      </el-form-item>

      <el-form-item label="上传头像">
        <el-upload class="avatar-uploader"
                   :action="actionUrl"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload">
          <img v-if="teacherData.avatar"
               :src="teacherData.avatar"
               class="avatar">
          <img v-else-if="uploadAvatar"
               :src="uploadAvatar"
               class="avatar"
               alt="">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="saveOrUpdate">保存</el-button>
        <el-button @click="backToList">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      teacherData: {
        sort: 0,
        avatar: '',
      },
      // 由于level为int类型，需要自定义option来保证初始化时显示label中的内容
      levels: [
        {
          value: 1,
          label: '高级讲师',
        },
        {
          value: 2,
          label: '首席讲师',
        },
      ],
      uploadAvatar: '',
      actionUrl: process.env.VUE_APP_BASE_API + '/oss/file',
    }
  },
  components: {},
  created() {
    // 备注：vue-admin-template 更新中在 AppMain.vue 中为路由显示添加了 key 属性
    // 并使用路由路径作为每个路由的 key , 因此在组件复用时提供了默认执行 created 钩子的支持
    this.initByPath()
  },
  methods: {
    initByPath() {
      if (this.$route.params && this.$route.params.id) {
        this.getTeacherById(this.$route.params.id)
      } else {
        // 若同组件路由跳转，会导致组件没有进行实际切换而残留数据
        // 故需要根据情况做数据清理
        this.teacherData = {}
      }
    },

    saveOrUpdate() {
      // 保存按钮的统一入口，判断是更新还是添加
      this.$refs.teacher.validate((data) => {
        if (data) {
          if (this.teacherData.id) {
            this.updateTeacher()
          } else {
            this.saveTeacher()
          }
        }
      })
    },

    getTeacherById(id) {
      teacher
        .getTeacherById(id)
        .then((result) => {
          this.teacherData = result.data.items
        })
        .catch((err) => {
          console.log(err)
        })
    },

    saveTeacher() {
      teacher
        .saveTeacher(this.teacherData)
        .then(() => {
          this.$message({
            type: 'success',
            message: '添加成功',
          })
        })
        .catch((err) => {
          console.log(err)
        })
      this.backToList()
    },

    updateTeacher() {
      this.teacherData.gmtModified = null
      teacher
        .updateTeacher(this.teacherData)
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功',
          })
        })
        .catch((err) => {
          console.log(err)
        })
      this.backToList()
    },

    backToList() {
      this.$router.push('/teacher/table')
    },

    handleAvatarSuccess(res) {
      this.uploadAvatar = res.data.url
      this.teacherData.avatar = res.data.url
      this.$message({
        message: 'uploaded',
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt20M = file.size / 1024 / 1024 < 20

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!')
      }
      return (isJPG || isPNG) && isLt20M
    },
  },
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>