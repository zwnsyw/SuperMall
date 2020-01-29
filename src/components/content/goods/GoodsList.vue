<template>
  <div class="goods">
    <GoodsListItem v-for='item in goods' :goods-item = "item"  />

    <!-- <div>{{goods}}</div> -->
    <!-- <ul>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
      <li>"商品列表"</li>
    </ul> -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem';

export default {
  name: 'GoodList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style >
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>