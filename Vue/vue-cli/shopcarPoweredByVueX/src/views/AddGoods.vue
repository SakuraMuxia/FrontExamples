<template>
    <div>
        <input v-model="message" type="text">
        <br>
        <p>message：{{ this.message }}</p>
        <button @click="this.ADD_Number">+1</button>

        <p>商品名称：<input ref="goodsNameRef" type="text"></p>
        <p>商品价格：<input ref="goodsPriceRef" type="text"></p>
        <button @click="addGoods">提交</button>
    </div>
</template>

<script>
import { mapMutations,mapState } from "vuex";
export default {
    name: "AddGoods",
    data(){
        return{

        }
    },
    methods: {

        ...mapMutations("goods",["ADD_GOODS"]),
        ...mapMutations(["ADD_Number"]),
        addGoods(){
            // 判断是否登陆=>localStorage中是否存在 token字段
            if (localStorage.getItem("token")) {
                // 获取商品名称和商品价格
                const goodsName = this.$refs.goodsNameRef.value.trim();
                const goodsPrice = this.$refs.goodsPriceRef.value.trim();
                // 判断不能为空
                if (goodsName.length === 0 || goodsPrice.length === 0) {
                    alert("商品名称或价格不允许为空！");
                    return;
                }
                // 直接调用store仓库中的方法
                this.ADD_GOODS({ goodsName, goodsPrice })
                // 跳转到商品列表
                this.$router.push("/goodsList");
            }else{
                // 没有登陆则跳转到登陆页面,并在查询字符串中保存当前的路由
                this.$router.push({
                    path: "/login",
                    query:{
                        cb: this.$route.path
                    }
                })
            }
            
            
        }
    },
    computed:{
        ...mapState(["num"]),
        message:{
            get() {
                return this.$store.state.message
            },
            set(value) {
                this.$store.commit('UP_Message', value)
            }
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped></style>