<template lang="">
    <div>
        <h3 v-if="isLoading" :style="{ color: 'pink' }">Loading...</h3>
        <template v-else>
            <h3>{{ film.name }}</h3>
            <p>{{ film.synopsis }}</p>
        </template>
        
    </div>
</template>
<script>
import mzreq from "@/request/mz";
export default {
    name:"Details",
    data() {
        return {
            film: {},
            isLoading: false,
        }
    },
    methods:{
        getFilmById(id){
            this.isLoading = true;
            mzreq.get("/gateway",{
                params: {
                    filmId: id,
                },
                headers: {
                    "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"16905280922820767016288257","bc":"310100"}',
                    "X-Host": "mall.film-ticket.film.info"
                }
            })
            .then(res => {
                this.film = res.data.film;
                this.isLoading = false;
                // console.log("Details回应",res);
            })
        }
    },
    
    mounted(){
        const { id } = this.$route.params;
        console.log(id);
        this.getFilmById(id);
    },
    beforeRouteUpdate(to, from, next) {
        
        this.getFilmById(to.params.id);
        next();
    },
}
</script>
<style lang="">
    
</style>