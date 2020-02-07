import{ADD_COUNTER , ADD_TO_CART}from './mutation-type'

export default {
  addCart(context, payload){
    return new Promise((resolve, reject)=>{

    // console.log(payload)
    payload.names = 1
    // console.log(payload)
    // js中object.key = value,就可以先object里面添加新的一对>>   "key": value
    // 例如： obj={"name": "zwnsyw"},  obj.age= 18    >>obj={"name": "zwnsyw","age": 18}

    // payload新添加的商品
    // 1. 查找之前的数组中是否有该商品
    let oldProduct = context.state.carList.find(item => item.iid === payload.iid)
    // 2. 判断oldProduct
    if (oldProduct){  // 数量+1
      // oldProduct.count +=1
      context.commit(ADD_COUNTER , oldProduct)
      resolve("当前商品数量 + 1")
    }else{ // 添加新商品
      payload.count =1,
      // context.state.carList.push(payload)
      context.commit(ADD_TO_CART , payload)
      resolve('添加购物车成功')
    }
    })
  }
}