import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import news from "@/components/News.vue"

Vue.config.productionTip = false
Vue.component("news",news);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
