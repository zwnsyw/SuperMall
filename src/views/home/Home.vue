<template>
  <div id="home">
  <NavBar class='home-nav'>
    <div slot="center">世白么购物街</div>
  </NavBar>

  <Scroll class="content" 
  ref='scroll' 
  :probe-type='3' 
  @scroll="contentScroll"
  :pullUpload="true"
  @pullingUp = 'loadMore'>

  <HomeSwiper :banners = 'banners' />
  <RecommendView :recommends = "recommends" />
  <FeatureView/>
  <TabControl  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
  <GoodsList  :goods = "showGoods" />
</Scroll>

<BackTop @click.native='backClick' v-show="isShowBackTop"></BackTop >
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home';


  export default {
    name: "Home",
    components: {
      //  公共组件
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,


    HomeSwiper,
    RecommendView,
    FeatureView,
    
    },
    data() {
        return {
          banners: [],
          recommends: [],
          isShowBackTop: false,
          // 数据模型
          goods:{
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          },
          currentType: 'pop'
        }
      },
    //  创建好就请求数据
    created() {
      // 加this调用的是methods的函数
      this.getHomeMultidata();
      // 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");

    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关
       */
      tabClick(index){
        console.log("0")
        switch(index){
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = "sell";
            break
        }
      },
      backClick(){
      console.log("回到顶部");
      // this.$refs.scroll.scroll.scrollTo(0,0,500);
      this.$refs.scroll.scrollTo(0,0,500);
    },

    contentScroll(position){
      // console.log(position)
      // position.y > 1000px
      this.isShowBackTop = (-position.y) > 550
    },

    loadMore(){
      console.log("上拉加载更多")
      this.getHomeGoods(this.currentType);
      // 重新计算可滚动区域
      this.$refs.scroll.scroll.refresh();

    },






      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        // 请求多个数据
      getHomeMultidata().then((result) => {
        console.log(result)
        this.banners = result.data.banner.list
        this.recommends = result.data.recommend.list

      }).catch((err) => {
      });
      
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()

        // console.log("商品数据",res)
      })
      },

    },
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    /* 100vh是视图窗口的高度 */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control{
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
