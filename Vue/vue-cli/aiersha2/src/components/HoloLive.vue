<template lang="">
    <div class="holo">
        <h4>HoloLive</h4>
        <p>hololive（日语：ホロライブ）是日本COVER株式会社所制作的虚拟YouTuber捕捉app，也代表其旗下虚拟Youtuber组织『hololive Production』的女子组</p>
        
        <h5>mutations 修改数据状态</h5>
        <div id="info">
            <button @click="CHANGE_ZERO(10)">零期生</button>
            <button @click="CHANGE_FIRST(obj)">一期生</button>
            <button @click="Third(obj2)">三期生</button>
            <button>二期生</button>
            <button>四期生</button>
        </div>

        <h5>$store.state</h5>
        <div id="info">
            <p :style="{ color:'pink',fontSize:'18px',}">零期生的数量 : {{$store.state.ZeroGeneration}}</p>
            <p :style="{ color:'#FF00FF',fontSize:'18px',}">一期生的数量 : {{$store.state.FirstGeneration}}</p>
            <p :style="{ color:'#00FF00',fontSize:'18px',}">二期生的数量 : {{$store.state.SecondGeneration}}</p>
            <p :style="{ color:'#FF2400',fontSize:'18px',}">三期生的数量 : {{$store.state.ThirdGeneration}}</p>
            <p :style="{ color:'#38B0DE',fontSize:'18px',}">四期生的数量 : {{$store.state.FourthGeneration}}</p>
            <p :style="{ color:'#38B0DE',fontSize:'18px',}">总计 : {{this.getSumSon}}</p>
        </div>
        
        <h5>mapState</h5>
        <div id="info2">
            <p :style="{ color:'pink',fontSize:'18px',}">零期生的数量 : {{ZeroGeneration}}</p>
            <p :style="{ color:'#FF00FF',fontSize:'18px',}">一期生的数量 : {{FirstGenerationAlias}}</p>
            <p :style="{ color:'#00FF00',fontSize:'18px',}">二期生的数量 : {{SecondGeneration}}</p>
            <p :style="{ color:'#FF2400',fontSize:'18px',}">三期生的数量 : {{ThirdGeneration}}</p>
            <p :style="{ color:'#38B0DE',fontSize:'18px',}">四期生的数量 : {{Fourth}}</p>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import { mapMutations } from '@/js/Yuluo.js';

export default {
    name:"HoloLive",
    data(){
        return{
            obj:{
                num:5,
            },
            obj2:{
                num:6,
            }
        }
    },
    methods: {
        // 定义一个方法，调用$store.commit()方法提交修改
        CHANGE_ZERO(){
            this.$store.commit("CHANGE_ZERO",10);
        },
        // 使用mapMutations辅助函数，注册为this.CHANGE_FIRST
        ...mapMutations(["CHANGE_FIRST",]),
        // 使用mapMutations辅助函数，对象形式
        ...mapMutations({
            Third:'CHANGE_THIRD',
        }),
        // 通过mapGetter辅助函数，映射
        ...mapGetters(["getSum"])
        
    },
    computed:{
        // 传统计算属性形式
        Fourth(){
            return this.$store.state.FourthGeneration;
        },
        // 字符串数组形式：映射的计算属性的名称与 state 的子节点名称相同时,直接传一个字符串数组
        ...mapState(["ZeroGeneration"]),
        // 起别名形式：把store对象中的state中的属性名起别名FirstGenerationAlias，映射到实例vc的原型VUE的上

        ...mapState({
            FirstGenerationAlias: "FirstGeneration",
        }),

        // // 箭头函数形式：把store对象中的state中的属性名SecondGeneration，映射到实例vc的原型VUE的上
        ...mapState({
            // 把state解构出SecondGeneration
            SecondGeneration: ({ SecondGeneration }) => SecondGeneration,
        }),

        //普通函数形式：把store对象中的state中的属性名SecondGeneration，映射到实例vc的原型VUE的上
        ...mapState({
            ThirdGeneration(state){
                return state.ThirdGeneration
            },
        }),

        // 在组件中使用计算属性，调用Vuex中的计算属性
        getSumSon(){
            return this.$store.getters.getSum;
        }
    },

    mounted(){
        console.log("HoloLive");
    }
}
</script>
<style lang="less" scoped>
.holo{
    #info{
        background-color: azure;
    }
    #info2 {
        background-color: azure;
    }
}
    
</style>