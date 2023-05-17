<script>
import axios from 'axios';

export default {
  name: 'SearchForm',
  data() {
    return {
      keyword: '',
      tableData: [],
    };
  },
  methods: {
    search() {
      if (this.keyword) {
        axios
          .get(import.meta.env.VITE_BASE_URL, {
            params: this.axiosParams,
          })
          .then((res) => {
            this.tableData = res.data.result;
            // console.log('res', res);
          })
          .catch((error) => {
            console.error('err', error);
          });
      }

      this.tableData = [];
    },
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('keyword', this.keyword);
      params.append('lang', 'en');
      return params;
    },
  },
};
</script>

<template>
  <div class="search-form">
    <el-input
      placeholder="Type something"
      v-model="keyword"
      prefix-icon="el-icon-search"
      clearable
      @input="search"
    >
    </el-input>

    <el-table
      :data="tableData"
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
      <el-table-column
        prop="Postal Code"
        label="Postal Code"
        @cell-click="() => console.log('Hi')"
      >
      </el-table-column>
    </el-table>
    <!-- TODO: add pagination -->
  </div>
</template>
