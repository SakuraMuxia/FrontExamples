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

Vue.config.productionTip = false
Vue.use(filters);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')