<template>
    <div >
        <h3>调用猫眼数据</h3>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'App',
    data(){
        return{
            
        }
    },
    methods:{
        
    },
    async mounted() {
        const {data} = await axios.get("http://127.0.0.1:8066/maoyan");
        console.log(data);
    },
}
</script>

<style lang="less">

</style>
