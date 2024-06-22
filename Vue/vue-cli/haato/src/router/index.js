import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import UsersList from '@/views/UsersList.vue'
import Personal from '@/views/Personal.vue'
import NewsList from '@/views/NewsList.vue'
import sports from '@/views/sports.vue'
import games from '@/views/games.vue'
import criminality from '@/views/criminality.vue'


Vue.use(VueRouter)

const routes = [
    {
        path:'/personal',
        name:'personal',
        component: Personal,
    },{
        path:'/userslist',
        name:'userslist',
        component: UsersList,
    }, {
        path: '/home',
        name:'home',
        component:Home
    },{
        path:'/newslist',
        name:'newslist',
        component:NewsList,
        children:[
            {
                path:'/newslist',
                redirect:'/newslist/sports'
            },
            {
                path:'games',
                name:'games',
                component: games
            },
            {
                path: 'sports',
                name: 'sports',
                component: sports
            },
            {
                path: 'criminality',
                name: 'criminality',
                component: criminality
            },
        ],
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    
})

export default router
