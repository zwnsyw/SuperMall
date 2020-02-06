import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

//  1. 安装插件
Vue.use(Vuex)


// 2. 创建store对象
const store = new Vuex.Store({
  state: {
    carList : []
  },
  mutations,
  actions,
  modules: {
  }
})

// 3. 挂载Vue实例上
export default store
