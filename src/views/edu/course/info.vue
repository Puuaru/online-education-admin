<template>
  <div class="app-container">
    <h2 style="text-align: center">编辑课程</h2>

    <el-steps :active="active"
              finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-form :model="courseInfo"
             ref="info"
             label-width="200px"
             style="width: 65%"
             :rules="rules">
      <el-form-item label="课程标题"
                    prop="title">
        <el-input v-model="courseInfo.title"
                  placeholder="请输入课程标题" />
      </el-form-item>

      <el-form-item label="课程分类"
                    prop="subjectId">
        <el-cascader :options="subjectList"
                     :props="defaultProps"
                     v-model="courseInfo.subjectId"
                     @change="handleChange"
                     placeholder="请选择课程分类"></el-cascader>
      </el-form-item>

      <el-form-item label="课程讲师"
                    prop="teacherId">
        <el-select v-model="courseInfo.teacherId"
                   placeholder="请选择课程讲师">
          <el-option :label="teacher.name"
                     :value="teacher.id"
                     :key="teacher.id"
                     v-for="teacher in teacherList"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number v-model="courseInfo.lessonNum"
                         :min="0" />
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price"
                         :min="0"
                         placeholder="请输入课程价格" />
      </el-form-item>
      <!-- 课程描述 -->
      <el-form-item label="课程描述">
        <tinymce :height="300"
                 v-model="courseInfo.description" />
      </el-form-item>
      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload class="avatar-uploader"
                   :action="actionUrl"
                   :show-file-list="false"
                   :on-success="handleCoverSuccess"
                   :on-preview="beforeCoverUpload"
                   accept="image/*">
          <img v-if="courseInfo.cover"
               :src="courseInfo.cover"
               width="100%"
               height="100%"
               class="cover">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-form label-width="200px">
      <el-form-item>
        <el-button style="margin-top: 12px;"
                   @click="next"
                   type="primary"
                   icon="el-icon-right">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import tinymce from '@/components/Tinymce'

export default {
  data() {
    return {
      active: 0,
      actionUrl: process.env.VUE_APP_BASE_API + '/oss/file',
      courseInfo: {
        id: '',
        title: '',
        lessonNum: '',
        price: '',
        description: '',
        teacherId: '',
        cover: '',
        subjectId: '',
        subjectParentId: '',
      },
      teacherList: [],
      subjectList: [],
      rules: {
        title: [{ required: true, trigger: 'blur', message: '标题必须输入' }],
        teacherId: [
          { required: true, trigger: 'blur', message: '必须选择一个讲师' },
        ],
        subjectId: [
          { required: true, trigger: 'blur', message: '必须选择分类' },
        ],
      },
      defaultProps: {
        value: 'id',
        children: 'children',
        label: 'title',
        expandTrigger: 'click',
      },
    }
  },

  components: { tinymce },

  created() {
    this.getTeacher()
    this.getSubject()
  },

  methods: {
    getTeacher() {
      course.getAllTeachaer().then((result) => {
        this.teacherList = result.data.items
      })
    },

    getSubject() {
      subject.getSubjectList().then((result) => {
        this.subjectList = this.getTreeData(result.data.items)
      })
    },

    getTreeData(data) {
      // 递归判断, 将最后一层的children空数组置为undefined
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length === 0) {
          data[i].children = undefined
        } else {
          this.getTreeData(data[i].children)
        }
      }
      return data
    },

    next() {
      this.$refs.info.validate((data) => {
        if (data) {
          if (this.$route.params && this.$route.params.id) {
            // 当有id时进行update操作
            // TODO
          } else {
            course.saveCourseInfo(this.courseInfo).then((result) => {
              this.$router.push({
                path: '/course/chapter/' + result.data.id,
              })
            })
          }
        }
      })
    },

    handleCoverSuccess(result) {
      this.courseInfo.cover = result.data.url
    },

    beforeCoverUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('大小不能超过20M')
      }
      return isLt20M
    },

    handleChange(data) {
      this.courseInfo.subjectParentId = data[0]
      this.courseInfo.subjectId = data[1]
    },
  },
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>