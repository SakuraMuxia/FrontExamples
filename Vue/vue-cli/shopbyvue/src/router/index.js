import Vue from 'vue';
import VueRouter from 'vue-router';
import enVueRouter from '@/utils/pushReWrite';
import '@/utils/gotoSearch';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';

Vue.use(VueRouter);
// 重写push,replace方法
enVueRouter("push");
enVueRouter("replace");

// 定义路由
const routes = [
    {
        path:'/',
        component:Home,
        meta:{
            isTypeNav:true,
        }
    },
    {
        path: '/login',
        component: Login,
        meta:{
            // 隐藏页脚中的列表信息
            isHideFooterList:true,
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            // 隐藏页脚中的列表信息
            isHideFooterList: true,
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            // 是否使用导航
            isTypeNav: true
        }
    },
]

// 创建路由对象
const router = new VueRouter({
    mode:"history",
    routes,
});

// 导出
export default router;

