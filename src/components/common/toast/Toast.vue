<template>
  <div class="toast" v-show="toastShow">
    <div >
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props:{
    // message:{
    //   type: String,
    //   default: ''
    // },
    // show:{
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      toastShow: false
    }
  },
  methods: {
    show(message='toast show',duration=2000){
      // es6以下默认参数语法
      // duration = duration || 2000;
      // message = message || "toast show"

      // console.log("toast");

      this.toastShow = true;
      this.message = message;

      setTimeout(()=>{
        this.toastShow = false;
        this.message = ''
      },duration)
    }
  },
}
</script>

<style  scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    padding: 8px 10px;
    border-radius: 10px;

    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0, 0.65);
  }
</style>