<template lang="">
    <div>
        <h3>Github</h3>
        <div v-for="item in $store.state.items" :key="item.id">
            {{item.full_name}}
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:'App',
    methods:{
        ...mapActions(["getItems"])
    },
    mounted(){
        this.getItems("Hanser's_Payload");
    }
}
</script>
<style lang="less" scoped>
    div{
        h3{
            color:red;
        }
    }
</style>
