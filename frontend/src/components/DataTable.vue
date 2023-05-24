<script>
export default {
  props: ['tableData'],
  methods: {
    copyText(text) {
      this.$emit('copyText', text);
    },
  },
};
</script>
<template>
  <el-table
    :data="this.tableData"
    stripe
    border
    style="width: 80%"
    class="data-table"
  >
    <el-table-column prop="Region" label="Region"> </el-table-column>
    <el-table-column prop="Town / Township" label="Town / Township">
    </el-table-column>
    <el-table-column
      prop="Quarter / Village Tract"
      label="Quarter / Village Tract"
    >
    </el-table-column>
    <el-table-column prop="Postal Code" label="Postal Code">
      <template slot-scope="scope">
        <div @click="copyText(scope.row[scope.column.property])">
          {{ scope.row[scope.column.property] }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
