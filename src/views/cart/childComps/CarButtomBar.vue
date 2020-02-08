<template>
  <div class="bottom-bar">
    <div class="check-content">
    <CheckButton class="check-all" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click='calcClick'>
      去结算({{checkLength}})
      </div>

  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  name: 'CartButtomBar',
  components:{
    CheckButton
  },
  computed: {
...mapGetters(["cartList"]),

    totalPrice(){
      return "¥" + this.$store.state.carList.filter(item => {
        return item.checked
      }).reduce((preValue, item) =>{
        return preValue +  item.price * item.count
        }, 0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // 0取反是true，其他正整数取反是false, undefine取反也是true
      if(this.cartList.length === 0){return false}
      // 1. filter
      // return !(this.cartList.filter(item => !item.checked).length)

      // 2. 普通for遍历
      for(let item of this.cartList){
        if (!item.checked){
          return false
        }
      }
      return true
      // 3. find
    //  return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      if (this.isSelectAll){ //当前是全部选中状态，需要改成全部false，实现全不选
        this.cartList.forEach(item => {
          item.checked = false
        })
      }else{  // 当前部分不选中，全部改成true，实现全选
          this.cartList.forEach(item => {
            item.checked = true
          })
        }
    },
    calcClick(){
      if (!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    }
  },
}
</script>

<style  scoped>
  .bottom-bar{
    height: 44px;
    background-color:#eee;
    position: relative;
    display: flex;
    line-height: 40px
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-all{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 25px;
    flex: 1
  }
  .calculate{
    width: 90px;
    background-color:deeppink;
    text-align:center;
    padding-right:10px ;
    color: #fff;
  }
  .go-caculate{
    color: #fff;
  }

</style>