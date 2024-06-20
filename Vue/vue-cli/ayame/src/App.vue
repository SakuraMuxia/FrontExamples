<template>
    <div id="app">
        <nav>
            <router-link exact to="/">首页</router-link> |
            <!-- <router-link :to="{
                path:'newslist',
                query:{
                    username: 'hanser',
                    age:12,
                    friends:{
                        username:'yousa',
                        age:14,
                    },
                }, 
            }">新闻列表</router-link> | -->
            <router-link to="/newslist?username='yousa'">新闻资讯</router-link> |
            <router-link to="/goodslist">商品列表</router-link> |
            <router-link to="/carshopping">购物车</router-link> |
            <router-link to="/my">个人中心</router-link> |
        </nav>
        <!-- 路由出口 -->
        <router-view></router-view>
    </div>
</template>

<style lang="less" scoped>
    nav {
        padding: 30px;
        text-align: center;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.active{
                color: #42b983;
            }
        }
    }
</style>
