<template>
  
    <Swiper>
    <SwiperItem  v-for="item in banners">
      <a :href="item.link">
      <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </SwiperItem>
  </Swiper>

</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isLoad: false
    }
  },
  props:{
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){
        console.log("轮播图加载完成")
        this.$emit("swiperImageLoad")
        this.isLoad = true
      }
      },
  },
}
</script>