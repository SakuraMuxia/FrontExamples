import Vue from 'vue'
import VueRouter from 'vue-router'

import Film from "@/views/Film";
import Pages from "@/views/Pages";
import Details from '@/views/Details.vue'

import News from "@/views/News";
import Vtuber from '@/views/Vtuber.vue';
import Gaming from '@/views/Gaming.vue';


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
                path: "/film/:type",
                component: Pages,
                children:[
                    {
                        path:":id",
                        component:Details
                    }
                ]
            },
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
