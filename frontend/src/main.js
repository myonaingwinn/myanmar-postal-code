import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia';
import i18n from './lang';

import App from './App.vue';
import router from './router';

import './assets/styles/index.scss';

Vue.use(PiniaVuePlugin).use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value),
});

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
