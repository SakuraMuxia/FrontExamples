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
import axios from 'axios';
export default {
    name: "Login",
    methods:{
        async login(){
            // 获取页面中的值
            const username = document.loginForm.username.value.trim();
            // 发送axios请求
            const {data} = await axios.get("http://127.0.0.1:8001/user/",{
                params:{
                    username: username,
                }
            });

            if(data.length === 0){
                alert("登陆失败! *~*");
                return;
            }
            // 设置响应信息
            if(data[0].code/1 === 200){
                alert("登陆成功! ^_^");
                this.$store.commit("SET_TOKEN", data[0].data);
                // 获取当前路由的查询字符串,并设置默认值
                const {cb="/my"} = this.$route.query;
                // 跳转到路由
                this.$router.replace(cb)
            }
        }
    }
}
</script>

<style scoped>
</style>