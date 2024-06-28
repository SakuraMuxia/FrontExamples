<template lang="">
    <div class="holo">
        <h4>HoloLive</h4>
        <p>hololive（日语：ホロライブ）是日本COVER株式会社所制作的虚拟YouTuber捕捉app，也代表其旗下虚拟Youtuber组织『hololive Production』的女子组</p>
        
        <h5>$store.state</h5>
        <div id="info">
            <p :style="{ color:'pink',fontSize:'18px',}">零期生的数量 : {{$store.state.ZeroGeneration}}</p>
            <p :style="{ color:'#FF00FF',fontSize:'18px',}">一期生的数量 : {{$store.state.FirstGeneration}}</p>
            <p :style="{ color:'#00FF00',fontSize:'18px',}">二期生的数量 : {{$store.state.SecondGeneration}}</p>
            <p :style="{ color:'#FF2400',fontSize:'18px',}">三期生的数量 : {{$store.state.ThirdGeneration}}</p>
            <p :style="{ color:'#38B0DE',fontSize:'18px',}">四期生的数量 : {{$store.state.FourthGeneration}}</p>
        </div>
        
        <h5>mapState</h5>
        <div id="info2">
            <p :style="{ color:'pink',fontSize:'18px',}">零期生的数量 : {{ZeroGeneration}}</p>
            <!-- <p :style="{ color:'#FF00FF',fontSize:'18px',}">一期生的数量 : {{FirstGenerationAlias}}</p> -->
            <p :style="{ color:'#00FF00',fontSize:'18px',}">二期生的数量 : {{SecondGeneration}}</p>
            <!-- <p :style="{ color:'#FF2400',fontSize:'18px',}">三期生的数量 : {{ThirdGeneration}}</p> -->
            <p :style="{ color:'#38B0DE',fontSize:'18px',}">四期生的数量 : {{FourthGeneration}}</p>
            <!-- <p :style="{ color:'pink',fontSize:'18px',}">总数量 : {{SumGeneration}}</p> -->
        </div>
    </div>
</template>
<script>
import {mapState} from "@/js/Yuluo";
export default {
    name:"HoloLive",
    data(){
        return{
            
        }
    },
    computed:{
        // 传统计算属性形式
        FourthGeneration(){
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

        // // 普通函数形式：把store对象中的state中的属性名SecondGeneration，映射到实例vc的原型VUE的上
        // ...mapState({
        //     ThirdGeneration(state){
        //         return state.ThirdGeneration
        //     },
        // }),

        // 其他计算属性
        // SumGeneration(){
        //     return this.FirstGenerationAlias + this.ZeroGeneration + this.SecondGeneration + this.ThirdGeneration + this.FourthGeneration;
        // }
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