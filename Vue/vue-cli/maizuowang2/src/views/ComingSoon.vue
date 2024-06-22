<template lang="">
    <div>
        <div v-for="item in films" :key="item.filmId">
            <router-link :to="{
                name:'film',
                params:{
                    filmId:item.filmId
                }
            }">
                <img height="200" :src="item.poster"/>
                <p>{{item.name}}</p>
                <p>上映日期：{{item.premiereAt | date}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "ComingSoon",
    data() {
        return {
            films: []
        }
    },
    mounted() {
        this.$mz.get("/gateway", {
            params: {
                cityId: 310100,
                pageNum: 1,
                pageSize: 6,
                type: 2,
                k: Date.now()
            },
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"16905280922820767016288257","bc":"310100"}',
                "X-Host": "mall.film-ticket.film.list"
            }
        })
            .then(res => {
                this.films = res.data.films;
            })
    },
    filters:{
        date(v) {
            // 把时间戳变为毫秒，并创建对象timer
            const timer = new Date(v * 1000);
            // 定义一个数组存放 周几
            let arr = ["日", "一", "二", "三", "四", "五", "六"];

            return "周" + arr[timer.getDay()] + " " + 
                (timer.getMonth() + 1).toString().padStart(2, 0) + "月" +
                timer.getDate().toString().padStart(2, 0) + "日"
        }
    }
}
</script>
<style lang="">
    
</style>