<template>
  <div class="app-container">
    <el-form :inline="true"
             :model="courseQuery"
             class="demo-form-inline">

      <el-form-item label="标题">
        <el-input v-model="courseQuery.title"
                  placeholder="课程标题"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="courseQuery.status"
                   placeholder="课程状态">
          <el-option label="已发布"
                     value="Normal"></el-option>
          <el-option label="未发布"
                     value="Draft"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="getList()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list"
              stripe
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              style="width: 100%">
      <el-table-column label="序号">
        <template v-slot="slotProps">
          {{ (page - 1) * limit + slotProps.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="标题"
                       prop="title" />
      <el-table-column label="发布状态">
        <template v-slot="slotProps">
          {{ slotProps.row.status === 'Normal' ? '已发布' : '未发布' }}
        </template>
      </el-table-column>
      <el-table-column label="总课时"
                       prop="lessonNum" />
      <el-table-column label="点击量"
                       prop="viewCount" />
      <el-table-column label="价格"
                       prop="price" />
      <el-table-column label="创建时间"
                       prop="gmtCreate" />
      <el-table-column label="操作">
        <template v-slot="slotProps">
          <router-link :to="'/course/Info/' + slotProps.row.id">
            <el-button type="primary"
                       icon="el-icon-edit"
                       circle></el-button>
          </router-link>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     @click="deleteCourse(slotProps.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="total, prev, pager, next, jumper"
                   background
                   :total="total"
                   :current-page="page"
                   :page-size="limit"
                   style="text-align: center; padding: 30px 0;"
                   @current-change="getList">
    </el-pagination>
  </div>
</template>

<script>
import course from '@/api/edu/course'
export default {
  name: '',
  data() {
    return {
      courseQuery: {},
      list: null,
      total: null,
      page: 1,
      limit: 10,
    }
  },

  components: {},

  created() {
    this.getList()
  },

  methods: {
    getList(page = 1) {
      this.page = page
      course.getPage(this.page, this.limit, this.courseQuery).then((result) => {
        this.list = result.data.items
        this.total = result.data.total
      })
    },

    clear() {
      this.courseQuery = {}
      this.getList()
    },

    deleteCourse(id) {
      this.$confirm('此操作将永久删除该课程，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          course.deleteCourse(id).then(() => {
            this.$message({
              message: '删除成功！',
              type: 'success',
            })
            this.getList()
          })
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info',
          })
        })
    },
  },
}
</script>
<style>
</style>