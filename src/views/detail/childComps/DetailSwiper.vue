<template>
  <div class="detailSwiper">
    <Swiper class="swiperImageHeight">
      <SwiperItem v-for="item in topImages" >
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
  </div>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props:{
    topImages: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>
<style  scoped>
.swiperImageHeight{
  height : 300px;
  overflow: hidden;
}
</style>