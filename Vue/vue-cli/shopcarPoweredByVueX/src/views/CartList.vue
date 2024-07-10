<template>
    <div>
        <h3>购物车列表界面</h3>
        <template v-if="this.cartList.length > 0">
            <div v-for="item in cartList" :key="item.id">
                <p>商品名称：{{ item.goodsName }}</p>
                <p>商品价格：{{ item.goodsPrice | currency }}</p>
                <p>购买数量：{{ item.buyNum }}</p>
                <hr />
            </div>
            <h3>合计: {{ sumPrice | currency }}</h3>
        </template>
        <h3 v-else>购物车空空如也！</h3>
    </div>
</template>

<script>
import { mapGetters,mapState} from 'vuex';
export default {
    name: "CartList",
    methods:{
        
    },
    computed:{
        // 获取store中cart模块中的cartList数据状态
        // cartList() {
        //     return this.$store.state.cart.cartList
        // },
        // 计算总价
        ...mapGetters("cart",["sumPrice"]),
        ...mapState("cart", ["cartList"])
    },
    mounted(){
        
    }
}
</script>

<style scoped>

</style>