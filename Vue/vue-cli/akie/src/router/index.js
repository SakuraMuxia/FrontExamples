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
                component: Home,
                meta:{
                    title:"首页"
                }
            }, 
            {
                path: "/goodsList",
                component: GoodsList,
                meta:{
                    isAuthor:true,
                    title:"商品列表"
                }
            }, 
            {
                path: "/newsList",
                component: NewsList,
                meta: {
                    isAuthor: true,
                    title: "新闻列表",
                },
            }, 
            {
                path: "/my",
                component: My,
                meta:{
                    title: "个人中心",
                    isAuthor:true,
                },
                beforeEnter(to,from,next){
                    // 
                    console.log("beforeEnter");
                    if (localStorage.getItem("userName")) next();
                    else next("/login");
                }
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

// 全局前置守卫
router.beforeEach(function (to,from,next){
    console.log("beforeEach",to);
    // 判断 去往的路由中是否需要认证
    if (to.meta.isAuthor) {
        if (localStorage.getItem("userName")) {
            next();
        } else {
            console.log("to",to);
            // 导航到登陆界面，并且传递一个query，用于保存登陆后自动跳转到原先的界面
            // 同时在login界面，接收query参数，用于跳转。
            next('/login?cb=' + to.path);
        }
    } else next();
})
// 全局解析守卫
router.beforeResolve(function (to, from, next) {
    console.log("beforeResolve");
    next();
})
// 全局后置守卫
router.afterEach(function (to) {
    // console.log("afterEach",next);// undefined
    // console.log("afterEach->from",from);
    // console.log("afterEach->to",to);
    // console.log(to.meta.title)

    console.log("afterEach");
    // 结构赋值，并且设置默认值
    const { title = "vue" } = to.meta;
    // 设置网页标题
    document.title = title;
})

export default router
