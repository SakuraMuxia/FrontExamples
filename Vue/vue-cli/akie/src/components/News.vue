<template lang="">
    <div class="app">
        <h4>新闻信息</h4>
        <li :key="item.id" v-for="item in news">
            <router-link :to="{
                path:'/my',
                query:{
                    id:item.id
                }
            }">{{item.title}}</router-link>
        </li>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name:"News",
    data(){
        return{
            news:[],
        }
    },
    mounted(){
        // 向 json-serve临时 搭建的接口请求
        axios.get("http://127.0.0.1:8001/news")
        .then(res => {
            this.news=res.data;
        })
    }
}
</script>
<style lang="less" scoped>
    .app{
        li{
            text-align: center
        }
    }
</style>