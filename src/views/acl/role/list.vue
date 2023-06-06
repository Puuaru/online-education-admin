<template>
  <div class="app-container">
    <!-- 输入查询 -->
    <!-- 列出数据 -->
    <el-table :data="pageInfo.items" border>
      <el-table-column label="序号">
        <template slot-scope="cur">
          {{ (currentPage - 1) * limit + cur.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="角色名" prop="roleName"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作">
        <!-- 这里需要做一次前端鉴权 -->
        <template slot-scope="cur">
          <!-- 修改角色权限列表 -->
          <!-- 修改角色属性 -->
          <!-- 删除角色 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteRoleById(cur.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="limit"
      :currentPage="currentPage"
      :total="pageInfo.total"
      layout="total, prev, pager, next, jumper"
      style="padding: 32px 0; text-align: center"
    />
  </div>
</template>

<script>
import roleApis from "@/api/acl/role";
import { Message } from "element-ui";
// code...
export default {
  data() {
    return {
      currentPage: 1,
      limit: 10,
      nameQuery: "",
      pageInfo: {}, // items: 实际数据；total: 数据总量
    };
  },

  created() {
    this.getRoleCondition();
  },

  methods: {
    async getRoleCondition(newPage = 1) {
      try {
        const result = await roleApis.getRoleCondition(
          newPage,
          this.limit,
          this.nameQuery
        );
        this.pageInfo = result.data.items;
        this.currentPage = newPage;
        console.log(this.pageInfo);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteRoleById(roleId) {
      await this.$confirm("此操作将永久删除角色，是否继续？", "警告", {
        confirmButtonText: "确认删除",
        cancelButtonTest: "取消",
        type: "warning",
      });

      try {
        const result = await roleApis.deleteRoleById(roleId);
        if (result.code !== 200) {
          Message({
            message: result.msg,
            type: "warning",
          });
        } else {
          Message({
            message: "操作成功",
            type: "success",
          });
        }
      } catch (error) {
        console.log(error);
        Message({
          message: error,
          type: "error",
        });
      }

      this.refreshData();
    },

    refreshData() {
      this.pageInfo = {};
      this.nameQuery = "";
      this.getRoleCondition();
    },
  },
};
</script>

<style scoped>
/* code... */
</style>
