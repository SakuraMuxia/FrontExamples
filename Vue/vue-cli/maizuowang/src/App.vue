<template>
    <div>
        <div class="btn">
            <button :class="{ active: type === 1 }" @click="type = 1">正在热映</button>
            <button :class="{ active: type === 2 }" @click="type = 2">即将上映</button>
        </div>

        <div class="page">
            <a v-show="pageNum > 1" @click.prevent="hanser(--pageNum)">上一页</a>
            {{ pageNum }}/{{ pageSum }}
            <a v-show="pageNum < pageSum" @click.prevent="hanser(++pageNum)">下一页</a>
        </div>

        <loading v-if=" isLoading"></loading>

        <template v-else>
            <div v-for="film in filmsList" :key="film.filmId">
                <img height="200" :src="film.poster" />
                <p>{{ film.name }}</p>
                <hr />
            </div>
        </template>
    </div>
</template>

<script>
// 卖座网API
// 正在热映：https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9925800
// 即将上映：https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=9925800
// 导入实例的get请求方法
// import getGateway from "@/api/mzApi"

import {getFilms} from "@/api/mzApi.js"

export default {
    name: 'App',
    data() {
        return {
            type: 1,
            filmsList: [],
            isLoading: false,
            pageNum:1,  //当前页
            pageSum:1,   // 总页数
            pageSize:3   // 每页的数量
        }
    },
    methods: {
        // vue实例的方法
        async hanser(pageNum=1) {
            this.isLoading = true;
            const {data:{data:{films,total}}} = await getFilms(pageNum,this.pageSize,this.type);
            console.log(films, total);
            this.isLoading = false;
            this.filmsList = films;
            this.pageSum = Math.ceil(total / this.pageSize);
            this.pageNum = pageNum;
        }
    },
    mounted() {
        
    },
    watch: {
        // 当type值改变时
        type: {
            handler() {
                // 设置初始当前页
                this.pageNum = 1;
                // 调用发送请求方法
                this.hanser();
            },
            immediate: true
        }
    }
}
</script>

<style lang="less">
.btn {
    button {
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
    }

    button.active {
        color: yellowgreen;
    }
}
.page {
    a {
        color: pink;
        background-color: aqua;
        margin: 2px;
        cursor: pointer;
    }
}
</style>
