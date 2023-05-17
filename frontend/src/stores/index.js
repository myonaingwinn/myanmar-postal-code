import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { getLanguage } from '../lang';

const store = defineStore({
  id: 'store',
  state: () => ({
    language: getLanguage(),
  }),
  getters: {
    language: (state) => state.language,
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('language', language);
    },
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language);
    },
  },
});

export default store;
