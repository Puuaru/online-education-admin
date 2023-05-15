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
            @click="addMenu"
            type="success"
            size="mini"
            icon="el-icon-circle-plus"
          ></el-button>

          <!-- 添加功能 -->
          <el-button
            v-if="operation.row.level === 2"
            @click="addFeat"
            type="success"
            size="mini"
            icon="el-icon-circle-plus-outline"
          ></el-button>

          <!-- 修改菜单 -->
          <el-button
            v-if="operation.row.level === 1 || operation.row.level === 2"
            @click="updateMenu"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>

          <!-- 修改功能 -->
          <el-button
            v-if="operation.row.level === 3"
            @click="updateFeat"
            type="success"
            size="mini"
            icon="el-icon-edit"
          ></el-button>

          <!-- 删除 -->
          <el-button
            v-if="operation.row.level !== 0"
            @click="deleteAny"
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
        <el-button>取消</el-button>
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
          <el-input :model="currentPermission.name" />
        </el-form-item>
        <el-form-item label="访问路径" prop="path">
          <el-input :model="currentPermission.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input :model="currentPermission.component" />
        </el-form-item>
        <el-form-item label="权限值" prop="permissionValue">
          <el-input :model="currentPermission.component" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitPermissionForm()"
          >提交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permissionApi from "@/api/acl/permission";

const menuInit = {
  pid: 0,
  type: 1,
  name: "",
  path: "",
  component: "",
};
const permissionInit = {
  pid: 0,
  type: 2,
};

export default {
  data() {
    return {
      permissions: [],
      currentMenu: menuInit,
      currentPermission: permissionInit,
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
    console.log(this.permissions);
  },

  methods: {
    getPermissionList() {
      permissionApi.list().then((result) => {
        this.permissions = result.data.items;
      });
    },

    // 用以标识和测试的方法
    addMenu() {
      console.log("add menu");
    },
    addFeat() {
      console.log("add feat");
    },
    deleteAny() {
      console.log("delete");
    },
    updateMenu() {
      console.log("update menu");
    },
    updateFeat() {
      console.log("update feat");
    },
    submitPermissionForm() {
      this.$refs.permissionForm.validate((valid) => {
        if (valid) {
          if (!this.currentPermission.id) {
            console.log(this.currentPermission);
          }
        }
      });
    },
    submitMenuForm() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (!this.currentPermission.id) {
            console.log(this.currentMenu);
          }
        }
      });
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
