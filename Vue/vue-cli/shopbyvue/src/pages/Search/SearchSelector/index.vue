<template lang="">
    <div>
        <div class="clearfix selector">
            <div class="type-wrap logo">
                <div class="fl key brand">品牌</div>
                <div class="value logos">
                    <ul class="logo-list">
                        <li @click="$router.push({
                            path:'/search',
                            query:{
                                ...$route.query,
                                // 按照后台的接口进行控制
                                trademark:item.tmId+':'+item.tmName
                            }
                        })" v-for="item in trademarkList" :key="item.tmId">{{item.tmName}}</li>
                    </ul>
                </div>
            </div>
            <div class="type-wrap" v-for="item in attrsList" :key="item.attrId">
                <div class="fl key">{{item.attrName}}</div>
                <div class="fl value">
                    <ul class="type-list">
                        <li v-for="(info,index) in item.attrValueList" :key="index">
                            <a @click="addPropsGoSearch(item.attrId,info,item.attrName)">{{info}}</a>
                        </li>
                    </ul>
                </div>
                <div class="fl ext"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";
export default {
    name:"SearchSelector",
    data(){
        return{

        }
    },
    computed:{
        ...mapState("product",{
            trademarkList:function(state) {
                // 过滤一次，过滤没有名字的元素
                return state.searchResult.trademarkList;
            },
            attrsList(state){
                return state.searchResult.attrsList;
            }
        })
    },
    methods:{
        // 添加属性栏搜索过滤方法
        addPropsGoSearch(attrId, info, attrName){
            // 定义后端接收的属性值 16:麒麟990:CPU型号
            const propsValue = attrId + ':' + info + ':' + attrName;
            // 判断 this.$route.query中的 props是否有值，如果无值，则为空数组
            const props = this.$route.query.props || [];
            // 如果拥有该属性值，那么程序停止，不重复添加 。
            if (props.includes(propsValue)) return;
            // 如果未拥有属性值，则添加到query，并且路由跳转
            this.$router.push({
                path:'/search',
                query:{
                    // 拼接上之前的query
                    ...this.$route.query,
                    // 设置上新的props属性,并且拼接上之前的props
                    props: [...props,propsValue],
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
.selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;

        .key {
            padding-bottom: 87px !important;
        }
    }

    .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;

        .key {
            width: 100px;
            background: #f1f1f1;
            line-height: 26px;
            text-align: right;
            padding: 10px 10px 0 15px;
            float: left;
        }

        .value {
            overflow: hidden;
            padding: 10px 0 0 15px;
            color: #333;
            margin-left: 120px;
            padding-right: 90px;

            .logo-list {
                li {
                    float: left;
                    border: 1px solid #e4e4e4;
                    margin: -1px -1px 0 0;
                    width: 105px;
                    height: 52px;
                    text-align: center;
                    line-height: 52px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    color: #e1251b;
                    font-style: italic;
                    font-size: 14px;

                    img {
                        max-width: 100%;
                        vertical-align: middle;
                    }
                }
            }

            .type-list {
                li {
                    float: left;
                    display: block;
                    margin-right: 30px;
                    line-height: 26px;

                    a {
                        text-decoration: none;
                        color: #666;
                    }
                }
            }
        }

        .ext {
            position: absolute;
            top: 10px;
            right: 10px;

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
                padding: 0 10px;
                background: #fff;
                border: 1px solid #d5d5d5;
            }

            a {
                color: #666;
            }
        }
    }
}
</style>