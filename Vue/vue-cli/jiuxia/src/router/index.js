import Vue from 'vue'
import VueRouter from 'vue-router'

import Film from "@/views/Film";
import News from "@/views/News";
import ComingSoon from "@/views/ComingSoon.vue";
import NowPlaying from "@/views/NowPlaying.vue";
import Vtuber from '@/views/Vtuber.vue';
import Gaming from '@/views/Gaming.vue';
import Details from '@/views/Details.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        redirect:"/news/vtuber"
    },
    {
        path: "/film",
        component: Film,
        children:[
            {
                path:"/film",
                redirect:"/film/nowplaying"
            },
            {
                path: "/film/comingsoon",
                component: ComingSoon,
                children:[
                    {
                        path:":id",
                        component:Details
                    }
                ]
            },
            {
                path: "/film/nowplaying",
                component: NowPlaying
            }
        ] 
    },
    {
        path: "/news",
        name:"news",
        component: News,
        children: [
            {
                path:"/news",
                redirect:"/news/vtuber"
            },
            {
                path: "/news/vtuber",
                component: Vtuber
            },
            {
                path: "/news/gaming",
                component: Gaming
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass:"active"
})

export default router
