import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia';
import i18n from './lang';

import App from './App.vue';
import router from './router';

import './assets/styles/index.scss';

const pinia = createPinia('languageStore');
const languageValue = localStorage.getItem('language');

if (languageValue) {
  // Language value exists in localStorage, set it in the store
  pinia.state.currentLanguage = languageValue;
} else {
  // Language value doesn't exist in localStorage, set a default language
  localStorage.setItem('language', 'en');
  pinia.state.currentLanguage = 'en';
}

Vue.use(PiniaVuePlugin).use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

new Vue({
  router,
  pinia,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
