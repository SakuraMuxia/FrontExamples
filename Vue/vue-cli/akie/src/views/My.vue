<template>
    <div>
        <h3>欢迎<span :style="{ color: 'red' }">{{ userName }}</span>的访问</h3>
        <button @click="outLogin">退出登陆</button>
    </div>
</template>

<script>
export default {
    name: "My",
    data(){
        // 从缓存中获取userName
        const userName = localStorage.getItem("userName");
        return {
            // 把userName
            userName: userName
        }
    },
    methods: {
        outLogin() {
            localStorage.clear();
            this.$router.push({
                path: "/login"
            });
        }
    },
    // 在创建实例前进行拦截，如果缓存中不存在userName的值就跳转到登陆页面，但是实例仍然被创建出来了。
    beforeCreate() {
        if (!localStorage.getItem("userName")) {
            // 编程式导航
            this.$router.push("/login");
        }
    },
    created() {
        console.log("created",this);
    },
    mounted() {
        console.log("mounted")
    },

}
</script>

<style scoped>

</style>