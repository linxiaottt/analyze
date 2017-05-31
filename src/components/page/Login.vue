<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login" v-loading.lock = "">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;"></p>
            </el-form>
        </div>
    </div>
</template>

<script>
	import { USER } from '../../common/constants';
    export default {
        data: function(){
            return {
            	isLoading: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login () {
            	this.isLoading = true;
				const { name } = USER.USER_LOGIN;
				const final = () => { this.isLoading = false; };
				const success = () => { this.$router.push('/admin'); };
				const error = (msg) => {
			        this.$notify({
			          title: '警告',
			          message: msg,
			          type: 'warning'
			        });
				};
				this.publish(name, { data: this.ruleForm, final, success, error });
			},
			publish (type, payload) {
				const { dispatch } = this.$store;
				dispatch({ ... payload, type });
			},
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
