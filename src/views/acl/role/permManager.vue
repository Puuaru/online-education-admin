<template>
  <div class="app-container">
    <el-tree
      :data="permissions"
      :props="treeProps"
      node-key="id"
      default-expand-all
      show-checkbox
      ref="tree"
      :default-checked-keys="permissionIdsCheckedKeys"
    ></el-tree>
    <el-button type="primary" @click="save">保存</el-button>
    <router-link to="../list" style="margin-left: 12px;">
      <el-button>返回</el-button>
    </router-link>
  </div>
</template>

<script>
import roleApis from "@/api/acl/role";
import permissionApis from "@/api/acl/permission";
import { Message } from "element-ui";

export default {
  data() {
    return {
      roleId: "",
      permissions: [],
      oldPermissionIds: [],
      permissionIdsCheckedKeys: [],
      treeProps: {
        children: "children",
        label: "name",
      },
    };
  },

  created() {
    this.roleId = this.$route.params.id;
    this.getPermissions();
    this.getRolePermissions();
  },

  methods: {
    async getRolePermissions() {
      try {
        const result = await roleApis.getRolePermissions(this.roleId);
        if (result.code !== 200) {
          throw new Error("获取角色的权限列表失败");
        }
        const originData = result.data.items;
        originData.forEach((item) => {
          this.oldPermissionIds.push(item.id.toString());
          if (item.type === 2) {
            this.permissionIdsCheckedKeys.push(item.id.toString());
          }
        });
      } catch (error) {
        console.log(error);
        Message({
          message: error,
          type: "error",
        });
      }
    },

    async getPermissions() {
      try {
        const result = await permissionApis.list();
        if (result.code !== 200) {
          throw new Error("获取权限列表失败");
        }
        this.permissions = result.data.items;
      } catch (error) {
        console.log(error);
        Message({
          message: error,
          type: "error",
        });
      }
    },

    async save() {
      const selectedPermissions = this.$refs.tree.getCheckedNodes(false, true);
      const newIds = selectedPermissions.map((item) => {
        return item.id;
      });
      console.log(newIds);
      try {
        const result = await roleApis.alterPermissionsForRole(
          this.roleId,
          newIds
        );
        console.log(result);
        Message({
          message: "操作成功",
          type: "success",
        });
      } catch (error) {
        Message({
          message: error,
          type: "error",
        });
      }
    },
  },
};
</script>

<style></style>
