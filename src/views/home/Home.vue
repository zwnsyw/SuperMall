<template>
  <div id="home">
  <NavBar class='home-nav'>
    <div slot="center">世白么购物街</div>
  </NavBar>
  <TabControl  class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref='tabControl1'  v-show="isTabFixed"/>


  <Scroll class="content" 
  ref='scroll' 
  :probe-type='3' 
  @scroll="contentScroll"
  :pullUpload="true"
  @pullingUp = "loadMore"
  >

  <HomeSwiper :banners = 'banners'  @swiperImageLoad = 'swiperImageLoad'/>
  <RecommendView :recommends = "recommends" />
  <FeatureView/>
  <TabControl   :titles="['流行','新款','精选']" @tabClick="tabClick" ref='tabControl2' />
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
import {debounce} from 'common/utiles'

import {backTopMixin} from 'common/mixin'


  export default {
    name: "Home",
    mixins:[backTopMixin],
    components: {
      //  公共组件
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,


    HomeSwiper,
    RecommendView,
    FeatureView,
    
    },
    data() {
        return {
          banners: [],
          recommends: [],
          // isShowBackTop: false,
          tabOffsetTop: 0,
          isTabFixed: false,
          saveY:0,
          itemImgListener:null,
          // 数据模型
          goods:{
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
          },
          currentType: 'pop'
        }
      },
    destroyed() {
      console.log("销毁")
    },
    activated() {
      console.log("进入/回来")
      this.$refs.scroll.scrollTo(0, this.saveY,1)  // x: 0 , 1是延迟
      this.$refs.scroll.refresh()
    },
    deactivated() {
      console.log("离开")
      // this.saveY = this.$refs.scroll.scroll.y
      // 1. 保存离开时候的y坐标
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY)

      // 2. 取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)

    },
    //  1. 创建好就请求数据
    created() {
      // 加this调用的是methods的函数
      this.getHomeMultidata();
      // 2. 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");

      // 3. 组件一旦创建完成就监听事件总线里面的itemImageLoad（图片加载完成事件）然后刷新scrollHeight
      // 不建议在create里面，推荐在mounted里面
      // this.$bus.$on("itemImageLoad", ()=>{
      //   console.log('itemImageLoad');
      //   // this.$refs.scroll.scroll.refresh
      //   this.$refs.scroll.refresh()

      // })
      
    },
    
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    mounted() {
      // 1. 组件一旦创建完成并挂载就监听事件总线里面的itemImageLoad（图片加载完成事件）然后刷新scrollHeight
      //  const refresh = this.debounce(this.$refs.scroll.refresh,100)
       const refresh = debounce(this.$refs.scroll.refresh,100)

      // 对监听的事件进行保存
      this.itemImgListener = ()=>{
        // console.log('itemImageLoad');
        // this.$refs.scroll.scroll.refresh
        // this.$refs.scroll.refresh()
        refresh()
      }
       this.$bus.$on("itemImageLoad",  this.itemImgListener )
      // 2. 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el  用于获取组件中的元素
      // this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    methods: {
      /**
       * 事件监听相关
       */

      // //  防抖函数
      // debounce(func, delay){
      //   let timer = null
      //   return function(...args){
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     }, delay);
      //   }
      // },
      swiperImageLoad(){
        //  console.log(this.$refs.tabControl.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
    //   backClick(){
    //   console.log("回到顶部");
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500);
    //   this.$refs.scroll.scrollTo(0,0,500);
    // },

    contentScroll(position){
      // console.log(position)
      // position.y > 1000px
      // 1. 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 550

      // 2. 决定tabControl是否吸顶（position: fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore(){
      console.log("上拉加载更多")
      this.getHomeGoods(this.currentType);
      // 重新计算可滚动区域
      // this.$refs.scroll.scroll.refresh();
    },

    loadMore(){
      console.log('加载更多'),
      this.getHomeGoods(this.currentType)
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

        // 完成上拉加载更多，调用一下继续下次上拉加载
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
/* 在使用浏览器使用原生滚动时，为了让导航不跟随一起滚动 */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* .tab-control{
    /* position: sticky; */
    /* top: 44px;
    z-index: 9;
  } */ 

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }

  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  /* .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
