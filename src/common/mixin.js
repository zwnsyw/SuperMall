import {debounce} from "./utiles"

export const itemListenerMixin = {
  mounted() {
    let Refresh = debounce(this.$refs.scroll.refresh,100)

     this.itemImgListener = ()=>{ Refresh() }

    this.$bus.$on('itemImgLoad',this.itemImgListener )

    console.log("我是混入中的内容")
  },
}