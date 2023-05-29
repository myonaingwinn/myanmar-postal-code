import { defineStore } from 'pinia';

const store = defineStore({
  id: 'languageStore',
  state: () => ({
    currentLanguage: 'en',
  }),
  getters: {
    getLanguage() {
      return this.currentLanguage;
    },
  },
  actions: {
    setLanguage(language) {
      this.currentLanguage = language;
    },
  },
});

export default store;
