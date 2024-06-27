<template lang="">
    <div>
        <ul>
            <li v-for="item in films" :key="item.filmId">
                <router-link to="">{{item.name}}</router-link> &nbsp;&nbsp;
                <button>push</button>
                <button>replace</button> 
            </li>
        </ul>
        <button>前进</button>
        <button>后退</button>
    </div>
</template>
<script>
import mzreq from "@/request/mz";
export default {
    name:"NowPlaying",
    data() {
        return {
            films: []
        }
    },
    mounted() {
        mzreq.get("/gateway", {
            params: {
                cityId: 310100,
                pageNum: 1,
                pageSize: 5,
                type: 1,
                v: Date.now()
            },
        })
            .then(res => {
                this.films = res.data.films;
            })
    }
}
</script>
<style lang="">
    
</style>