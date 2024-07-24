<template lang="">
    <div class="main">
        <h3>搜索界面,接收的参数：{{$route.query}}</h3>
        <div class="py-container">
            <!--bread-->
            <div class="bread" v-show="isSelector">
                <ul class="fl sui-breadcrumb">
                    <li>
                        <a href="#">全部结果</a>
                    </li>
                </ul>
                <ul class="fl sui-tag">
                    <!-- 面包屑 类别添加以及移除 -->
                    <li v-if="$route.query.categoryName" class="with-x">
                        {{$route.query.categoryName}}<i @click="moveCategoryName">×</i>
                    </li>
                    <!--  关键词内容 -->
                    <li v-if="$route.query.keyword" class="with-x">
                        {{$route.query.keyword}}<i @click="moveKeyword">×</i>
                    </li>
                    <!--  品牌内容 -->
                    <li v-if="$route.query.trademark" class="with-x">
                        {{$route.query.trademark|trademark}}<i @click="moveTrademark">×</i>
                    </li>
                    <!-- 属性内容显示 -->
                    <li v-for="(item,index) in $route.query.props" :key="index" class="with-x">
                        {{item.split(":")[1]}}<i @click="moveProps(item)">×</i>
                    </li>
                </ul>
            </div>
            <!--selector-->
            <SearchSelector></SearchSelector>
            <!--details-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li class="active">
                                <a href="#">综合</a>
                            </li>
                            <li>
                                <a href="#">销量</a>
                            </li>
                            <li>
                                <a href="#">新品</a>
                            </li>
                            <li>
                                <a href="#">评价</a>
                            </li>
                            <li>
                                <a href="#">价格⬆</a>
                            </li>
                            <li>
                                <a href="#">价格⬇</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li  v-for="(item,index) in searchResult.goodsList" :key="index" class="yui3-u-1-5">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <a href="item.html"  target="_blank"><img :src="item.defaultImg" /></a>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>{{item.price}}</i>
                                    </strong>
                                </div>
                                <div class="attr">
                                    <a target="_blank" href=""  :title="item.title">{{item.title}}</a>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>{{item.hotScore}}</span>人评价</i>
                                </div>
                                <div class="operate">
                                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pagination">
                    <button>上一页</button>
                    <button>1</button>
                    <span>···</span>

                    <button>14</button>
                    <button>15</button>
                    <button class="active">16</button>
                    <button>17</button>
                    <button>18</button>

                    <span>···</span>
                    <button>21</button>
                    <button>下一页</button>

                    <span>共 103 条</span>
                </div>
            </div>
            <!--hotsale-->
            <div class="clearfix hot-sale">
                <h4 class="title">热卖商品</h4>
                <div class="hot-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="../../assets/images/search/like_01.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>4088.00</i>
                                    </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="../../assets/images/search/like_03.png" />
                                </div>
                                <div class="attr">
                                    <em>金属A面，360°翻转，APP下单省300！</em>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>4088.00</i>
                                    </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="../../assets/images/search/like_04.png" />
                                </div>
                                <div class="attr">
                                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>4068.00</i>
                                    </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有20人评价</i>
                                </div>
                            </div>
                        </li>
                        <li class="yui3-u-1-4">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <img src="../../assets/images/search/like_02.png" />
                                </div>
                                <div class="attr">
                                    <em>Apple苹果iPhone 6s (A1699)</em>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i>4088.00</i>
                                    </strong>
                                </div>
                                <div class="commit">
                                    <i class="command">已有700人评价</i>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";
import SearchSelector from "@/pages/Search/SearchSelector"
export default {
    name: "Search",
    // 使用侦听器
    watch:{
        "$route.query":{
            handler(query){
                this.$store.dispatch("product/postProductListAsync",query)
            },
            immediate:true
        }
    },
    computed:{
        ...mapState("product", ["searchResult"]),
        // 判断隐藏面包屑的方法
        isSelector() {
            // Object.values 返回由对象的属性值组成的数组，把对象的属性值进行过滤，过滤出 undefined的，如果length>0返回真
            // true 代表存在 有查询
            return Object.values(this.$route.query).filter(v => v).length > 0;
        }
    },
    mounted(){
        
    },
    components: { SearchSelector },
    methods:{
        moveCategoryName(){
            // category3Id=249&categoryName=台灯
            // 获取搜索的关键词
            const { keyword } = this.$route.query;
            this.$router.push({
                path:"/search",
                query:{
                    keyword
                }
            })
        },
        moveKeyword(){
            // 解构出把 query进行浅拷贝
            const query = {...this.$route.query};
            // 删除query中的keyword属性
            delete query.keyword;
            // 路由到指定地址
            this.$router.push({
                path: "/search",
                query
            })
        },
        moveTrademark(){
            const query = { ...this.$route.query };
            // 删除query中的keyword属性
            delete query.trademark;
            // 路由到指定地址
            this.$router.push({
                path: "/search",
                query
            })
        },
        // 移除属性过滤
        moveProps(item){
            // 跳转到指定路由
            this.$router.push({
                path: "/search",
                query:{
                    // 把之前的query拼接上
                    ...this.$route.query,
                    // 使用过滤器把props过滤后的拼接上
                    // 把不相等的返回流下来，相等的去除。
                    props: this.$route.query.props.filter(value =>{ return value !== item})
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
h3 {
    padding: 50px;
    background: yellow;
}
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        //margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;

                                    }
                                }
                            }
                        }
                    }
                }
            }

            .pagination {
                text-align: center;

                button {
                    margin: 0 5px;
                    background-color: #f4f4f5;
                    color: gray;
                    outline: none;
                    border-radius: 2px;
                    padding: 0 4px;
                    vertical-align: top;
                    display: inline-block;
                    font-size: 13px;
                    min-width: 35.5px;
                    height: 28px;
                    line-height: 28px;
                    cursor: pointer;
                    box-sizing: border-box;
                    text-align: center;
                    border: 0;

                    &[disabled] {
                        color: #c0c4cc;
                        cursor: not-allowed;
                    }

                    &.active {
                        cursor: not-allowed;
                        background-color: #c81623;
                        color: #fff;
                    }
                }

                span {
                    display: inline-block;
                    line-height: 28px;
                    font-size: 14px;
                    color: gray;
                    vertical-align: middle;
                }
            }
        }

        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;

            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }

            .hot-list {
                padding: 15px;

                ul {
                    display: flex;

                    li {
                        width: 25%;
                        height: 100%;

                        .list-wrap {

                            .p-img,
                            .price,
                            .attr,
                            .commit {
                                padding-left: 15px;
                            }

                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }

                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }

                            .price {
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        //margin-left: -5px;
                                    }
                                }
                            }

                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>