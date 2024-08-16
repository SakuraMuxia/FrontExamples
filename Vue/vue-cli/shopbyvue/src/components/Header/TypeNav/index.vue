<template>
    <div class="type-nav">
        <div class="container">
            <!-- 在父元素设置离开 -->
            <div @mouseleave="categroyConstricted" class="nav-left">
                <h2 @mouseenter="isShowCategory=true" class="all">全部商品分类</h2>
                <div class="sort" v-show="isShowCategory">
                    <div @click="goSearch" class="all-sort-list2">
                        <!--  全部商品分类-->
                        <div v-for="c1 in categoryList" :key="c1.categoryId" class="item">
                            <h3>
                                <a data-level="1" :data-id="c1.categoryId"> {{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix">
                                <div v-for="c2 in c1.categoryChild" :key="c2.categoryId" class="subitem">
                                    <dl class="fore">
                                        <dt>
                                            <a data-level="2" :data-id="c2.categoryId" href="">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a data-level="3" :data-id="c3.categoryId" href="">{{ c3.categoryName
                                                    }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a>服装城</a>
                <a>美妆馆</a>
                <a>尚品汇超市</a>
                <a>全球购</a>
                <a>闪购</a>
                <a>团购</a>
                <a>有趣</a>
                <a>秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
// 导入api接口方法
import { mapActions, mapState } from 'vuex';
export default {
    name: "TypeNav",
    data(){
        return{
            // 是否展开分类页面,当路径为/展开,默认展开
            isShowCategory:this.$route.path === "/",
        }
    },
    mounted() {
        // 触发action中的方法
        this.getBaseCategoryListAsync(15);
    },
    methods:{
        // 分类展开方法,如果路径不是/ 不展开分类
        categroyConstricted(){
            if (this.$route.path !== '/'){
                this.isShowCategory = false;
            }
        },
        // 点击分类跳转
        goSearch(e){
            const {id,level} = e.target.dataset;
            // 如果id存在，点击后路由到/search并且拼接查询字符串
            if(id){
                this.$router.push({
                    path:"/search",
                    query:{
                        // category2Id:12
                        ["category"+level+"Id"]:id,
                        categoryName:e.target.innerText.trim(),
                        keyword: this.$route.query.keyword,

                    }
                })
                // 点击后 分类页隐藏
                this.isShowCategory = false;
                
            }
        },
        // 快速获取action中的方法，并映射为this
        ...mapActions("product", ["getBaseCategoryListAsync"]),
    },
    // 监听数据变化
    watch:{
        // 当路由路径发生变化，更新isShowCategory状态
        "$route.path":{
            handler(){
                this.isShowCategory = this.$route.path === '/';
            }
        }
    },
    computed: {
        // 借助mapState，映射store中product模块中的categoryList
        ...mapState("product", ["categoryList"]),
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            border-top: 2px solid #e1251b;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        &:hover {
                            background-color: #d9d9d9;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 74px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 570px;
                                    padding: 2px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>