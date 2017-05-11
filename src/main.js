// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import './common/common.css';
import router from './router';
import store from './vuex/store';

import { Menu, Submenu, MenuItem } from 'element-ui';

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
