<template>
	<div class = "login-container">
		<el-dialog :visible.sync="dialogVisible" size = "tiny">
			<el-tabs v-model="curTab" @tab-click="clickTab" class = "login-tabs">
			    <el-tab-pane label="注册" name="register"></el-tab-pane>
			    <el-tab-pane label="登录" name="login"></el-tab-pane>
			</el-tabs>
			<el-form :model="form" label-position = "right" label-width = "60px">
				<el-form-item label = "用户名">
					<el-input v-model="form.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label = "密码">
					<el-input v-model="form.password" auto-complete="off" type = "password" ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click = "clickCancel">取 消</el-button>
				<el-button type="primary" @click = "clickSubmit" v-loading.lock = "isLoading">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import PUBSUB from 'pubsub-js';
	import { USER } from '../common/constants';
	export default {
		data() {
			return {
				curTab: "login", // login || register
				isLoading: false,
				dialogVisible: false,
				form: {
					username: '',
					password: '',
				},
			};
		},
		methods: {
			clickTab (component, event) {
				this.curTab = component.name;
			},
			clickSubmit () {
				this.isLoading = true;
				if (this.curTab === 'register') return this.register();
				else return this.login();
			},
			clickCancel () {
				return this.hide();
			},
			login () {
				const { name } = USER.USER_LOGIN;
				const final = () => { this.isLoading = false; };
				const success = () => { this.dialogVisible = false; };
				const error = (msg) => {
			        this.$notify({
			          title: '警告',
			          message: msg,
			          type: 'warning'
			        });
				};
				this.publish(name, { data: this.form, final, success, error });
			},
			register () {
				const { name } = USER.USER_REGISTER;
				const error = (msg) => {
			        this.$notify({
			          title: '警告',
			          message: msg,
			          type: 'warning'
			        });
				};
				const final = () => { this.isLoading = false; };
				const success = () => { this.dialogVisible = false; };
				this.publish(name, { data: this.form, final, success, error });
			},
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ ... payload, type });
			},
			show (type, name) {
				this.curTab = name;
				this.dialogVisible = true;
			},
			hide (type, name) {
				this.dialogVisible = false;
			}
		},
		mounted () {
			PUBSUB.subscribe('login-show', this.show.bind(this));
		},
		beforeDesotry () {
			PUBSUB.unsubscribe('login-show', this.show);
		}
	};
</script>
<style lang = "scss">
	.login-tabs {
		margin-bottom: 20px;
	}
</style>
