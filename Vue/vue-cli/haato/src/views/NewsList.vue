<template lang="">
    <div>
        <h4>新闻列表页</h4>
        <nav>
            <router-link :to="{name:'sports'}">体育新闻</router-link> |
            <router-link :to="{name:'games'}">娱乐新闻</router-link> |
            <router-link :to="{name:'criminality'}">犯罪新闻</router-link>
        </nav>
        <!-- 子路由出口 -->
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'NewsList'
}
</script>
<style lang="">
    
</style>