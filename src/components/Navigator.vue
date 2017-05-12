<template>
	<div class = "navigator-container">
		<el-menu theme="dark" :default-active="activeIndex" class = "navigator-tabs" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1">主页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">子菜单</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-submenu>
			<el-menu-item index="3">收藏</el-menu-item>
			<el-menu-item class = "navigator-buttons " index = "4">
				<el-button @click = "handleClickRegister">注册</el-button>
				<el-button @click = "handleClickLogin">登录</el-button>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
	import PUBSUB from 'pubsub-js';

	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		methods: {
			handleSelect(key, keyPath) {
			},
			handleClickLogin () {
				PUBSUB.publish('login-show', "login");
			},
			handleClickRegister () {
				PUBSUB.publish('login-show', "register");
			},
		}
	};
</script>
<style lang = "scss">
	.navigator-container {
		position: relative;
		z-index: 2;

		.navigator-tabs .navigator-buttons {
			top: 0;
			right: 0;
			position: absolute;
			border-bottom: none !important;
		}
	}
</style>
