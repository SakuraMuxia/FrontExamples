<template lang="">
    <div>
        <h2>新闻页面</h2>
        <div>
            <ul class="nav nav-tabs">
                <li><router-link class="list-group-item" to="/news/vtuber">虚拟社团</router-link></li>
                <li><router-link class="list-group-item" to="/news/gaming">体育赛事</router-link></li>
            </ul>
            <br>
            <!-- 新闻列表 -->
            <router-view></router-view>
        </div>
        <br>
    </div>
</template>
<script>

export default {
    name:"News",
    data(){
        return{
            news:{},
            
        }
    },
    methods:{
        
    },
    mounted(){
        // 获取query传来的参数，并设置默认值
        
    },
    
    

}
</script>
<style lang="">
    
</style>