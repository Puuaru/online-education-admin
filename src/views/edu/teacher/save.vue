<template>
  <div class="">

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
    }
  },
  components: {},
  created() {},
  methods: {
    initByPath() {
      if (this.$route.params && this.$route.params.id) {
        this.getTeacherById(this.$route.params.id)
      } else {
        this.teacherData = {}
      }
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
    },

    updateTeacher() {
      teacherData.gmtCreate = null
      teacherData.gmtModified = null
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
      this.$router.push('/teacher/table')
    },
  },
}
</script>
<style scoped lang="less">
</style>