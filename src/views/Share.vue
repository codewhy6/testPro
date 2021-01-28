<!--
 * @Author: your name
 * @Date: 2020-11-25 14:43:46
 * @LastEditTime: 2020-11-28 09:28:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workfiles\testpro\src\views\Share.vue
-->
<template>
  <div class="share_container">
    <el-tooltip placement="bottom" effect="light" class="el_tooltip">
      <div slot="content">
        <share :config="config"></share>
      </div>
      <span style="font-size: 20px;font-weight:bold;cursor: pointer;"
        >分享</span
      >
    </el-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        url: window.location.href,
        source: "",
        title: "六颜直播",
        description:
          "六颜直播-是以娱乐直播为主，洋溢健康活力，打造全国最大的娱乐互动直播平台。在线视频聊天、K歌跳舞、美女直播、游戏、户外、电台于一体，与心仪主播零距离聊天互动。六颜直播，有颜、有料、又有趣",
        image: "",
        sites: ["wechat", "qq", "qzone", "weibo"],
        disabled: [],
        wechatQrcodeTitle: "微信扫一扫：分享",
        wechatQrcodeHelper:
          "<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>",
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
h1 {
  cursor: pointer;
}
.share_container {
  width: 100%;
  height: 100vh;
}
</style>
