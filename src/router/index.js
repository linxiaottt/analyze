import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		redirect: '/home',
	}, {
		path: '/home',
		name: 'Home',
		component: r => require.ensure([], () => r(require('./Home/index.vue')), 'Home')
	}, {
		path: '/info/:code',
		name: 'Info',
		component: r => require.ensure([], () => r(require('./Info/index.vue')), 'Info')
	}]
});
