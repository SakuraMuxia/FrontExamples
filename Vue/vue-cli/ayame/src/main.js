import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 创建Vue实例
new Vue({
    render: h => h(App),
    // 在Vue实例上,配置router选项。
    
}).$mount('#app') // 挂载到index.html中