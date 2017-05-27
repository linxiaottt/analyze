<template>
	<div class = "navigator-container">
		<el-menu theme="dark" :default-active="activeIndex" class = "navigator-tabs" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1"><router-link class = "router-link" to = "/#">主页</router-link></el-menu-item>
			<el-submenu index="2" v-if = "false">
				<template slot="title">子菜单</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-submenu>
			<el-menu-item index="3"><router-link to = "/admin">管理</router-link></el-menu-item>
			<el-menu-item class = "navigator-preview navigator-buttons" index = "4" v-if = "userInfo && userInfo.id">
				<el-badge :value="0" :max="10" class = "navigator-badge">
					<a><img :src = "userInfo.preview || preview"></a>
				</el-badge>
				<div v-if = "true" class = "navigator-panel">
					<a>主页</a>
					<router-link to = "/collection">收藏</router-link>
					<a>信息</a>
					<a @click = "handleClickLogout">退出</a>
				</div>
			</el-menu-item>
			<el-menu-item class = "navigator-buttons" index = "5" v-else >
				<el-button @click = "handleClickRegister">注册</el-button>
				<el-button @click = "handleClickLogin">登录</el-button>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
	import PUBSUB from 'pubsub-js';
	import { mapState } from 'vuex';
	import preview from '../assets/preview.png';

	export default {
		data() {
			return {
				preview,
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
		computed: {
			...mapState(['userInfo']),
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
			handleClickLogout () {
				this.$store.dispatch({ type: 'USER_LOGOUT' });
			}
		},
		mounted () {
			this.$store.dispatch({ type: 'USER_GET_MY_INFO'});
		}
	};
</script>
<style lang = "scss">
	.navigator-container {
		position: relative;
		z-index: 2;
	}

	.navigator-tabs .navigator-buttons {
		top: 0;
		right: 0;
		position: absolute;
		border-bottom: none !important;
	}
	.navigator-badge {
		display: flex;
		height: 100%;
		align-items: center;

		a {
			display: inline-block;
			width: 48px;
			height: 48px;
			text-decoration: none;
		}
		img {
			width: 100%;
			height: auto;
			border-radius: 50%;
		}
	}
	.navigator-preview:hover {
		.navigator-panel { opacity: 1; visibility: visible;}
	}
	.navigator-panel {
		opacity: 0;
        visibility: hidden;
		position: absolute;
		top: 60px;
		right: 20px;
		background: #ffffff;
		border-radius: 0 0 4px 4px;
		transition: .3s all ease-in-out;
		box-sizing: border-box;
		padding: 10px 10px;
		width: 250px;
		line-height: 1.5;
		white-space: pre-wrap;
		font-size: 0;
		text-align: center;

		a {
			width: 50%;
			color: #20a0ff !important;
			font-size: 12px;
			padding: 5px 0;
			display: inline-block;
			box-sizing: border-box;
			transition: all .3s ease-in-out;
			-webkit-text-size-adjust: none;
			&:last-child { color: red !important; }

			&:hover { color: #0570dc !important; }
		}
	}
	.router-link { display: inline-block; width: 100%; height: 100%; }
</style>
