<script>
import axios from 'axios';
import { useTableStore } from '../stores';

export default {
  name: 'HomeView',
  components: {
    SearchForm: () => import('../components/SearchForm.vue'),
    DataTable: () => import('../components/DataTable.vue'),
  },
  data() {
    const tableStore = useTableStore();

    return {
      loading: false,
      keyword: '',
      pageData: {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      },
      tableStore,
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

              this.tableStore.setTableData(data);
              this.tableStore.setHasTableData(data.length > 0);

              this.pageData.totalItems = totalItems;
              this.pageData.currentPage = currentPage;
              this.pageData.pageSize = pageSize;
            }
          })
          .catch((error) => {
            // console.error('err', error);
            this.$notify.error({
              title: 'Error',
              message: error.message,
              offset: 50,
            });

            this.resetData();
          })
          .finally(() => {
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
      this.tableStore.setTableData([]);
      this.tableStore.setHasTableData(false);

      this.pageData = {
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      };
    },

    copyText(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.$notify({
            title: 'Success',
            type: 'success',
            message: this.$t('home.notify.success'),
            offset: 50,
          });
        })
        .catch((error) => {
          // console.error('Failed to copy Postal Code:', error);
          this.$notify.error({
            title: 'Error',
            message: this.$t('home.notify.failed'),
            offset: 50,
          });
        });
    },
  },

  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('keyword', this.keyword);
      params.append('lang', this.$pinia.state.currentLanguage);
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
    <el-row>
      <el-col
        class="content"
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 22, offset: 1 }"
        :lg="{ span: 22, offset: 1 }"
        :xl="{ span: 16, offset: 4 }"
      >
        <search-form @setKeyword="getKeyword" />
        <div v-loading="loading" class="loading-container">
          <data-table
            v-if="tableStore.hasTableData"
            :tableData="tableStore.getTableData"
            @copyText="copyText"
          />
          <el-row>
            <el-col align="center">
              <el-pagination
                v-if="pageData.totalItems > 10"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                :current-page="pageData.currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageData.totalItems"
                background
                class="pagination"
              ></el-pagination>
            </el-col>
          </el-row>
          <el-empty v-if="pageData.totalItems < 1" class="empty"></el-empty>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
