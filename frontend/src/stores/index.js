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
