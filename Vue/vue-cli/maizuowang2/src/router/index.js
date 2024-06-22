import Vue from 'vue'
import VueRouter from 'vue-router'
import NowPlaying from '@/views/NowPlaying'
import ComingSoon from '@/views/ComingSoon'
import Details from '@/views/Details'
import Home from "@/views/Home.vue"
Vue.use(VueRouter)

const routes = [
    // 首页
    {
        // 渲染在App.vue中
        path: '/',
        component: Home,
        children:[
            // 匹配的路由 渲染在Home组件中
            {
                path: '/',
                redirect:'/nowplaying',
            },
            {
                path: 'nowplaying',
                name: 'nowplaying',
                component: NowPlaying,
            },
            {
                path: 'comingsoon',
                name: 'comingsoon',
                component: ComingSoon,
            },
        ]
    },
    // 渲染在App.vue中
    {
        path:'/film/:filmId',
        name:'film',
        component:Details,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
