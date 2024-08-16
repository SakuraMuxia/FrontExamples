<template lang="">
    <div>
        <!-- 商品完成添加到购物车 -->
        <div class="cart-complete-wrap">
            <div class="cart-complete">
                <h3>
                    <i class="iconfont icon-success"></i>商品已成功加入购物车！
                </h3>
                <div class="goods">
                    <div class="left-good">
                        <div class="left-pic">
                            <img width="60" height="60" :src="addCartInfo.skuDefaultImg">
                        </div>
                        <div class="right-info">
                            <p class="title">{{addCartInfo.skuName}}</p>
                            <!-- <p class="attr">颜色：WFZ5099IH/5L钛金釜内胆 数量：1</p> -->
                            <p v-for="item in addCartInfo.attrList" :key="item.id" class="attr">
                                {{item.saleAttrName}}:{{ item.spuSaleAttrValueList.find(v=>v.isChecked==='1').saleAttrValueName }}
                            </p>
                            <p class="attr">数量：{{addCartInfo.buyNum}}</p>
                            <p class="attr">价格：{{addCartInfo.price}}</p>
                        </div>
                    </div>
                    <div class="right-gocart">
                        <a @click.prevent="$router.go(-1)" href="#" class="sui-btn btn-xlarge">查看商品详情</a>
                        
                        <router-link to="/cart" class="sui-btn btn-xlarge btn-danger ">去购物车结算 &gt; </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddCartSuccess",
    data(){
        return{
            addCartInfo: sessionStorage.getItem("addCartInfo") ? JSON.parse(sessionStorage.getItem("addCartInfo")):{}
        }
    },
    beforeRouteEnter(to, from, next){
        if (from.meta.isGoaddCartSuccess) next();
        else next("/")
    }
}
</script>
<style lang="less" scoped>
.cart-complete-wrap {
    background-color: #f4f4f4;
    .cart-complete {
        width: 1200px;
        margin: 0 auto;
        h3 {
            font-weight: 400;
            font-size: 16px;
            color: #6aaf04;
            padding-top: 15px;
            padding-bottom: 15px;
            margin: 0;
            .icon-pc-right {
                background-color: #fff;
                border: 2px solid #6aaf04;
                padding: 3px;
                margin-right: 8px;
                border-radius: 15px;
            }
        }
        .goods {
            overflow: hidden;
            padding: 10px 0;
            .left-good {
                float: left;
                .left-pic {
                    border: 1px solid #dfdfdf;
                    width: 60px;
                    float: left;
                }
                .right-info {
                    color: #444;
                    float: left;
                    margin-left: 10px;

                    .title {
                        width: 100%;
                        line-height: 28px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                    }

                    .attr {
                        color: #aaa;
                    }
                }
            }
            .right-gocart {
                float: right;

                a {
                    padding: 7px 36px;
                    font-size: 15px;
                    line-height: 22px;
                    color: #333;
                    background-color: #eee;
                    text-decoration: none;
                    box-sizing: border-box;
                    border: 1px solid #e1e1e1;
                }

                a:hover {
                    background-color: #f7f7f7;
                    border: 1px solid #eaeaea;
                }

                a:active {
                    background-color: #e1e1e1;
                    border: 1px solid #d5d5d5;
                }

                .btn-danger {
                    background-color: #e1251b;
                    color: #fff;
                }

                .btn-danger:hover {
                    background-color: #e1251b;
                }
            }
        }
    }
}
</style>