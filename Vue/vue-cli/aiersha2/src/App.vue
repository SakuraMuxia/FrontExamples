<template>
    <div id="app">
        <h3>APP首页</h3>
        <HoloLive></HoloLive>
    </div>
</template>
<script>
import HoloLive from "@/components/HoloLive.vue"
export default {
    name:"App",
    components:{
        HoloLive,
    },
    mounted() {
        console.log("App");
    },
}
</script>
<style lang="less" scoped>
    
</style>
