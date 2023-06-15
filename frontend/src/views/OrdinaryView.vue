<template>
  <div class="ordinary">
    <el-row>
      <el-col
        class="content"
        :xs="{ span: 20, offset: 2 }"
        :sm="{ span: 22, offset: 1 }"
        :md="{ span: 22, offset: 1 }"
        :lg="{ span: 22, offset: 1 }"
        :xl="{ span: 16, offset: 4 }"
      >
        <el-row>
          <el-col :span="8">
            <custom-select
              :value="ordinaryStore.getCurrentRegion"
              :dataList="ordinaryStore.getRegionList"
              :loading="loading"
              @change="searchTown"
            />
          </el-col>
          <el-col :span="8">
            <custom-select
              :value="ordinaryStore.getCurrentTown"
              :dataList="ordinaryStore.getTownList"
              :loading="loading"
              :disabled="ordinaryStore.getCurrentRegion ? false : true"
              @change="searchQuarter"
            />
          </el-col>
          <el-col :span="8">
            <custom-select
              :value="ordinaryStore.getCurrentQuarter"
              :dataList="ordinaryStore.getQuarterList"
              :loading="loading"
              :disabled="
                ordinaryStore.getCurrentRegion && ordinaryStore.getCurrentTown
                  ? false
                  : true
              "
              @change="searchPostalCode"
            />
          </el-col>
        </el-row>

        <el-divider />

        <el-row>
          <el-col>
            <p>
              State / Region : {{ ordinaryStore.getCurrentRegion }} <br />
              Town / Township : {{ ordinaryStore.getCurrentTown }} <br />
              Quarter / Village or Tract :
              {{ ordinaryStore.getCurrentQuarter }} <br />
              Postal Code : {{ ordinaryStore.getPostalCode }}
            </p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import CustomSelect from '../components/CustomSelect.vue';
import { COLUMNS } from '../enums';
import { useLanguageStore, useOrdinaryStore } from '../stores';

export default {
  name: 'OrdinaryView',
  components: {
    CustomSelect,
  },

  data() {
    const languageStore = useLanguageStore();
    const ordinaryStore = useOrdinaryStore();

    return {
      loading: false,
      disabled: false,
      languageStore,
      ordinaryStore,
    };
  },

  methods: {
    searchRegion() {
      this.setLoading();

      axios
        .get(import.meta.env.VITE_BASE_URL + '/ordinarySearch', {
          params: this.axiosParams,
        })
        .then((res) => {
          const { regionList } = res.data;

          if (regionList) {
            this.ordinaryStore.setRegionList(regionList);
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: 'Error',
            message: err.response.data.error,
            offset: 50,
          });
        })
        .finally(() => {
          this.setLoading();
        });
    },

    searchTown(region) {
      this.ordinaryStore.setCurrentRegion(region);
      this.ordinaryStore.setCurrentTown('');
      this.ordinaryStore.setCurrentQuarter('');
      this.ordinaryStore.setPostalCode('');
      this.setLoading();
      this.setDisable();

      axios
        .get(import.meta.env.VITE_BASE_URL + '/ordinarySearch', {
          params: this.axiosParams,
        })
        .then((res) => {
          const { townList } = res.data;

          if (townList) {
            this.ordinaryStore.setTownList(townList);
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: 'Error',
            message: err.response.data.error,
            offset: 50,
          });
        })
        .finally(() => {
          this.setLoading();
          this.setDisable();
        });
    },

    searchQuarter(town) {
      this.ordinaryStore.setCurrentTown(town);
      this.ordinaryStore.setCurrentQuarter('');
      this.ordinaryStore.setPostalCode('');
      this.setLoading();
      this.setDisable();

      axios
        .get(import.meta.env.VITE_BASE_URL + '/ordinarySearch', {
          params: this.axiosParams,
        })
        .then((res) => {
          const { quarterList } = res.data;

          if (quarterList) {
            this.ordinaryStore.setQuarterList(quarterList);
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: 'Error',
            message: err.response.data.error,
            offset: 50,
          });
        })
        .finally(() => {
          this.setLoading();
          this.setDisable();
        });
    },

    searchPostalCode(quarter) {
      this.ordinaryStore.setCurrentQuarter(quarter);

      axios
        .get(import.meta.env.VITE_BASE_URL + '/ordinarySearch', {
          params: this.axiosParams,
        })
        .then((res) => {
          const { postalCode } = res.data;

          if (postalCode) {
            this.ordinaryStore.setPostalCode(postalCode);
          }
        })
        .catch((err) => {
          this.$notify.error({
            title: 'Error',
            message: err.response.data.error,
            offset: 50,
          });
        });
    },

    setLoading() {
      this.loading = !this.loading;
    },

    setDisable() {
      this.disabled = !this.disabled;
    },
  },

  created() {
    this.searchRegion();
  },

  computed: {
    axiosParams() {
      const params = new URLSearchParams();

      params.append('regionColumn', COLUMNS.REGION);

      params.append('region', this.ordinaryStore.getCurrentRegion);
      params.append('town', this.ordinaryStore.getCurrentTown);
      params.append('quarter', this.ordinaryStore.getCurrentQuarter);

      params.append('language', this.languageStore.getLanguage);

      return params;
    },
  },
};
</script>
