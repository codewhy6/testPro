<!--
 * @Author: your name
 * @Date: 2020-12-02 11:17:01
 * @LastEditTime: 2021-02-03 14:45:34
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Http.vue
-->
<template>
  <div class="http"></div>
</template>
<script>
import {
  apiGetVideo,
  apiGetTopLists,
  bannerImg,
  getGiftBag,
} from "../api/index.js";
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    apiGetTopLists() {
      apiGetTopLists().then((res) => {
        console.log(res, "apiGetTopLists");
      });
    },
    apiGetVideo() {
      apiGetVideo({ type: 1, num: 10 }).then((res) => {
        console.log(res, "apiGetVideo");
        if (res.code == 200) {
          console.log(res.data);
        }
      });
    },
    bannerImg() {
      bannerImg({ img_type: 1 }).then((res) => {
        console.log(res, "bannerImg");
      });
    },
    getGiftBag() {
      getGiftBag({ type: 1, uid: 25953 }).then((res) => {
        console.log(res, "getGiftBag");
      });
    },
  },
  created() {},
  mounted() {
    this.apiGetVideo();
    // this.apiGetTopLists();
    this.bannerImg();
    this.getGiftBag();
  },
};
</script>
<style lang="less" scoped></style>
