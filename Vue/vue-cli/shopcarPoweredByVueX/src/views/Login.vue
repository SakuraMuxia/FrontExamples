<template>
    <div>
        <form name="loginForm" @submit.prevent="login">
            <p>用户名：<input name="username" type="text"></p>
            <p>密码：<input name="password" type="password"></p>
            <button>登陆</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex"
export default {
    name: "Login",
    methods:{
        ...mapActions("user",{
            result:"login",
        }),
        async login(){
            // 获取页面中的值
            const username = document.loginForm.username.value.trim();
            // 执行action异步函数
            await this.result(username);
            // 获取当前路由的查询字符串,并设置默认值
            const { cb = "/my" } = this.$route.query;
            // 跳转到路由
            this.$router.replace(cb)
        }
    }
}
</script>

<style scoped>
</style>