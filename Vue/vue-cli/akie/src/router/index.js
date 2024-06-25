import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import Index from '@/views/Index.vue'
import Home from '@/views/Home.vue'
import GoodsList from '@/views/GoodsList.vue'
import NewsList from '@/views/NewsList.vue'
import My from '@/views/My.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Index,
        children: [
            {
                path: "/",
                component: Home
            }, 
            {
                path: "/goodsList",
                component: GoodsList
            }, 
            {
                path: "/newsList",
                component: NewsList
            }, 
            {
                path: "/my",
                component: My
            }
        ]
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "*",
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
