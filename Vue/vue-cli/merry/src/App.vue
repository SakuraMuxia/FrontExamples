<template lang="">
    <div>
        <h3>Github</h3>
        <h4 v-if="isLoading">Loading...</h4>
        <h4 v-else-if="isError">过于频繁,请稍后再试...</h4>
        <template v-else>
            <ul>
                <li v-for="item in items" :key="item.id">
                    <p>{{item.full_name}}</p>
                </li>
            </ul>
        </template>
        <hanser></hanser>
    </div>
</template>

<script>
import hanser from '@/components/Hanser.vue';
export default {
    name:'App',
    data(){
        return{
            isLoading:true,
            isError:false,
            items:[]
        }
    },
    components: {
        hanser,
    },
    async mounted(){
        try{
            // 获取数据
            const { data } = await this.$axios.get('/search/repositories', {
                params: {
                    q: "r",
                    sort: "stars"
                }
            });
            // 把获取数据存储到实例的数据状态中
            this.items = data.items;
            // 设置loading标记为假
            this.isLoading = false;
        }catch(err){
            this.isLoading = false;
            this.isError = true;
        }
        
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
