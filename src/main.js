/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './assets/css/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
