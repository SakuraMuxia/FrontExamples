<template>
    <div class="container">
        <nav>
            <router-link exact to="/">添加商品</router-link>|
            <router-link to="/goodsList">商品列表</router-link>|
            <router-link to="/cartList">购物车列表</router-link>|
            <router-link to="/my">个人中心</router-link>
        </nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
export default {
    name: "Index"
}
</script>

<style lang="less" scoped>
.container {
    text-align: center;

    nav {
        a {
            color: skyblue;
            margin: 5px;
        }

        a.active {
            color: red;
        }
    }
}
</style>