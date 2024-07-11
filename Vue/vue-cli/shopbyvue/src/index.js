import Vue from 'vue'
import App from './App.vue'
// 导入样式
import "@/assets/css/reset.css";
Vue.config.productionTip = false

const vm = new Vue({
    render: h => h(App),
}).$mount('#app')