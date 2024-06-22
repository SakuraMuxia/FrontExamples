<template lang="">
    <div id="app">
        <p>这里是Home.vue</p>
        <nav>
            <router-link active-class="active" to="/nowplaying">正在热映</router-link> |
            <router-link active-class="active" to="/comingsoon">即将上映</router-link>
        </nav>
        <!-- 路由出口 匹配到 /nowplaying,/comingsoon 将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>