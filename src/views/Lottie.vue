<!--
 * @Author: your name
 * @Date: 2020-11-28 10:14:33
 * @LastEditTime: 2020-11-28 13:51:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Lottie.vue
-->
<template>
  <div class="Lottie">
    <!-- Lottie的容器 -->
    <div :style="style" ref="lavContainer"></div>
  </div>
</template>
<script>
// 引入lottie-web
import lottie from "lottie-web";
export default {
  // 父组件传递的参数
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: Number,
    width: Number,
  },

  data() {
    return {
      // Lottie样式
      style: {
        width: this.width ? `${this.width}px` : "100%",
        height: this.height ? `${this.height}px` : "100%",
        overflow: "hidden",
        margin: "0 auto",
      },
    };
  },
  methods: {},
  mounted() {
    this.anim = lottie.loadAnimation({
      //播放的位置
      container: this.$refs.lavContainer,
      renderer: "svg",
      //是否循环播放
      loop: this.options.loop !== false,
      //是否自动播放
      autoplay: this.options.autoplay !== false,
      // 加载json的文件名
      animationData: this.options.animationData,
      // json 动画数据，与 path 互斥，建议使用 path，因为 animationData 会将数据打包进来，会使得 js bundle 过大
      rendererSettings: this.options.rendererSettings,
      // json 路径，页面会通过一个 http 请求获取 json
      path: this.options.path,
    });
    this.$emit("animCreated", this.anim);
  },
};
</script>
<style lang="less" scoped></style>
