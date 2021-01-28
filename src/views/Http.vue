<!--
 * @Author: your name
 * @Date: 2020-12-02 11:17:01
 * @LastEditTime: 2020-12-03 13:50:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Http.vue
-->
<template>
  <div class="http"></div>
</template>
<script>
import { agentRank, getTaskReceiver, getMobileCaptcha } from "../api/index.js";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    agentRank() {
      agentRank().then((res) => {
        if (res.code == 200) {
          console.log(res.data);
        }
      });
    },
    // 图片验证码地址
    getTaskReceiver() {
      // console.log(uid,'uid');
      getTaskReceiver().then((res) => {
        if (res.code == 200) {
          console.log(res.data, "getMobileCaptcha图片验证码地址");
        }
      });
    },
  },
  created() {},
  mounted() {
    this.agentRank();
    this.getTaskReceiver();
  },
};
</script>
<style lang="less" scoped></style>
