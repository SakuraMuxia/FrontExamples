import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

Vue.use(VueRouter);

// 定义路由
const routes = [
    {
        path:'/',
        component:Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/search',
        component: Search,
    },
]

// 创建路由对象
const router = new VueRouter({
    mode:history,
    routes,
});

// 导出
export default router;

