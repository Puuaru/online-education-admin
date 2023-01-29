<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键字过滤"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subject from "@/api/edu/subject";

export default {
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "title",
      },
      data: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getSubjectList();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getSubjectList() {
      subject.getSubjectList().then((response) => {
        this.data = response.data.items;
      });
    },
  },
};
</script>
