<script>
export default {
  data() {
    return {
      tooltipContent: 'Click to copy',
    };
  },
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
    :default-sort="{ prop: 'Quarter / Village Tract', order: 'asc' }"
    stripe
    border
    height="540"
    class="data-table"
  >
    <el-table-column prop="Region" label="Region" sortable> </el-table-column>
    <el-table-column prop="Town / Township" label="Town / Township" sortable>
    </el-table-column>
    <el-table-column
      prop="Quarter / Village Tract"
      label="Quarter / Village Tract"
      sortable
    >
    </el-table-column>
    <el-table-column prop="Postal Code" label="Postal Code" sortable>
      <template slot-scope="scope">
        <el-tooltip
          effect="light"
          :content="tooltipContent"
          placement="right"
          popper-class="my-tooltip"
        >
          <div @click="copyText(scope.row[scope.column.property])">
            {{ scope.row[scope.column.property] }}
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>
