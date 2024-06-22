import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import NewsList from "@/views/NewsList";
import GoodsList from "@/views/GoodsList";
import CarShopping from "@/views/CarShopping.vue";
import NotFound from "@/views/NotFound";
import My from "@/views/My";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/newslist/:username',
        name:"newslist",
        component: NewsList,
    },
    {
        path: '/goodslist',
        name: "goodslist",
        component: GoodsList,
    },
    {
        path: '/carshopping',
        name: "carshopping",
        component: CarShopping,
    },
    {
        path: '/my',
        name: "my",
        component: My,
    },
    {
        path: '*',
        component: NotFound,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active"
})

export default router
