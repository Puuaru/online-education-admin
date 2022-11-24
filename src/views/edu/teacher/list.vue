<template>
  <div class="app-container">
    <h2>教师列表</h2>

    <el-form :inline="true"
             :model="teacherQuery"
             class="demo-form-inline">

      <el-form-item label="教师姓名">
        <el-input v-model="teacherQuery.name"
                  placeholder="教师姓名"></el-input>
      </el-form-item>

      <el-form-item label="教师头衔">
        <el-select v-model="teacherQuery.level"
                   placeholder="教师头衔">
          <el-option label="高级教师"
                     value="1"></el-option>
          <el-option label="首席教师"
                     value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-col :span="11">
          <el-date-picker type="datetime"
                          v-model="teacherQuery.begin"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          default-time="00:00:00"
                          placeholder="开始时间"
                          style="width: 100%">
          </el-date-picker>
        </el-col>

        <el-col class="line"
                :span="2"
                style="text-align:center">-</el-col>

        <el-col :span="11">
          <el-date-picker type="datetime"
                          v-model="teacherQuery.end"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          default-time="00:00:00"
                          placeholder="截止时间"
                          style="width: 100%">
          </el-date-picker>
        </el-col>
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

      <el-table-column label="姓名"
                       prop="name" />
      <el-table-column label="介绍"
                       prop="intro" />
      <el-table-column label="头衔">
        <template v-slot="slotProps">
          {{ slotProps.row.level === 1 ? '高级教师' : '首席教师' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       prop="gmtCreate" />
      <el-table-column label="修改时间"
                       prop="gmtModified" />
      <el-table-column label="操作">
        <template v-slot="slotProps">
          <router-link :to="'/teacher/edit' + slotProps.row.id">
            <el-button type="primary"
                       icon="el-icon-edit"
                       circle></el-button>
          </router-link>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     @click="deleteTeacherById(slotProps.row.id)"></el-button>
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
import teacher from '@/api/edu/teacher'

export default {
  name: '',
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: null,
      teacherQuery: {},
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((result) => {
          this.list = result.data.items
          this.total = result.data.total
        })
        .catch((err) => {
          console.log(err)
          console.log(this.teacherQuery)
        })
    },

    deleteTeacherById(id) {
      this.$confirm('此操作会导致该记录被永久删除，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          teacher
            .deleteTeacher(id)
            .then(() => {
              this.$message({
                type: 'success',
                message: '删除成功',
              })
              this.getList(this.page)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    clear() {
      // 清空查询条件
      this.teacherQuery = {}
      this.getList()
    },
  },
}
</script>
<style scoped lang="less">
</style>