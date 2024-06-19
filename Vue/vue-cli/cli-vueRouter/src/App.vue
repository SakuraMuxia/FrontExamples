<template>
    <div id="app">
        <h1>Hello App!</h1>
        <p>
            <!-- 使用 router-link 组件来导航 -->
            <!-- 通过传入 `to` 属性指定链接 -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/home">Go to home</router-link><br>
            <router-link to="/ayame">Go to ayame</router-link><br>
            <router-link to="/kawaiiayame">Go to ayame</router-link><br>
            <router-link :to="{name:'kawaiiaqua'}">Go to aqua</router-link><br>
            <router-link to="/fubuki">Go to fubuki</router-link><br>
        </p>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
        <!-- 单页面多路由出口 -->
        <router-view name="FubukiHeader"></router-view>
        <router-view name="FubukiMain"></router-view>
        <router-view name="FubukiFooter"></router-view>
    </div>
</template>

<script>
export default{
    name:"App.vue",
    data(){
        return{
        
        }
    }
}

</script>

<style lang="less">

</style>
