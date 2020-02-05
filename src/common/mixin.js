import {debounce} from "./utiles"
import {TOP_DISTANCE} from "./const";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted() {
    let Refresh = debounce(this.$refs.scroll.refresh,100)

     this.itemImgListener = ()=>{ Refresh() }

    this.$bus.$on('itemImgLoad',this.itemImgListener )

    console.log("我是混入中的内容")
  },
}

// 回到顶部
  export const backTopMixin = {
    components:{
      BackTop,
    },
    data() {
      return {
        isShowBackTop: false,
      }
    },
    methods: {
      backClick(){
        console.log("回到顶部");
        // this.$refs.scroll.scroll.scrollTo(0,0,500);
        this.$refs.scroll.scrollTo(0,0,500);
      },
    },
  }