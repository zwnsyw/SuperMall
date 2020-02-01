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
  if (this.probeType ===2 || this.probeType === 3){
    this.scroll.on("scroll", (position)=>{
    // console.log(position);
    this.$emit("scroll",position);
  });
  }
  // this.scroll.on("scroll", (position)=>{
  //   // console.log(position);
  //   this.$emit("scroll",position);
  // });
  // console.log(this.scroll)

  // 3. 监听scroll滚动到底部,上拉加载事件
 if (this.pullUpload){
    this.scroll.on('pullingUp',position=>{
    console.log("上拉加载更多")
    this.$emit("pullingUp")
  })
  }
  },
  methods: {
    scrollTo(x , y ,time=300){

      // 逻辑与，先判断scroll对象是否创建完成
      this.scroll &&  this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      console.log("scrollHeight次数")
      this.scroll && this.scroll.refresh();
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>