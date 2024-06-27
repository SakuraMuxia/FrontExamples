<template>
    <div>
        <div class="row">
            <div class="col-xs-offset-2 col-xs-8">
                <div class="page-header">
                    <h2>雨落辰潇</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-2 col-xs-offset-2">
                <div class="list-group">
                    <router-link class="list-group-item" to="/news">新闻</router-link>
                    <router-link class="list-group-item" to="/film">电影</router-link>
                </div>
            </div>
            <div class="col-xs-6">
                <div class="panel">
                    <div class="panel-body">
                        <!-- news,film路由出口 -->
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"App",
}
</script>

<style lang="less">

</style>
