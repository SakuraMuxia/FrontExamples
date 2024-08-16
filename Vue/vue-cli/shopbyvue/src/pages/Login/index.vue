<template lang="">
    <div>
        <!-- 登录 -->
        <div class="login-wrap">
            <div class="login">
                <div class="loginform">
                    <div class="content">
                        <form @submit.prevent="login">
                            <div class="input-text clearFix">
                                <i></i>
                                <input 
                                    v-validate="{required:true,phone_rule:true}"
                                    type="text" name="phone" placeholder="手机号">
                                <span class="error-msg">{{errors.first("phone")}}</span>
                            </div>

                            <div class="input-text clearFix">
                                <i class="pwd"></i>
                                <input
                                    v-validate="{required:true,pwd_rule:true}"
                                    type="text" name="password" placeholder="请输入密码">
                                <span class="error-msg">{{errors.first("password")}}</span>
                            </div>

                            <button class="btn">登&nbsp;&nbsp;录</button>
                        </form>
                        <div class="call clearFix">
                            <router-link to="/register" class="register">立即注册</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from 'element-ui';


export default {
    name: "Login",
    methods: {
        // 登陆的方法
        async login(e){
            // 所有的规则全部满足为true,有一个不满足为false
            const result = await this.$validator.validateAll();
            // 获取输入框中的数值
            const phone = e.target.phone.value.trim();
            const password = e.target.password.value.trim();
            
            // 验证是否为空
            if (result) {
                // 调用异步请求
                await this.$store.dispatch('user/postLoginAsync', {
                    phone,
                    password
                })
            } else if (!phone || !password){
                Message.warning("用户名或密码不能为空")
            }
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="less" scoped>
.login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
        background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
        width: 420px;
        height: 300px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

            li {
                width: 50%;
                float: left;
                text-align: center;

                a {
                    width: 100%;
                    display: block;
                    height: 50px;
                    line-height: 50px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #333;
                    border: 1px solid #ddd;
                    box-sizing: border-box;
                    text-decoration: none;

                }

                .current {
                    border-bottom: none;
                    border-top-color: #28a3ef;
                    color: #e1251b;
                }
            }
        }

        .content {
            width: 380px;
            height: 226px;
            box-sizing: border-box;
            padding: 18px;

            form {
                margin: 15px 0 18px 0;
                font-size: 12px;
                line-height: 18px;

                .input-text {
                    margin-bottom: 22px;
                    position: relative;

                    i {
                        float: left;
                        width: 37px;
                        height: 32px;
                        border: 1px solid #ccc;
                        background: url(../../assets/images/icons.png) no-repeat -10px -201px;
                        box-sizing: border-box;
                        border-radius: 2px 0 0 2px;
                    }

                    .pwd {
                        background-position: -72px -201px;
                    }

                    input {
                        width: 302px;
                        height: 32px;
                        box-sizing: border-box;
                        border: 1px solid #ccc;
                        border-left: none;
                        float: left;
                        padding-top: 6px;
                        padding-bottom: 6px;
                        font-size: 14px;
                        line-height: 22px;
                        padding-right: 8px;
                        padding-left: 8px;

                        border-radius: 0 2px 2px 0;
                        outline: none;
                    }

                    .error-msg {
                        position: absolute;
                        top: 100%;
                        left: 40px;
                        color: red;
                    }
                }

                .setting {
                    label {
                        float: left;
                    }

                    .forget {
                        float: right;
                    }
                }

                .btn {
                    background-color: #e1251b;
                    padding: 6px;
                    border-radius: 0;
                    font-size: 16px;
                    font-family: 微软雅黑;
                    word-spacing: 4px;
                    border: 1px solid #e1251b;
                    color: #fff;
                    width: 100%;
                    height: 36px;
                    margin-top: 25px;
                    outline: none;
                }
            }

            .call {
                margin-top: 30px;

                ul {
                    float: left;

                    li {
                        float: left;
                        margin-right: 5px;
                    }
                }

                .register {
                    float: right;
                    font-size: 15px;
                    line-height: 38px;
                }

                .register:hover {
                    color: #4cb9fc;
                    text-decoration: underline;
                }
            }

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