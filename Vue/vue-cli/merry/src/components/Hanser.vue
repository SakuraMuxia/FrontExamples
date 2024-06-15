<template lang="">
    <div>
        <h3>HanserApp:{{t | date}}</h3>
    </div>
</template>
<script>
export default {
    name:'Hanser',
    props:{
        num:{
            type:Number,
            default:100
        }
    },
    data() {
        return {
            t: Date.now() - 9999999999
        }
    }
}
</script>
<style lang="less">
    h3{
        color:green;
    }
</style>