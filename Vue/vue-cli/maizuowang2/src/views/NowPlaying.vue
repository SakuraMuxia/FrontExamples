<template lang="">
    <div>
        <div v-for="item in films" :key="item.filmId">
            <router-link :to="'/film/'+item.filmId">
                <img height="200" :src="item.poster"/>
                <p>{{item.name}}</p>
                <p>主演：{{item.actors | actors}}</p>  
            </router-link>
        </div>
    </div>
</template>
<script>

export default {
    name: "NowPlaying",
    data(){
        return{
            films:[]
        }
    },
    mounted() {
        
        this.$mz.get("/gateway",{
            params: {
                cityId: 310100,
                pageNum: 1,
                pageSize: 6,
                type: 1,
                k: Date.now()
            },
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"16905280922820767016288257","bc":"310100"}',
                "X-Host": "mall.film-ticket.film.list"
            }
        })
        .then( res =>{
            
            this.films = res.data.films;
        })
    },
    filters:{
        actors(v){
            return v.map(item=>item.name).join(" ")
        }
    }
}
</script>
<style lang="">
    
</style>