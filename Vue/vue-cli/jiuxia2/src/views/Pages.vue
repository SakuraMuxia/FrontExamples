<template lang="">
    <div>
        <ul>
            <li v-for="item in films" :key="item.filmId">
                <!-- "film/2/1234 -->
                <router-link :to="'/film/'+ $route.params.type + '/'+ item.filmId ">{{item.name}}</router-link> &nbsp;&nbsp;
                <!-- <button @click="$router.push('/film' + $route.params.type + item.filmId)">push</button>
                <button @click="$router.replace('/film' + $route.params.type + item.filmId)">replace</button> -->
            </li>
        </ul>
        <button @click="$router.go(1)">前进</button>
        <button @click="$router.go(-1)">后退</button>
        <hr/>
        <router-view></router-view>
    </div>
</template>
<script>
import mzreq from "@/request/mz"
export default {
    name: "Films",
    data() {
        return {
            films: []
        }
    },
    mounted() {
        
    },
    watch:{
        "$route.params":{
            handler(){
                console.log("handler", this.$route.params.type);
                const { type } = this.$route.params;
                mzreq.get("/gateway", {
                    params: {
                        cityId: 310100,
                        pageNum: 1,
                        pageSize: 5,
                        type,
                    },
                })
                .then(res => {
                    this.films = res.data.films;
                });
                
            },
            immediate: true,
            deep: true,
        }

    }
}
</script>
<style lang="">

</style>