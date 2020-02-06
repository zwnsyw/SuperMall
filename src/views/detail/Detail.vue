<template>
  <div id= "detail">
   <DetailNavBar class="detailnavbar" @titleClick='titleClick' ref="detailNav"></DetailNavBar>

   <scroll class="content" ref="scroll" @scroll='contentScroll' :probe-type="3">
<ul>
  <li v-for="item in $store.state.carList">
    {{item}}
    </li>
</ul>

     <!-- 属性：topImages     传值： top-images -->
     <DetailSwiper :top-images = "topImages" ></DetailSwiper>
   <DetailBaseInfo  :goods = "goods"></DetailBaseInfo>
   <DetailShopInfo :shop='shop'></DetailShopInfo>
   <DetailGoodsInfo :detail-info='detailInfo' @imageLoad='imageLoad'></DetailGoodsInfo>
   <DetailParamInfo  ref="params" :paramInfo="paramInfo"></DetailParamInfo>
   <DetailCommentInfo ref='comment' :commentInfo = 'commentInfo'></DetailCommentInfo>
   <GoodsList ref="recommend" :goods='recommends'></GoodsList>
   </scroll>

   <DetailBottomBar @addCart='addToCart'></DetailBottomBar>

   <BackTop @click.native='backClick' v-show="isShowBackTop"></BackTop >

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from'./childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList'

import Scroll from "components/common/scroll/Scroll"


//不是组件，只是方法，只需要导入就可以吧使用，不需要在components里面注册
import {getDetail, Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {debounce} from 'common/utiles'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Detail",
  
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends: [],
       itemImgListener:null,
       themTopYs: [],
       getThemTopY: null,
       currentIndex: null
      
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    Goods,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin , backTopMixin],
  created() {
    // 1. 保存传入的iid
    console.log("bb",this.$route.params)
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
          // 1. 轮播图数据
          const data = res.result;
      this.topImages = data.itemInfo.topImages
          // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    
      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)  
      
      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5. 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6. 获取评论信息
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      // 7.请求推荐数据
      getRecommend().then(res => {
        console.log('详细页面的商品推荐数据',res)
        this.recommends = res.data.list
      })

      // 8. 给getThemTopY赋值进行对this.themTopYs防抖
      this.getThemTopY = debounce(()=>{
        this.themTopYs = []
        this.themTopYs.push(0)
        this.themTopYs.push(this.$refs.params.$el.offsetTop)
        this.themTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themTopYs.push(Number.MAX_VALUE)
        // Number.MAX_VALUE     js中number类型的最大值
        console.log(this.themTopYs)
      })

      // 第一次尝试获取值，值不对
      // 原因： this.$refs.params.$el压根就还没渲染
        // this.themTopYs = []
        // this.themTopYs.push(0)
        // this.themTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themTopYs)

    // 第二次尝试获取值，值不对
    // 原因： DOM里面还没有图片，图片没计算在内
      // this.$nextTick()根据最新的数据，渲染完成DOM的时候回调，但图片不一定渲染完成
      // offsetTop值不对的情况，一般都是因为图片加载慢的问题
      // this.$nextTick(()=>{
      //    this.themTopYs = []
      //   this.themTopYs.push(0)
      //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themTopYs)
      // })
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      // 会调用多次，加个防抖函数
      // this.themTopYs = []
      //   this.themTopYs.push(0)
      //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themTopYs)
      this.getThemTopY()

    },
    titleClick(index){
      console.log("顶部标题：",index)
      this.$refs.scroll.scrollTo(0 ,  -this.themTopYs[index] , 500)
    },
    contentScroll(position){

      this.isShowBackTop = (-position.y) > 550

      // console.log(position)
      const positionY = -position.y

      //2. positionY和主题中的值进行对比
      let length = this.themTopYs.length
      // 2.1.1普通方法
      // for(let i = 0; i < length; i++){
      //   if(this.currentIndex !==i &&((i < length -1 && positionY >= this.themTopYs[i] && positionY < this.themTopYs[i + 1]) || (i === length -1 && positionY  >=  this.themTopYs[i]))){
      //     this.currentIndex = i
      //     // console.log(this.currentIndex)
      //     this.$refs.detailNav.currentIndex = this.currentIndex
      //   }
      // }
      // 2.2.1  hack（巧妙）的方法，在数组后面添加一个非常大的值，就可以变成通用比较，省略最后一次的特殊判断
      for (let i = 0; i < length -1; i++){
        if (this.currentIndex !==i && (positionY >= this.themTopYs[i] && positionY < this.themTopYs[i + 1])){
          this.currentIndex = i
          console.log(this.currentIndex)
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart(){
      // console.log("++++++++++++++")
      // 1. 获取加入到购物车信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid

      // 2. 将商品添加都购物车
      // 提交到mutation
      // this.$store.commit('addCart',product)

      //提交到action
      this.$store.dispatch('addCart',product)
      console.log("detail:------",product)
    }
  },
  mounted(){
    console.log("Detailmounted")
  //   let Refresh = debounce(this.$refs.scroll.refresh,100)

  //    this.itemImgListener = ()=>{ Refresh() }

  //   this.$bus.$on('itemImgLoad',this.itemImgListener )
  },

  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  // updated(){
  //   // 一有数据变化就调用,重复调用的时候，每次进来先赋个空数组
  //   this.themTopYs = []
  //    this.themTopYs.push(0)
  //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
  //   console.log(this.themTopYs)
  // }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
}
.detailnavbar{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>

