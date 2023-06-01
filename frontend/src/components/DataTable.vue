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
    :default-sort="{ prop: 'Quarter / Village Tract', order: 'asc' }"
    stripe
    border
    height="540"
    class="data-table"
  >
    <!-- Scoped slot for empty table body -->
    <template v-slot:empty>
      <el-table-column>
        <el-empty />
      </el-table-column>
    </template>

    <el-table-column prop="Region" :label="$t('table.region')" sortable>
    </el-table-column>
    <el-table-column
      prop="Town / Township"
      :label="$t('table.townOrTwnsp')"
      sortable
    >
    </el-table-column>

    <el-table-column
      prop="Quarter / Village Tract"
      :label="$t('table.quarterOrVillageTract')"
      sortable
    >
    </el-table-column>

    <el-table-column
      prop="Postal Code"
      :label="$t('table.postalCode')"
      sortable
    >
      <template slot-scope="scope">
        <el-tooltip
          effect="light"
          :content="$t('table.tooltip.content')"
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
