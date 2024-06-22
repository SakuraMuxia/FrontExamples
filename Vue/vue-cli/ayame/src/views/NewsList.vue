<template>
    <div>
        <h3>新闻列表界面</h3>
        <p>艺名: {{$route.params.username}}</p>
        <!-- <p>艺名: {{this}}</p> -->
        <!-- <p>朋友: {{ $route.query.username}}</p> -->
    </div>
</template>
<!--  -->
<script>
export default {
    // 年龄:{{ this.$route.query.age }},他的朋友:{{ this.$route.query.friends.username}}
    name: "NewsList.vue",
    mounted() {
        console.log("mounted");
    },
    updated() {
        // $route属性在 Vuecomponent的实例vc的原型Vue的实例vm的原型上
        console.log("updated");
    },
    watch:{
        "$route.query":{
            handler(){
                console.log("watch",this)
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
    p{
        color: rgb(186, 67, 229);
        font-size: medium;
    }
</style>