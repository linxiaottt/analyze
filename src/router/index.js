import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
	routes: [{
		path: '/',
		redirect: '/home',
	}, {
		path: '/home',
		name: 'Home',
		component: r => require.ensure([], () => r(require('./Home/index.vue')), 'Home')
	}, {
		path: '/stock/:code',
		name: 'Stock',
		component: r => require.ensure([], () => r(require('./Info/index.vue')), 'Stock')
	}, {
		path: '/login',
		name: 'Login',
        component: resolve => require(['../components/page/Login.vue'], resolve)
	}, {
		path: '/collection',
		name: 'collection',
		components: resolve => require(['./Collection/index.vue'], resolve)
	},{
		path: '/admin',
		name: 'Admin',
		redirect: '/admin/readme',
		component: r => require.ensure([], () => r(require('./Admin/index.vue')), 'Admin'),
		children:[
                {
                    path: 'readme',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: 'basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: 'vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: 'baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: 'vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: 'markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: 'upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: 'basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: 'mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                }
            ]
	}]
});
export default router;
router.beforeEach((to, from, next) => {
	let needLogin = false;
	if (/admin/i.test(to.path)) needLogin = true;
	// needLogin = false;
	if (!needLogin) next();
	else if (needLogin) next('login');
});
