<template lang="">
    <div class="app">
        <li :key="item.id" v-for="item in data">
            <router-link :to="{
                path:'/news/vtuber',
                query:{
                    id:item.id
                }
            }">{{item.title}}</router-link>
        </li>
        <template>
            <h3 :style="{ color: 'pink' }">{{ news.title }}</h3>
            <p :style="{ color: 'grey' }">{{ news.content }}</p>
        </template>
    </div>
</template>
<script>
import req from "@/request/req.js";
export default {
    name:"Vtuber",
    data(){
        return{
            data:[],
            news:{}
        }
    },
    methods: {
        getNewsById(id) {
            if (!id) return;
            req.get("/vtuber", {
                params: {
                    id,
                }
            })
            .then(res => {
                // 把响应的数据进行保存
                this.news = res.data[0];
            })
        }
    },
    mounted(){
        req.get("/vtuber")
        .then(res =>{
            this.data = res.data;
        })
    },
    beforeRouteUpdate(to, from, next) {
        const { id } = to.query;
        this.getNewsById(id);
        next();
    },
    beforeRouteLeave(to,from,next) {
        next();
    },
}
</script>
<style lang="">
    
</style>