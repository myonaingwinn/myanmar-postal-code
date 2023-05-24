<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    SearchForm: () => import('../components/SearchForm.vue'),
    DataTable: () => import('../components/DataTable.vue'),
  },
  data() {
    return {
      loading: false,
      keyword: '',
      tableData: [],
      pageData: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
    };
  },
  methods: {
    onPaged() {
      this.fetchData();
    },

    handlePageChange(val) {
      this.pageData.currentPage = val;
      this.fetchData();
    },

    handleSizeChange(val) {
      this.pageData.pageSize = val;
      this.fetchData();
    },

    fetchData() {
      this.setLoading();
      if (this.keyword) {
        axios
          .get(import.meta.env.VITE_BASE_URL + '/search', {
            params: this.axiosParams,
          })
          .then((res) => {
            if (res.data) {
              const { currentPage, pageSize, totalItems, data } = res.data;
              this.tableData = data;
              this.pageData.totalItems = totalItems;
              this.pageData.currentPage = currentPage;
              this.pageData.pageSize = pageSize;
            }
            this.setLoading();
          })
          .catch((error) => {
            console.error('err', error);
            this.setLoading();
          });
      }
    },

    getKeyword(param) {
      if (param.trim() !== '') {
        this.keyword = param;

        this.fetchData();
      }

      this.resetData();
    },

    setLoading() {
      this.loading = !this.loading;
    },

    resetData() {
      this.tableData = [];
      this.pageData = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      };
    },
  },

  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('keyword', this.keyword);
      params.append('lang', 'en');
      params.append('page', this.pageData.currentPage);
      params.append('pageSize', this.pageData.pageSize);
      return params;
    },
  },

  created() {
    document.title = 'Myanmar Postal Code';
  },
};
</script>

<template>
  <div class="home">
    <search-form @setKeyword="getKeyword" />
    <div v-loading="loading" class="loading-container">
      <data-table v-if="tableData.length > 0" :tableData="tableData" />
      <el-pagination
        v-if="pageData.totalItems > 10"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="pageData.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.totalItems"
        background
        class="pagination"
      ></el-pagination>
      <el-empty v-else description="👆 Type there..."></el-empty>
    </div>
  </div>
</template>
