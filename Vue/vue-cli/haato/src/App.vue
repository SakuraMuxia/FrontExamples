<template>
    <div id="app">
        <nav>
            <router-link :to="{ name: 'home' }">首页</router-link> |
            <router-link :to="{name:'userslist'}">Git列表</router-link> |
            <router-link to="/newslist">新闻列表</router-link> |
        </nav>
        
        <router-view></router-view>
    </div>
</template>
<script>
    export default{
        name:"App"
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
p{
    color: #2c3e50;
    font-weight: bold;
    text-align: left
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
