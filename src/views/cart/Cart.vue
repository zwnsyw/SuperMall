<template>
<div class="cart">
  <!-- 导航 -->
  <!-- <h2>购物车</h2> -->
  <NavBar class="car-nav-bar">
    <div slot="center">购物车({{length}})</div>
  </NavBar>

<!-- 商品列表 -->
  <CartList></CartList>
  
<!--  底部汇总-->
<CarButtomBar></CarButtomBar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CarButtomBar from './childComps/CarButtomBar'


import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CarButtomBar
    },
    computed: {
      // 直接将vuex里getters的方法转成这里的computedshiyong
      // 两种方法
      //第一种[]语法：告诉mapGetters你要转那些方法函数,使用{{getters里面转过来的方法名称}}--->>{{cartLength}}
      // ...mapGetters(['cartLength'])

      // 第二种{}语法：computed里面自己重新取方法名
      ...mapGetters({
        length: 'cartLength'
      })
      
    },
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .car-nav-bar{
    background-color:var(--color-tint);
    color: #fff;
    font-weight: 300;
    /* z-index: 9; */
  }
</style>
