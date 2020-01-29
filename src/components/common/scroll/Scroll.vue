<template>
  <div class="wrapper" ref='wrapper'>
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props:{
    probeType:{
    type: Number,
    default: 0},
    pullUpload:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  components:{
    BScroll,
  },
  mounted() {

  //1. 创建BScroll对象
    // this.scroll = new BScroll(document.querySelector('.wrapper'))
    this.scroll = new BScroll(this.$refs.wrapper,{ 
      click: true,
      // 滚动
      probeType: this.probeType,
      // 上拉
      pullUpLoad: this.pullUpload,
    });

  // 2. 监听滚动的位置
  this.scroll.on("scroll", (position)=>{
    // console.log(position);
    this.$emit("scroll",position)
  });
  // 3. 监听上拉事件
  this.scroll.on('pullingUp',position=>{
    // console.log("上拉加载更多")
    this.$emit("pullingUp")

  })
  },
  methods: {
    scrollTo(x , y ,time=300){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>