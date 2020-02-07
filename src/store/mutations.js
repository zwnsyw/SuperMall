import{ADD_COUNTER , ADD_TO_CART}from './mutation-type'

export default {
  // mutations尽量做单一的事件，devtools才好跟踪数据
  [ADD_COUNTER](state , payload){
    payload.count++
  },
  [ADD_TO_CART](state , payload){
    payload.checked = true
    state.carList.push(payload)
  }
 
}