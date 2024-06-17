import Vue from 'vue'
import App from './App.vue'
import axios from '@/request/index'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.use(axios);
    }
}).$mount('#app')
