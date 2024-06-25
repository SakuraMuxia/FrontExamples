<template>
    <div>
        <h3>登陆界面</h3>
        <input @keyup.enter="loginHandler" type="text" placeholder="请输入账号，回车登陆">
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return{
            userList:["hanser","akie"]
        }
    },
    methods: {
        loginHandler(e){
            // 获取表单中的userName
            const userName = e.target.value.trim(e);
            // 判断用户名是否为空
            if (userName.length === 0) {
                alert("请输入用户名！");
                return;
            }
            // 验证登陆
            if (this.userList.includes(userName)){
                // 在缓存中设置 属性
                localStorage.setItem("userName", userName);
                // 跳转到指定路由
                this.$router.push({
                    path:"/my"
                })
            }else{
                alert("用户名错误")
            }
        }
    },
}
</script>

<style scoped>

</style>