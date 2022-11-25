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
                     ::key="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacherData.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师介绍">
        <el-input type="textarea"
                  v-model="teacherData.intro"></el-input>
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
    }
  },
  components: {},
  created() {
    this.initByPath()
  },
  methods: {
    initByPath() {
      if (this.$route.params && this.$route.params.id) {
        this.getTeacherById(this.$route.params.id)
      } else {
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
      //   teacherData.gmtCreate = null
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
  },
}
</script>
<style scoped lang="less">
</style>