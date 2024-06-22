<template lang="">
    <div class="wrapper">
        <h4>Git列表页</h4>
        <div v-for="item in datas" :key="item.id">
            <router-link :to="{
                name:'personal',
                params:{
                    login:item.login
                },
            }">用户名:{{item.login}}</router-link>
        </div>
    </div>
</template>
<script>
import { gitReq } from '@/request/gitHubReq';
export default {
    name: "UsersList",
    data() {
        return {
            datas: [],
        }
    },
    mounted() {
        // 发送axios请求
        gitReq.get("/search/users", {
            params: {
                q: "r",
                sort: "starts"
            }
        })
            .then(res => {
                this.datas = res.items;
            })
    },
}
</script>
<style lang="less" scoped>
.wrapper {
    img {
        height: 245px;
        text-align: left
    }
}
</style>