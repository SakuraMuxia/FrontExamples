<template lang="">
    <div>
        <!-- 购物车列表 -->
        <div v-if="cartList.length>0" class="cart">
            <h4>全部商品</h4>
            <div class="cart-main">
                <div class="cart-th">
                    <div class="cart-th1">全部</div>
                    <div class="cart-th2">商品</div>
                    <div class="cart-th4">单价</div>
                    <div class="cart-th4">数量</div>
                    <div class="cart-th5">小计（元）</div>
                    <div class="cart-th6">操作</div>
                </div>
                <div class="cart-body">
                    <ul class="cart-list"
                        v-for="item in cartList"
                        :key="item.id">
                        <li class="cart-list-con1">
                            <input type="checkbox" 
                            name="chk_list" 
                            :checked="item.isChecked===1"
                            @change="$store.dispatch('cart/getCartIsCheckedByIdAsync',{
                                skuID:item.skuId,
                                // isChecked取反
                                isChecked:item.isChecked===1?0:1
                            })"
                            >
                        </li>
                        <li class="cart-list-con2">
                            <img :src="item.imgUrl">
                            <div class="item-msg">{{item.skuName}}</div>
                        </li>
                        <li class="cart-list-con4">
                            <span class="price">{{item.skuPrice|currency(2,"￥")}}</span>
                        </li>
                        <li class="cart-list-con5">
                            <a href="javascript:void(0)" 
                                @click.prevent="upBuyNumByOrificing(item.skuId,item.skuNum,-1)"
                                :class="{'mins':true,'disabled':item.skuNum===1}">-</a>
                            <input 
                                autocomplete="off" 
                                type="text" 
                                :value="item.skuNum" 
                                minnum="1" 
                                @change="inputBuyNum($event,item.skuId,item.skuNum)"
                                class="itxt">
                            <a href="javascript:void(0)" 
                                @click.prevent="upBuyNumByOrificing(item.skuId,item.skuNum,1)"
                                :class="{'plus':true,'disabled':item.skuNum===200}">+</a>
                        </li>
                        <li class="cart-list-con6">
                            <span class="sum">{{(item.skuNum*item.skuPrice) | currency(2,"￥")}}</span>
                        </li>
                        <li class="cart-list-con7">
                            <a 
                            href="#none" 
                            @click.prevent="$store.dispatch('cart/deleteCartListByIdAsync',item.skuId)"
                            class="sindelet">删除</a>
                            <br>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cart-tool">
                <div class="select-all">
                    <input 
                        class="chooseAll"
                        @change="$store.dispatch('cart/postBatchCheckCartAsync')" 
                        :checked="getCartIsChecked"
                        type="checkbox">
                    <span>全选</span>
                </div>
                <div class="option">
                    <a 
                    @click="$store.dispatch('cart/deleteCartListBatchAsync')"
                    v-if="getCountResult.checkedNum>0"
                    href="#none">删除选中的商品</a>
                </div>
                <div class="money-box">
                    <div class="chosed">已选择
                        <span>{{getCountResult.checkedNum}}</span>件商品</div>
                    <div class="sumprice">
                        <em>总价（不含运费） ：</em>
                        <i class="summoney">{{getCountResult.checkedPrice | currency(2,"￥")}}</i>
                    </div>
                    <div class="sumbtn">
                        <router-link class="sum-btn" to="/Trade">结算</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty">
            <h3>购物车空空如也</h3>
            <img width="300px" src="../../assets/images/empty.gif" alt="">
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { goodsNumReg } from '@/utils/reg';
import { debounce } from "lodash";

export default {
    name:"Cart",
    data(){
        return{
            buyNum:1,
            isReaday:true,
        }
    },
    methods:{
        // 购物车商品的加减(未使用节流)
        async upBuyNum(skuId,skuNum,flag){
            // 判断边界问题
            const num = skuNum + flag;
            
            if (num < 1 || num > 200){
                return
            }else{
                // 调用异步请求
                await this.$store.dispatch("cart/postAddToCartAsync", {
                    skuId,
                    // 根据后端的接口说明，每次都是在上一次的基础上进行添加和删除
                    skuNum: flag
                })
                // 更新本地数据
                this.$store.commit("cart/UP_CART_SKU_NUM", { 
                    skuId,
                    num
                })
            }
        },
        // 购物车商品的加减(使用节流)
        async upBuyNumByOrificing(skuId, skuNum, flag){
            // 技能未冷却，返回
            if (!this.isReaday){
                return;
            }
            // 判断边界问题
            const num = skuNum + flag;
            // 触发技能，技能冷却
            this.isReaday = false;
            if (num < 1 || num > 200) {
                return
            } else {
                // 调用异步请求
                await this.$store.dispatch("cart/postAddToCartAsync", {
                    skuId,
                    // 根据后端的接口说明，每次都是在上一次的基础上进行添加和删除
                    skuNum: flag
                })
                // 更新本地数据
                this.$store.commit("cart/UP_CART_SKU_NUM", {
                    skuId,
                    num
                })
            }
            // 冷却结束
            this.isReaday = true;
        },
        // 输入框修改商品的数量(未使用防抖)
        async changeBuyNum(e,skuId,skuNum){
            // 获取输入的数字
            const buyNum = e.target.value.trim()/1;
            // 使用正则判断是否合法
            if (goodsNumReg.test(buyNum)){
                console.log(buyNum);
                // 调用异步请求
                await this.$store.dispatch("cart/postAddToCartAsync", {
                    skuId,
                    // 根据后端的接口说明，每次都是在上一次的基础上进行添加和删除
                    skuNum: buyNum-skuNum,
                });
                // 刷新页面数据
                this.$store.commit("cart/UP_CART_SKU_NUM", {
                    skuId,
                    num:buyNum
                })
            }
        },
        // 输入框修改商品的数量(使用debounce防抖)
        inputBuyNum: debounce(async function (e, skuId, skuNum){
            // 获取输入的数字
            const buyNum = e.target.value.trim() / 1;
            // skuNum:是修改前的数据
            if (goodsNumReg.test(buyNum)) {
                console.log(buyNum);
                // 调用异步请求
                await this.$store.dispatch("cart/postAddToCartAsync", {
                    skuId,
                    // 根据后端的接口说明，每次都是在上一次的基础上进行添加和删除
                    skuNum: buyNum - skuNum,
                });
                // 刷新页面数据
                this.$store.commit("cart/UP_CART_SKU_NUM", {
                    skuId,
                    num: buyNum
                })
            }else{
                // 如果不符合正则表达式，把输入框的内容更改为原来的数值
                e.target.value = skuNum;
            }
        },1000)
    },
    mounted(){
        this.$store.dispatch("cart/getCartListAsync");
    },
    computed:{
        ...mapState("cart", ["cartList"]),
        ...mapGetters("cart", ['getCountResult','getCartIsChecked'])
    }
}
</script>
<style lang="less" scoped>
.empty{
    text-align: center;
    padding: 200px;
}
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            &>div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                &>li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        &.disabled {
                            color: #ccc;
                            cursor: not-allowed
                        }
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                        &.disabled{
                            color: #ccc;
                            cursor:not-allowed
                        }
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }


            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>