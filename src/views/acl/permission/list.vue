<template>
  <div class="app-container">
    <el-table
      :data="permissions"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="path" label="访问路径"></el-table-column>
      <el-table-column prop="component" label="组件路径"></el-table-column>
      <el-table-column prop="permissionValue" label="权限值"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="operation">
          <!-- 添加菜单 -->
          <el-button
            v-if="operation.row.level === 0 || operation.row.level === 1"
            @click="openDialogForAppend('menu', operation.row.id)"
            type="success"
            size="mini"
            icon="el-icon-circle-plus"
          ></el-button>

          <!-- 添加功能 -->
          <el-button
            v-if="operation.row.level === 2"
            @click="openDialogForAppend('permission', operation.row.id)"
            type="success"
            size="mini"
            icon="el-icon-circle-plus-outline"
          ></el-button>

          <!-- 修改菜单 -->
          <el-button
            v-if="operation.row.level === 1 || operation.row.level === 2"
            @click="openDialogForUpdate('menu', operation.row)"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>

          <!-- 修改功能 -->
          <el-button
            v-if="operation.row.level === 3"
            @click="openDialogForUpdate('permission', operation.row)"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>

          <!-- 删除 -->
          <el-button
            v-if="operation.row.level !== 0"
            @click="remove(operation.row.id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增菜单表单 -->
    <el-dialog title="菜单编辑" :visible.sync="menuEditVisible" width="30%">
      <el-form ref="menuForm" :model="currentMenu" :rules="menuValidateRules">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="currentMenu.name" />
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="currentMenu.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="currentMenu.component" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="resetData">取消</el-button>
        <el-button type="primary" @click="submitMenuForm()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 新增权限表单 -->
    <el-dialog
      title="权限功能编辑"
      :visible.sync="permissionEditVisible"
      width="30%"
    >
      <el-form
        ref="permissionForm"
        :model="currentPermission"
        :rules="permissionValidateRules"
      >
        <el-form-item label="权限功能名称" prop="name">
          <el-input v-model="currentPermission.name" />
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input v-model="currentPermission.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="currentPermission.component" />
        </el-form-item>
        <el-form-item label="权限值" prop="permissionValue">
          <el-input v-model="currentPermission.permissionValue" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="resetData">取消</el-button>
        <el-button type="primary" @click="submitPermissionForm()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permissionApi from "@/api/acl/permission";

export default {
  data() {
    return {
      permissions: [],
      currentMenu: {},
      currentPermission: {},
      menuEditVisible: true,
      permissionEditVisible: false,
      menuValidateRules: {
        name: [{ required: true, trigger: blur, message: "必须输入菜单名" }],
        path: [
          { required: true, trigger: blur, message: "必须输入菜单访问路径" },
        ],
      },
      permissionValidateRules: {
        name: [{ required: true, trigger: blur, message: "必须输入功能名" }],
        permisssionValue: [
          { required: true, trigger: blur, message: "必须输入权限值" },
        ],
      },
    };
  },

  created() {
    this.getPermissionList();
    this.resetData();
  },

  methods: {
    getPermissionList() {
      permissionApi.list().then((result) => {
        this.permissions = result.data.items;
      });
    },

    remove(permissionId) {
      this.$confirm("当前操作将删除此记录及其全部子记录，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        permissionApi.remove(permissionId).then(() => {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.resetData();
          this.getPermissionList();
        });
      });
    },

    update(permission) {
      permission.gmtCreate = "";
      permission.gmtModified = "";
      permissionApi.update(permission).then(() => {
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.resetData();
        this.getPermissionList();
      });
    },

    save(permission) {
      permissionApi
        .add(permission)
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.resetData();
          this.getPermissionList();
        })
        .catch((reason) => {
          console.log(reason);
          this.$message({
            type: "info",
            message: "添加失败",
          });
        });
    },

    openDialogForUpdate(flag, data) {
      switch (flag) {
        case "menu":
          this.menuEditVisible = true;
          this.currentMenu = data;
          break;
        case "permission":
          this.permissionEditVisible = true;
          this.currentPermission = data;
          break;
      }
    },

    openDialogForAppend(flag, parentId) {
      switch (flag) {
        case "menu":
          this.menuEditVisible = true;
          this.currentMenu.pid = parentId;
          break;
        case "permission":
          this.permissionEditVisible = true;
          this.currentPermission.pid = parentId;
          break;
      }
    },

    resetData() {
      this.currentMenu = this.generateTemplateData("menu");
      this.currentPermission = this.generateTemplateData("permission");
      this.menuEditVisible = false;
      this.permissionEditVisible = false;
    },

    submitMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (!this.currentMenu.id) {
            this.save(this.currentMenu);
          } else {
            this.update(this.currentMenu);
          }
        }
      });
    },

    submitPermissionForm() {
      this.$refs.permissionForm.validate((valid) => {
        if (valid) {
          if (!this.currentPermission.id) {
            // 添加新功能
            this.save(this.currentPermission);
          } else {
            // 更新已有功能
            this.update(this.currentPermission);
          }
        }
      });
    },

    generateTemplateData(type) {
      let template = {
        pid: 0,
        name: "",
        path: "",
        component: "",
      };
      switch (type) {
        case "menu":
          template.type = 1;
          break;
        case "permission":
          template.type = 2;
          break;
      }
      return template;
    },
  },
};
</script>

<style>
.dialog-footer {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}

.app-container {
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
