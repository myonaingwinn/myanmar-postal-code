<script>
import axios from 'axios';
import { useTableStore, useCommonStore } from '../stores';

export default {
  name: 'HomeView',
  components: {
    SearchForm: () => import('../components/SearchForm.vue'),
    DataTable: () => import('../components/DataTable.vue'),
  },
  data() {
    const tableStore = useTableStore();
    const commonStore = useCommonStore();

    return {
      loading: false,
      tableStore,
      commonStore,
    };
  },
  methods: {
    onPaged() {
      this.fetchData();
    },

    handlePageChange(val) {
      this.commonStore.setCurrentPage(val);
      this.fetchData();
    },

    handleSizeChange(val) {
      this.commonStore.setPageSize(val);
      this.fetchData();
    },

    fetchData() {
      if (this.commonStore.getKeyword.trim().length > 0) {
        this.setLoading();

        axios
          .get(import.meta.env.VITE_BASE_URL + '/search', {
            params: this.axiosParams,
          })
          .then((res) => {
            if (res.data) {
              const { currentPage, pageSize, totalItems, data } = res.data;
              this.commonStore.setPageData({
                currentPage: currentPage,
                pageSize: pageSize,
                totalItems: totalItems,
              });

              this.tableStore.setHasTableData(data.length > 0);
              this.commonStore.getKeyword.trim().length > 0
                ? this.tableStore.setTableData(data)
                : this.resetData();
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

      return;
    },

    getKeyword(param) {
      this.commonStore.setKeyword(param.trim());

      if (this.commonStore.getKeyword.length > 0) {
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

      this.commonStore.setPageData({
        currentPage: 1,
        pageSize: 10,
        totalItems: 0,
      });
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

    updatePageTitle() {
      const pageTitle = this.$t('home.title');
      document.title = pageTitle;
    },
  },

  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('keyword', this.commonStore.getKeyword);
      params.append('page', this.commonStore.getPageData.currentPage);
      params.append('pageSize', this.commonStore.getPageData.pageSize);
      return params;
    },
  },

  watch: {
    '$i18n.locale': function () {
      this.updatePageTitle();
    },
  },

  created() {
    this.updatePageTitle();
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
            :tableData="tableStore.getTableData"
            @copyText="copyText"
          />
          <el-row>
            <el-col align="center">
              <el-pagination
                v-if="commonStore.getPageData.totalItems > 10"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                :current-page="commonStore.getPageData.currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="commonStore.getPageData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="commonStore.getPageData.totalItems"
                background
                class="pagination"
              ></el-pagination>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
