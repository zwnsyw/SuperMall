import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from "fastclick"

import toast from 'components/common/toast/'


Vue.config.productionTip = false;
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟（1.安装、 2.导入、 3.使用attach）
FastClick.attach(document.body)

// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
