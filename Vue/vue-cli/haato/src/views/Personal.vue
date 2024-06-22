<template lang="">
    <div>
        <h4>个人主页</h4>
        <p>用户名:{{info.login}}</p>
        <img :src="info.avatar_url" alt="">
        
    </div>
</template>
<script>
import { gitReq } from '@/request/gitHubReq';

export default {
    name:"Personal",
    data(){
        return{
            info:{},
        }
    },
    mounted(){
        gitReq.get("/users/"+this.$route.params.login)
        .then(res => {
            this.info = res;
        })
    }
}
</script>
<style lang="less" scoped>
img{
        height: 245px;
        text-align: left
    }
</style>