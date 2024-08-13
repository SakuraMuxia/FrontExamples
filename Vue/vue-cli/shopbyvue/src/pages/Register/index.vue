<template lang="">
    <div>
        <div class="register">
            <h3>注册新用户
                <span class="go">我有账号，去 <router-link to="/login">登录</router-link>
                </span>
            </h3>
            <div class="content">
                <label>手机号:</label>
                <input v-model="phone" type="text" placeholder="请输入你的手机号">
                
            </div>
            <div class="content">
                <label>验证码:</label>
                <input v-model="code" type="text" placeholder="请输入验证码">
                <button @click="sendCode" class="getcode">获取验证码</button>
                
            </div>
            <div class="content">
                <label>登录密码:</label>
                <input v-model="password" type="password" placeholder="请输入你的登录密码">
                
            </div>
            <div class="content">
                <label>确认密码:</label>
                <input v-model="rePassword" type="password" placeholder="请输入确认密码">
                
            </div>
            <div class="controls">
                <input v-model="isAllow" name="m1" type="checkbox">
                <span>同意协议并注册《尚品汇用户协议》</span>
                <span class="error-msg"></span>
            </div>
            <div class="btn">
                <button @click="goRegister">完成注册</button>
            </div>
        </div>
    </div>
</template>
<script>
import { phoneReg } from "@/utils/reg";

export default {
    name: "Register",
    data(){
        return{
            phone:'',
            code: "",
            password: "",
            rePassword: "",
            isAllow: false
        }
    },
    methods:{
        // 发送验证码
        async sendCode(){
            // 判断手机号是否合法
            if (phoneReg.test(this.phone)){
                // 调用异步请求,并接收
                this.code = await this.$store.dispatch("user/getSendCodeAsync",this.phone);
            }else{
                // 手机号不合法
                this.$message.error('手机号不合法!!!');
            }
        },
        // 发送注册请求
        async goRegister(){
            // 验证表单
            if (!phoneReg.test(this.phone)) {
                this.$message.error("请输入正确的手机号");
                return;
            }
            if (this.code.length < 1) {
                this.$message.error("请输入验证码");
                return;
            }
            if (this.password.length < 1) {
                this.$message.error("请输入密码]");
                return;
            }
            if (this.password !== this.rePassword) {
                this.$message.error("两次密码不一致!");
                return;
            }
            if (!this.isAllow) {
                this.$message.error("您还未同意协议!");
                return;
            }
            // 从this中解构出
            const { phone, password, code } = this;
            // 发送注册异步请求
            const result = await this.$store.dispatch("user/postRegisterAsync", {
                phone, password, code
            })
            // 成功则跳转 登陆，否则提示
            if (result.code === 200) {
                console.log(result);
                this.$router.push("/login");
            } else {
                this.$message.error(result.message)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;

        h3 {
            background: #ececec;
            margin: 0;
            padding: 6px 15px;
            color: #333;
            border-bottom: 1px solid #dfdfdf;
            font-size: 20.04px;
            line-height: 30.06px;

            span {
                font-size: 14px;
                float: right;

                a {
                    color: #e1251b;
                }
            }
        }

        div:nth-of-type(1) {
            margin-top: 40px;
        }

        .content {
            padding-left: 390px;
            margin-bottom: 18px;
            position: relative;

            label {
                font-size: 14px;
                width: 96px;
                text-align: right;
                display: inline-block;
            }

            .getcode {
                height: 36px;
                margin-left: 10px;
                padding: 5px;
            }

            input {
                width: 270px;
                height: 38px;
                padding-left: 8px;
                box-sizing: border-box;
                margin-left: 5px;
                outline: none;
                border: 1px solid #999;
            }

            img {
                vertical-align: sub;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .controls {
            text-align: center;
            position: relative;

            input {
                vertical-align: middle;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .btn {
            text-align: center;
            line-height: 36px;
            margin: 17px 0 0 55px;

            button {
                border: none;
                outline: none;
                width: 270px;
                height: 36px;
                background: #e1251b;
                color: #fff !important;
                display: inline-block;
                font-size: 16px;
            }
        }
    } 
    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
</style>