import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Aqua from '@/pages/Aqua.vue'
import Ayame from '@/pages/Ayame.vue'

import FubukiHeader from '@/pages/FubukiHeader.vue'
import FubukiMain from '@/pages/FubukiMain.vue'
import FubukiFooter from '@/pages/FubukiFooter.vue'

// 挂载VueRouter对象
Vue.use(VueRouter);
Vue.config.productionTip = false

// 定义路由组件
const routes = [
    {
        path:"/home",
        // 重定向
        redirect:'/'
    },{
        path: "/ayame",
        // 别名
        alias:"/kawaiiayame",
        component: Ayame,
    },{
        path: "/",
        // 设置name
        name: "kawaiiaqua",
        component: Aqua,
    },{
        path:"/fubuki",
        components:{
            FubukiHeader,
            FubukiMain,
            FubukiFooter
        }
    }
]

// 创建路由实例
const router = new VueRouter({
    routes,
    mode:"history",
})


// 创建Vue实例
new Vue({
    render: h => h(App),
    // 在Vue实例上,配置router选项。
    router:router,
}).$mount('#app') // 挂载到index.html中
