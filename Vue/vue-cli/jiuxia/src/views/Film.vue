<template lang="">
    <div>
        <h2>电影页面</h2>
        <div>
            <ul class="nav nav-tabs">
                <li><router-link  class="list-group-item" to="/film/nowplaying">正在热映</router-link></li>
                <li><router-link  class="list-group-item" to="/film/comingsoon">即将上映</router-link></li>
            </ul>
            <div>
                <!-- 即将上映路由出口 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Home.vue"
}
</script>
<style lang="">
    
</style>