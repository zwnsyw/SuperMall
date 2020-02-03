<template>
  <div id= "detail">
   <DetailNavBar class="detailnavbar"></DetailNavBar>

   <scroll class="content" ref="scroll">
     <DetailSwiper :top-images = "topImages" ></DetailSwiper>
   <DetailBaseInfo  :goods = "goods"></DetailBaseInfo>
   <DetailShopInfo :shop='shop'></DetailShopInfo>
   <DetailGoodsInfo :detail-info='detailInfo' @imageLoad='imageLoad'></DetailGoodsInfo>
   <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
   </scroll>

  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from'./childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'


import Scroll from "components/common/scroll/Scroll"


//不是组件，只是方法，只需要导入就可以吧使用，不需要在components里面注册
import {getDetail, Goods,Shop,GoodsParam} from 'network/detail'

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
    DetailParamInfo
  },
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
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
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
  height: calc(100% - 44px);
}
.detailnavbar{
  position: relative;
  background-color: #fff;
  z-index: 9;
}
</style>

