<template>
    <div>
        <h3>欢迎{{ $store.state.user.userInfo.username }}的到来！</h3>
        <button @click="logout">退出登陆</button>

    </div>
</template>

<script>
export default {
    name: "My",
    methods:{
        async logout(){
            // 通过dispatch方法调用action异步方法
            await this.$store.dispatch('user/postLogout');
            // 跳转到登陆界面，并保存当前路径作为查询字符串
            this.$router.push("/login?cb=" + this.$route.path);
        }
    },
    mounted(){
        this.$store.dispatch("user/getInfo");
    }
}
</script>

<style scoped></style>