<template lang="">
    <div>
        <h3>搜索界面,接收的参数：{{$route.query}}</h3>
    </div>
</template>
<script>
export default {
    name: "Search",
}
</script>
<style lang="less" scoped>
h3 {
    padding: 50px;
    background: yellow;
}
</style>