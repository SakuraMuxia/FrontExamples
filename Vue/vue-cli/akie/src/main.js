import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 注册News为全局组件
import News from "@/components/News.vue";
Vue.component("news",News);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
