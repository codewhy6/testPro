<!--
 * @Author: your name
 * @Date: 2020-11-28 10:19:52
 * @LastEditTime: 2020-11-28 14:37:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\LottieBox.vue
-->
<template>
  <div class="LottieBox">
    <lottie
      :options="options"
      :height="400"
      :width="400"
      @animCreated="animCreated"
    ></lottie>
    <button v-on:click="stop">stop</button>
    <button v-on:click="pause">pause</button>
    <button v-on:click="play">play</button>
  </div>
</template>
<script>
import Lottie from "./Lottie.vue";
import animationData from "../assets/data.json";
export default {
  data() {
    return {
      // lottie-web相关的配置
      options: {
        animationData: animationData,
        // path:
        //   "https://gw.alipayobjects.com/os/sage/10726a69-0e6a-484f-a784-d57a812af9a6/lottie.json",
      },
    };
  },
  methods: {
    animCreated(anim) {
      this.anim = anim;
    },
    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },
  },
  mounted() {},
  components: {
    Lottie,
  },
};
</script>
<style lang="less" scoped>
.LottieBox {
  background: pink;
}
</style>
