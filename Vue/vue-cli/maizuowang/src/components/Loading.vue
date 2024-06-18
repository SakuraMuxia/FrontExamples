<template lang="">
    <el-table
        v-loading="loading"
        style="width: 100%">
    </el-table>
</template>
<script>
export default {
    name:'Loading',
    data() {
        return {
            loading: true,
        }
    },
}
</script>
<style lang="less">
    body {
        margin: 0;
    }
</style>