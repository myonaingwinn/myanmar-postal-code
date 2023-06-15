import { defineStore } from 'pinia';

export const useLanguageStore = defineStore({
  id: 'useLanguageStore',
  state: () => ({
    currentLanguage: localStorage.getItem('language'),
  }),

  getters: {
    getLanguage: (state) => state.currentLanguage,
  },

  actions: {
    setLanguage(language) {
      this.$state.currentLanguage = language;
    },
  },
});

export const useTableStore = defineStore({
  id: 'useTableStore',
  state: () => ({
    tableData: [],
    hasTableData: false,
  }),

  getters: {
    getHasTableData() {
      return this.hasTableData;
    },
    getTableData() {
      return this.tableData;
    },
  },

  actions: {
    setHasTableData(bool) {
      this.hasTableData = bool;
    },
    setTableData(tableData) {
      this.tableData = tableData;
    },
  },
});

export const useCommonStore = defineStore({
  id: 'useCommonStore',
  state: () => ({
    keyword: '',
    pageData: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
    },
  }),

  getters: {
    getKeyword() {
      return this.keyword;
    },

    getPageData() {
      return this.pageData;
    },
  },

  actions: {
    setKeyword(keyword) {
      this.keyword = keyword;
    },

    setPageData(pageData) {
      this.pageData = pageData;
    },
    setCurrentPage(currPage) {
      this.pageData = {
        ...this.pageData,
        currentPage: currPage, // 2nd way
      };
    },
    setPageSize(pageSize) {
      this.pageData = {
        ...this.pageData,
        pageSize, // 1st way
      };
    },
    setTotalItems(totalItems) {
      this.pageData = {
        ...this.pageData,
        totalItems,
      };
    },
  },
});

export const useOrdinaryStore = defineStore({
  id: 'useOrdinaryStore',
  state: () => ({
    currentRegion: '',
    currentTown: '',
    currentQuarter: '',
    postalCode: '',

    regionList: [],
    townList: [],
    quarterList: [],
  }),

  getters: {
    getCurrentRegion() {
      return this.currentRegion;
    },

    getCurrentTown() {
      return this.currentTown;
    },

    getCurrentQuarter() {
      return this.currentQuarter;
    },

    getPostalCode() {
      return this.postalCode;
    },

    getRegionList() {
      return this.regionList;
    },

    getTownList() {
      return this.townList;
    },

    getQuarterList() {
      return this.quarterList;
    },
  },

  actions: {
    setCurrentRegion(region) {
      this.currentRegion = region;
    },

    setCurrentTown(town) {
      this.currentTown = town;
    },

    setCurrentQuarter(quarter) {
      this.currentQuarter = quarter;
    },

    setPostalCode(postalCode) {
      this.postalCode = postalCode;
    },

    setRegionList(regionList) {
      this.regionList = regionList;
    },

    setTownList(townList) {
      this.townList = townList;
    },

    setQuarterList(quarterList) {
      this.quarterList = quarterList;
    },
  },
});
