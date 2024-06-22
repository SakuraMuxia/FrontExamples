import Vue from 'vue'
import VueRouter from 'vue-router'
import NowPlaying from '@/views/NowPlaying'
import ComingSoon from '@/views/ComingSoon'
import Details from '@/views/Details'

Vue.use(VueRouter)

const routes = [
    {
        path: '/film/:filmId',
        name: 'film',
        component: Details,
    },
    {
        path: '/',
        redirect: '/nowplaying',
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

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
