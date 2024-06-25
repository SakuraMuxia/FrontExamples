<template>
    <div>
        <nav>
            <router-link exact to="/">首页</router-link> |
            <router-link to="/newsList">新闻列表</router-link> |
            <router-link to="/goodsList">商品列表</router-link> |
            <router-link to="/my">个人中心</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style lang="less" scoped>
    nav{
        a{
            color:skyblue;
            padding:5px;
        }
        a.router-link-active{
            color:rgb(226, 151, 151);
        }
    }
</style>