<template>
    <!-- 项目的最外层 -->
    <div class="outer">
        <!-- 头部 -->
        <Header></Header>
        <!-- Home -->
        <Home></Home>
        <!-- 底部 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
import Home from '@/pages/Home';
export default {
    name: 'App',
    components: {
        Header,
        Footer,
        Home,
    }
}
</script>

<style lang="less" scoped>

</style>
