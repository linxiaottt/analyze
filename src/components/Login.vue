<template>
	<div class = "login-container">
		<el-dialog :visible.sync="dialogVisible">
			<el-tabs v-model="curTab" @tab-click="clickTab" class = "login-tabs">
			    <el-tab-pane label="注册" name="register"></el-tab-pane>
			    <el-tab-pane label="登录" name="login"></el-tab-pane>
			</el-tabs>
			<el-form :model="form" label-position = "right" label-width = "60px">
				<el-form-item label = "用户名">
					<el-input v-model="form.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label = "密码">
					<el-input v-model="form.password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click = "clickCancel">取 消</el-button>
				<el-button type="primary" @click = "clickSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { USER } from '../common/constants';

	export default {
		data() {
			return {
				curTab: "login", // login || register
				dialogVisible: true,
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
				if (this.curTab === 'login') return this.register();
				else return this.login();
			},
			clickCancel () {
				this.dialogVisible = false;
			},
			login () {
				const { name } = USER.USER_REGISTER;
				this.publish(name, { data: this.form });
			},
			register () {
				const { name } = USER.USER_LOGIN;
				this.publish(name, { data: this.form });
			},
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ ... payload, type });
			},
		},
	};
</script>
<style lang = "scss">
	.login-tabs {
		margin-bottom: 20px;
	}
</style>
