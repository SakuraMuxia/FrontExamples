<template>
    <div>
        <button @click="num++">{{num}}</button>
        <h3>欢迎<span :style="{ color: 'red' }">{{ userName }}</span>的访问</h3>
        <button @click="outLogin">退出登陆</button>
        <news></news>
        <h4>新闻标题</h4>
        <p :style="{ color: 'pink' }">{{ news.title }}</p>
        <h4>新闻详情</h4>
        <p :style="{ color: 'grey' }">{{ news.content }}</p>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "My",
    data(){
        // 从缓存中获取userName
        const userName = localStorage.getItem("userName");
        return {
            num: 1,
            // 把userName
            userName: userName,
            // 定义一个对象接收路由
            news:{},
        }
    },
    methods: {
        outLogin() {
            localStorage.clear();
            this.$router.push({
                path: "/login"
            });
        },
        // 定义一个方法，接收从NewsList传来的新闻id，然后发送axios请求，在这个页面渲染
        getNewsById(id){
            if (!id) return;
            axios.get("http://127.0.0.1:8001/news/",{
                params:{
                    id,
                }
            })
            .then(res => {
                // 把响应的数据进行保存
                this.news = res.data[0];
            })
        }
    },
    // 在创建实例前进行拦截，如果缓存中不存在userName的值就跳转到登陆页面，。
    beforeCreate() {
        console.log("1-beforeCreate");
    },
    // My组件的实例仍然被创建出来了
    created() {
        console.log("2-created");
    },
    beforeMount() {
        console.log("3-beforeMount");
    },
    mounted() {
        console.log("4-mounted");
        // 获取query传来的参数，并设置默认值
        const { id=3 } = this.$route.query;
        this.getNewsById(id);
    },
    // 在路由进入组件之前钩子调用
    beforeRouteEnter(to,from,next){
        console.log("beforeRouteEnter");
        next();
    },
    beforeRouteUpdate(to,from,next){
        console.log("beforeRouteUpdate");
        // 组件内路由跳转
        if (to.query.id !== from.query.id) {
            // console.log(this.$route === from);//
            const { id } = to.query;
            this.getNewsById(id);
            next();
        }
    },
    beforeRouteLeave(to,from,next){
        // 离开路由时，弹框提示
        console.log("beforeRouteLeave");
        if (window.confirm("您确定要离开个人中心吗?")){
            next();// 放行
        }
            
    }
}
</script>

<style scoped>

</style>