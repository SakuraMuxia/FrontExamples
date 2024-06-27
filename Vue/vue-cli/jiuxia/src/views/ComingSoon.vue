<template lang="">
    <div>
        <ul>
            <li v-for="item in films" :key="item.filmId">
                <router-link :to="'/film/comingsoon/'+item.filmId">{{item.name}}</router-link> &nbsp;&nbsp;
                <button @click="$router.push('/film/comingsoon/'+item.filmId)">push</button>
                <button @click="$router.replace('/film/comingsoon/'+item.filmId)">replace</button>
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
    name:"ComingSoon",
    data(){
        return{
            films:[]
        }
    },
    mounted(){
        mzreq.get("/gateway",{
            params:{
                cityId: 310100,
                pageNum: 1,
                pageSize: 5,
                type: 2,
            },
        })
        .then(res => {
            this.films = res.data.films;
        });
    },
}
</script>
<style lang="">
    
</style>