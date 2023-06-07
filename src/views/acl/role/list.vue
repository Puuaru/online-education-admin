<template>
  <div class="app-container">
    <!-- 输入查询 -->
    <!-- 添加按钮 -->
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
        <!-- TODO: 这里需要做一次前端鉴权 -->
        <template slot-scope="cur">
          <!-- 修改角色权限列表 -->
          <router-link :to="`perm-manager/${cur.row.id}`" style="margin-right: 12px;">
            <el-button type="info" size="mini" icon="el-icon-lock" />
          </router-link>
          <!-- 修改角色属性 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="openDiagram('update', cur.row)"
          />
          <!-- 删除角色 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteRoleById(cur.row.id)"
          />
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
    <!-- 角色属性修改表单 -->
    <el-dialog
      :visible="dialogVisible"
      :title="dialogTitle"
      :before-close="refreshData"
    >
      <el-form :model="role" ref="role">
        <el-form-item label="角色名称" prop="roleName" label-width="120px">
          <el-input v-model="role.roleName" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" label-width="120px">
          <el-input v-model="role.remark" auto-complete="on"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="refreshData">取消</el-button>
        <el-button @click="dialogConfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
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
      dialogVisible: false,
      dialogTitle: "",
      // role update
      role: {
        id: "",
        remark: "",
      },
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

    async updateRole() {
      this.role.gmtModified = "";
      try {
        const result = await roleApis.updateRole(this.role);
        if (result.code !== 200) {
          Message({
            message: result.msg,
            type: "error",
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
    },

    async addRole() {
      try {
        const result = await roleApis.addRole(this.role);
        if (result.code !== 200) {
          Message({
            message: result.msg,
            type: "error",
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
    },

    async dialogConfirm() {
      await this.$refs.role.validate((valid) => {
        if (valid) {
          if (this.role.id) {
            this.updateRole();
          } else {
            this.addRole();
          }
        }
      });
      setTimeout(this.refreshData, 250);
      // this.refreshData();
    },

    refreshData() {
      this.pageInfo = {};
      this.nameQuery = "";
      this.dialogVisible = false;
      this.getRoleCondition();
    },

    openDiagram(type, data) {
      switch (type) {
        case "update":
          this.role = data;
          this.dialogTitle = "修改角色";
          break;
        case "add":
          this.dialogTitle = "新增角色";
          break;
      }
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped></style>
