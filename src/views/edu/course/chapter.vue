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
               @click="chapterOpenAdd()"
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
        <el-button type="primary"
                   @click="chapterDialogPost()">确定</el-button>
      </div>
    </el-dialog>

    <!-- 小节信息弹框 -->
    <!-- TODO -->
    <el-dialog title="小节信息填写"
               :visible.sync="dialogVideo">
      <el-form :model="video"
               ref="video"
               label-width="120px"
               :rules="videoRules">
        <el-form-item label="小节标题"
                      prop="title">
          <el-input v-model="video.title"></el-input>
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort"
                           :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频"></el-form-item>
      </el-form>
      <div class="dialog-footer"
           slot="footer">
        <el-button @click="dialogVideo = false">取消</el-button>
        <el-button type="primary"
                   @click="videoDialogPost()">确定</el-button>
      </div>
    </el-dialog>

    <el-tree :data="courseDetails"
             ref="tree"
             default-expand-all
             node-key="id"
             :props="defaultProps"
             show-checkbox
             :expand-on-click-node="false">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="custom-tree-button">

          <!-- 针对章节的按钮 -->
          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-plus"
                     size="mini"
                     @click="videoOpenAdd(data)">添加小节</el-button>

          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-edit"
                     size="mini"
                     @click="chapterOpenEdit(data)">修改章节</el-button>

          <el-button type="text"
                     v-if="!data.isVideo"
                     icon="el-icon-delete"
                     size="mini"
                     @click="removeChapter(data)">删除章节</el-button>

          <!-- 针对小节的按钮 -->
          <el-button type="text"
                     v-if="data.isVideo"
                     icon="el-icon-edit"
                     size="mini"
                     @click="videoOpenEdit(data)">修改小节</el-button>

          <el-button type="text"
                     v-if="data.isVideo"
                     icon="el-icon-delete"
                     size="mini"
                     @click="removeVideo(data)">删除小节</el-button>
        </span>
      </span>
    </el-tree>

    <el-form label-width="120px"
             style="text-align:center">
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
import video from '@/api/edu/video'

export default {
  name: '',
  data() {
    return {
      disableSaveButton: false,
      active: 1,
      chapter: {
        // 当前正在操作的chapter数据
        title: '',
        sort: 0,
      },
      video: {
        // 当前正在操作的video数据
        title: '',
        sort: 0,
        isFree: 1,
      },
      courseDetails: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      // 弹框是否显示
      dialogChapter: false,
      dialogVideo: false,
      chapterRules: {
        title: [
          { require: true, trigger: 'blur', message: '章节标题必须输入' },
        ],
      },
      videoRules: {
        title: [
          { require: true, trigger: 'blur', message: '小节标题必须输入' },
        ],
      },
    }
  },

  components: {},

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.chapter.courseId = this.$route.params.id
      this.video.courseId = this.$route.params.id
      this.getCourseDetails(this.chapter.courseId)
    }
  },

  methods: {
    next() {
      this.$router.push({
        path: '/course/publish/' + this.chapter.courseId,
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
            // 为小节（视频）加标识
            this.courseDetails[i].children[j].isVideo = true
          }
        }
      })
    },

    // ============ 章节操作 ============
    removeChapter(data) {
      this.$confirm('此操作将永久删除该章节及其全部小节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          chapter.deleteChapter(data.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功！',
            })
            this.getCourseDetails(this.chapter.courseId)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    updateChapter() {
      chapter.updateChapter(this.chapter).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！',
        })
        this.getCourseDetails(this.chapter.courseId)
      })
    },

    saveChapter() {
      chapter.saveChapter(this.chapter).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功！',
        })
        this.getCourseDetails(this.chapter.courseId)
      })
    },

    chapterDialogPost() {
      this.$refs.chapter.validate((data) => {
        if (data) {
          this.chapter.gmtCreate = null
          this.chapter.gmtModified = null
          if (this.chapter.id) {
            this.updateChapter()
          } else {
            this.saveChapter()
          }
          this.dialogChapter = false
          // TODO: 若将清空表单数据的操作放在这个函数下会出现线程同步问题
        }
      })
    },

    chapterOpenEdit(data) {
      this.dialogChapter = true
      // 获取选中的chapter数据
      chapter.getChapter(data.id).then((result) => {
        this.chapter = result.data.items
      })
    },

    chapterOpenAdd() {
      // 清空表单数据
      this.chapter.title = ''
      this.chapter.sort = 0
      // 弹框
      this.dialogChapter = true
    },

    // ============ 小节操作 ============
    removeVideo(data) {
      this.$confirm('此操作将永久删除该小节，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          video.deleteVideo(data.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功！',
            })
            this.getCourseDetails(this.chapter.courseId)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    updateVideo() {
      video.updateVideo(this.video).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！',
        })
        this.getCourseDetails(this.chapter.courseId)
      })
    },

    saveVideo() {
      video.saveVideo(this.video).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功！',
        })
        this.getCourseDetails(this.chapter.courseId)
      })
    },

    videoDialogPost() {
      this.$refs.video.validate((data) => {
        if (data) {
          // TODO: 视频上传
          this.video.gmtCreate = null
          this.video.gmtModified = null
          if (this.video.id) {
            this.updateVideo()
          } else {
            this.saveVideo()
          }
          this.dialogVideo = false
        }
      })
    },

    videoOpenEdit(data) {
      this.dialogVideo = true
      video.getVideo(data.id).then((result) => {
        this.video = result.data.items
      })
    },

    videoOpenAdd(data) {
      this.video.title = ''
      this.video.sort = 0
      this.video.chapterId = data.id
      this.dialogVideo = true
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