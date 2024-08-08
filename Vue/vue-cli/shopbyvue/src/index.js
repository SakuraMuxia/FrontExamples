import Vue from 'vue'
import App from './App.vue'

// 导入样式
import "@/assets/css/reset.css";
// 导入路由
import router from '@/router/index';
import store from '@/store';
// 导入mock
import "@/mock";
// 导入filters
import filters from "@/filters"
// 导入全局组件
import Pagination from "@/components/Pagination";
// 导入iconfont样式
import "@/assets/iconfont/iconfont.css";

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 忽略vue提示
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(filters);

new Vue({
    store,
    router,
    beforeCreate() {
        // 设置事件总线
        Vue.prototype.$bus = this;
        // 挂载全局组件
        Vue.component("Pagination", Pagination);
    },
    render: h => h(App),
}).$mount('#app')