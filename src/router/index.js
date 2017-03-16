import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: r => require.ensure([], () => r(require('./Home/index.vue')), 'Home')
    }
  ]
});
