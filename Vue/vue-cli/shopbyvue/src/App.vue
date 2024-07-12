<template>
    <!-- 项目的最外层 -->
    <div>
        <!-- 头部 -->
        <Header></Header>
        <!-- 匹配的路由出口 -->
        <router-view></router-view>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
    }
}
</script>

<style lang="less" scoped>

</style>
