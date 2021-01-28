<!--
 * @Author: your name
 * @Date: 2020-12-01 09:17:22
 * @LastEditTime: 2020-12-02 11:03:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Waterfall2.vue
-->
<template>
  <div id="content">
    <vue-waterfall-easy
      ref="waterfall"
      :imgsArr="imgsArr"
      :gap="20"
      :imgWidth="100"
      srcKey="src"
      @scrollReachBottom="getData"
    >
      <div class="img-info" slot-scope="props">
        <p class="some-info">第{{ props.index + 1 }}张图片</p>
        <p class="some-info">{{ props.value.info }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>
<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from "axios";
export default {
  data() {
    return {
      imgsArr: [],
      page: 0, // 当前加载的加载图片的次数
      pullDownDistance: 0,
    };
  },
  computed: {},
  methods: {
    getData() {
      fetch("https://api.apiopen.top/getImages", {
        method: "post",
        body: JSON.stringify({
          page: this.page,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.imgsArr = this.imgsArr.concat(
              res.result.map((item) => {
                return { id: item.id, src: item.img, time: item.time };
              })
            );
          }
          this.page++;
          if (this.page === 10) {
            // 模拟已经无新数据，显示 slot="waterfall-over"
            this.$refs.waterfall.waterfallOver();
            return;
          }
        });
      // axios
      //   .get("https://api.apiopen.top/getImages") // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
      //   .then((res) => {
      //     if (res.code == 200) {
      //       console.log(res);
      //       this.imgsArr = this.imgsArr.concat(res.result);
      //     }
      //     // this.group++;
      //     // if (this.group === 10) {
      //     //   // 模拟已经无新数据，显示 slot="waterfall-over"
      //     //   this.$refs.waterfall.waterfallOver();
      //     //   return;
      //     // }
      //   });
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  components: {
    vueWaterfallEasy,
  },
};
</script>
<style lang="less" scoped>
#content {
  position: absolute; /*必须*/
  top: 32px; /*top必须，大小可控制*/
  bottom: 0; /*bottom必须，一直延申到当前块底部*/
  width: 100%;
}
</style>
