import{ADD_COUNTER , ADD_TO_CART}from './mutation-type'

export default {
  addCart(context, payload){
    // console.log(payload)
    payload.names = 1
    // console.log(payload)
    // js中object.key = value,就可以先object里面添加新的一对>>   "key": value
    // 例如： obj={"name": "zwnsyw"},  obj.age= 18    >>obj={"name": "zwnsyw","age": 18}

    // payload新添加的商品
    // 1. 查找之前的数组中是否有该商品
    let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
    // 2. 判断oldProduct
    if (oldProduct){
      // oldProduct.count +=1
      context.commit(ADD_COUNTER , oldProduct)
    }else(
      payload.count =1,
      // context.state.carList.push(payload)
      context.commit(ADD_TO_CART , payload)
    )
  }
}