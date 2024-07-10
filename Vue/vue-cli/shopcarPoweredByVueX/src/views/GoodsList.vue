<template>
    <div>
        <h3>商品列表</h3>
        <div v-for="item in goodsList" :key="item.id">
            <p>商品名称：{{ item.goodsName }}</p>
            <p>商品价格：{{ item.goodsPrice | currency }}</p>
            <p>上架时间：{{ item.addTime | date}}</p>
            <button @click="joinCart(item)">加入购物车</button>
            <hr>
        </div>
    </div>

</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
    name: "GoodsList",
    methods:{
        // 映射 JOIN_CART 方法 操作数据
        ...mapMutations("cart",["JOIN_CART"]),
        // 加入购物车方法
        joinCart(payload) {
            // 判断是否存在token
            if (localStorage.getItem("token")) {
                // 调用映射的加入购物车方法
                this.JOIN_CART(payload);
                // 加入后跳转到 cartList界面
                this.$router.push('/cartList');
                // 不存在token 路由指向 /login
            }else{
                this.$router.push({
                    path:'/login',
                    query:{
                        // 定义登陆成功后自动回到当前页面
                        // 当前路由的路径
                        cb:this.$route.path
                    }
                })
            }
        }
    },
    computed:{
        // 映射state数据 goodsList
        ...mapState({
            goodsList:function(state){
                return state.goods.goodsList;
            }
        }),
    },
    mounted(){
        
    },
}
</script>

<style scoped>

</style>