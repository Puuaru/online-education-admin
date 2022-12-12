<template>
  <div class="app-container">
    <h2 style="text-align: center">编辑课程</h2>

    <el-steps :active="active"
              finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-button type="text"
               @click="dialogChapter = true"
               icon="el-icon-plus">添加章节</el-button>

    <!-- 章节信息弹框 -->
    <el-dialog title="章节信息填写"
               :visible.sync="dialogChapter">
      <el-form :model="chapter"
               ref="chapter"
               label-width="120px"
               :rules="chapterRules">
        <el-form-item label="章节标题"
                      prop="title">
          <el-input v-model="chapter.title"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort"
                           :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div class="dialog-footer"
           slot="footer">
        <el-button @click="dialogChapter = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>

    <!-- 小节信息弹框 -->
    <el-dialog title="小节信息填写"
               :visible.sync="dialogVideo"></el-dialog>

    <el-tree :data="courseDetails"
             ref="tree"
             default-expand-all
             node-key="id"
             :props="defaultProps"
             expand-on-click-node="false">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="custom-tree-button">
          <!-- 针对章节的按钮 -->
          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-plus"
                     size="mini">添加小节</el-button>

          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-edit"
                     size="mini">修改章节</el-button>

          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-delete"
                     size="mini">删除章节</el-button>

          <!-- 针对小节的按钮 -->
          <el-button type="text"
                     v-if="data.isVideo"
                     icon="el-icon-edit"
                     size="mini">修改小节</el-button>

          <el-button type="text"
                     v-if="data.isVideo"
                     icon="el-icon-delete"
                     size="mini">删除小节</el-button>
        </span>
      </span>
    </el-tree>

    <el-form label-width="120px">
      <el-form-item>
        <el-button style="margin-top: 12px;"
                   @click="previous"
                   type="primary"
                   icon="el-icon-back">上一步</el-button>

        <el-button style="margin-top: 12px;"
                   @click="next"
                   type="primary"
                   icon="el-icon-right">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter'
export default {
  name: '',
  data() {
    return {
      active: 1,
      chapter: {},
      courseDetails: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      dialogChapter: false,
      dialogVideo: false,
      chapterRules: {
        title: [
          { require: true, trigger: 'blur', message: '章节标题必须输入' },
        ],
      },
    }
  },
  components: {},
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.chapter.courseId = this.$route.params.id
      this.getCourseDetails(this.chapter.courseId)
    }
  },
  methods: {
    next() {
      this.$router.push({
        path: '/course/publish/' + '1',
      })
    },
    previous() {
      if (this.$route.params && this.$route.params.id) {
        // 当有id时进行update操作
        // TODO
        this.$router.push({
          path: '/course/info/' + this.$route.params.id,
        })
      }
    },
    getCourseDetails(courseId) {
      chapter.getChapterVideo(courseId).then((result) => {
        this.courseDetails = result.data.items
        for (let i = 0; i < this.courseDetails.length; i++) {
          for (let j = 0; j < this.courseDetails[i].children.length; j++) {
            // 为视频加标识
            this.courseDetails[i].children[j].isVideo = true
          }
        }
      })
    },
  },
}
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-right: 8px;
}
</style>