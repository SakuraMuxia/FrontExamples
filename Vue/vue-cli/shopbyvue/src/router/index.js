import Vue from 'vue';
import VueRouter from 'vue-router';
import enVueRouter from '@/utils/pushReWrite';
import '@/utils/gotoSearch';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Details from '@/pages/Details';
import AddCartSuccess from '@/pages/AddCartSuccess';
import Cart from "@/pages/Cart"

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
    // 搜索详情路由
    {
        path: "/detail/:id.html",
        component: Details,
        meta: {
            isTypeNav: true,
            ScrollToHeader:true,
        }
    },
    // 加入购物车的路由
    {
        path: "/addCartSuccess",
        component: AddCartSuccess,
    },
    // 购物车页面
    {
        path: "/cart",
        component: Cart,
        meta: {
            isTypeNav: true
        }
    }
]

// 创建路由对象
const router = new VueRouter({
    mode:"history",
    routes,
    scrollBehavior(to, from) {
        if (to.meta.ScrollToHeader) {
            return {
                x: 0,// 横向
                y: 0// 纵向
            }
        }
    }
});

// 导出
export default router;

