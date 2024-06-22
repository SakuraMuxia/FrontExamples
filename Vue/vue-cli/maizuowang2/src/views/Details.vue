<template lang="">
    <div>
        <h3>{{film.name}}</h3>
        <img height="400" :src="film.poster" alt="">
        <p>{{film.synopsis}}</p>
    </div>
</template>
<script>
export default {
    name:"Details",
    data(){
        return{
            film:{}
        }
    },
    mounted(){
        this.$mz.get("/gateway",{
            params: {
                filmId: this.$route.params.filmId,
                k: Date.now()
            },
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"16905280922820767016288257","bc":"310100"}',
                "X-Host": "mall.film-ticket.film.info"
            }
        })
        .then(res => {
            this.film = res.data.film;
        })
    }
}
</script>
<style lang="">
    
</style>