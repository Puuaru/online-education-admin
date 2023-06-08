<template>
  <div class="app-container">
    <el-tree
      :data="permissions"
      :props="treeProps"
      node-key="id"
      default-expand-all
      show-checkbox
      ref="tree"
      :default-checked-keys="rolePermissions"
    ></el-tree>
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
      rolePermissions: [],
      treeProps: {
        children: "children",
        label: "name",
      },
    };
  },

  created() {
    this.roleId = this.$route.params.id;
    this.getPermissions();
    // setTimeout(this.getRolePermissions, 500)
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
        originData.forEach(item => {
          if(item.type === 2) {
            this.rolePermissions.push(item.id.toString());
          }
        })
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
  },
};
</script>

<style></style>
