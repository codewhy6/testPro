<!--
 * @Description: 移动端轮播图
 * @fileName: 
 * @Author: ZhangChen
 * @Date: 2021-02-19 15:55:26
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-02-20 10:14:46
-->
<template>
  <div class="carousel">
    <!-- 焦点图模块----------------------------------- -->
    <div class="carousel_container" ref="carousel_container">
      <ul class="wrap clearfix" ref="wrap">
        <li v-for="(item, index) in bannerData" :key="index + item.id">
          <a href="#"><img :src="item.imgPath" alt="" /></a>
        </li>
      </ul>
      <!-- 轮播点 -->
      <ol class="points">
        <li
          :class="activeInx == index ? 'current' : ''"
          v-for="(item, index) in bannerData"
          :key="index"
        ></li>
      </ol>
    </div>
  </div>
</template>
<script>
import { bannerImg } from "@/api/index";
export default {
  data() {
    return {
      //--banner图数据
      bannerData: [],
      // 当前选中的
      activeInx: 0,
      // 定时器
      timer: null,
      // 轮播时常
      duration: 3000,
    };
  },
  methods: {
    /**
     * @Description: 轮播
     * @Author: ZhangChen
     * @Date: 2021-02-19 16:14:29
     * @param {*}
     * @return {*}
     */
    getWrap() {
      // 监听页面的变化，重新加载页面
      window.addEventListener("resize", function () {
        // 重新加载页面
        console.log("reload");
        this.location.reload();
      });
      let that = this;
      clearInterval(that.timer);
      // 克隆
      // 克隆第一个元素之末尾
      let allLis = that.$refs.wrap.children;
      let firstEle = allLis[0].cloneNode(true);
      that.$refs.wrap.appendChild(firstEle);
      // 克隆原本最后一个元素至最前面
      let threeEle = allLis[allLis.length - 2].cloneNode(true);
      that.$refs.wrap.insertBefore(threeEle, allLis[0]);
      // console.log(allLis.length, "allLis2");
      // 要移动的宽度
      let imgWidth = that.$refs.carousel_container.offsetWidth; //--375px
      // 动态设置父元素的宽度
      that.$refs.wrap.style.width = allLis.length * imgWidth + "px";
      // 动态设置子元素的宽度
      allLis.forEach((element) => {
        element.style.width = imgWidth + "px";
      });
      // 开启定时器。，自动轮播
      that.timer = setInterval(() => {
        // console.log(that.activeInx);
        that.activeInx++;
        // 动画的核心思想-------translate()
        let translateX = -that.activeInx * imgWidth;
        that.$refs.wrap.style.transform = "translateX(" + translateX + "px)";
        that.$refs.wrap.style.transition = "all .5s";
      }, that.duration);

      // 等过渡完成了就需要进行判断=============重点============================
      that.$refs.wrap.addEventListener("transitionend", () => {
        if (that.activeInx >= allLis.length - 2) {
          that.activeInx = 0;
          let translateX = -that.activeInx * imgWidth;
          // 不需要过渡
          that.$refs.wrap.style.transition = "none";
          // 接着执行动画
          that.$refs.wrap.style.transform = "translateX(" + translateX + "px)";
        } else if (that.activeInx < 0) {
          // 手滑上一张，让他成为倒数第二张
          that.activeInx = allLis.length - 3;
          let translateX = -that.activeInx * imgWidth;
          that.$refs.wrap.style.transition = "none";
          that.$refs.wrap.style.transform = "translateX(" + translateX + "px)";
        }
      });

      // 手指滑动轮播图
      // 触摸元素 touchstart： 获取手指初始坐标
      let startX = 0;
      // 后面我们会使用这个移动距离所以要定义一个全局变量
      let moveX = 0;
      // 用户按下了，不滑动屏幕
      let flage = false;
      this.$refs.wrap.addEventListener("touchstart", (e) => {
        // console.log(e.targetTouches[0].pageX, "e");
        startX = e.targetTouches[0].pageX;
        // 手指触摸时就清除定时器
        clearInterval(that.timer);
      });

      this.$refs.wrap.addEventListener("touchmove", (e) => {
        moveX = e.targetTouches[0].pageX - startX;
        // console.log(moveX, "moveX");
        let translateX = -that.activeInx * imgWidth + moveX;
        // 不需要过渡
        that.$refs.wrap.style.transition = "none";
        // 接着执行动画
        that.$refs.wrap.style.transform = "translateX(" + translateX + "px)";
        e.preventDefault(); // 阻止滚动屏幕的行为
        // 用户滑动就让 flage=true;
        flage = true;
      });

      this.$refs.wrap.addEventListener("touchend", (e) => {
        // 手指滑动了才触发，不滑动不触发
        if (flage) {
          // 在手指离开的时候就判断滑动的距离----moveX
          /*(1) 如果移动距离大于50像素我们就播放上一张或者下一张*/
          if (Math.abs(moveX) >= 50) {
            if (moveX > 0) {
              // 如果是右滑就是 播放上一张 moveX 是正值
              that.activeInx--;
            } else {
              // 如果是左滑就是 播放下一张 moveX 是负值
              that.activeInx++;
            }
            let translateX = -that.activeInx * imgWidth;
            // 不需要过渡
            that.$refs.wrap.style.transition = "all .5s";
            // 接着执行动画
            that.$refs.wrap.style.transform =
              "translateX(" + translateX + "px)";
          } else {
            // (2) 如果移动距离小于50像素我们就回弹
            let translateX = -that.activeInx * imgWidth;
            // 不需要过渡
            that.$refs.wrap.style.transition = "all .5s";
            // 接着执行动画
            that.$refs.wrap.style.transform =
              "translateX(" + translateX + "px)";
          }
        }
        // 手指一离开就开启定时器
        // 1.清除先前的定时器
        clearInterval(that.timer);
        // 开启定时器。，自动轮播
        that.timer = setInterval(() => {
          // console.log(that.activeInx);
          that.activeInx++;
          // 动画的核心思想-------translate()
          let translateX = -that.activeInx * imgWidth;
          that.$refs.wrap.style.transform = "translateX(" + translateX + "px)";
          that.$refs.wrap.style.transition = "all .5s";
        }, that.duration);
      });
    },
    /**
     * @Description:获取banner图
     * @Author: ZhangChen
     * @Date: 2021-02-19 16:03:22
     * @param {*}
     * @return {*}
     */
    getBannerImg() {
      bannerImg({
        img_type: 1,
      }).then((res) => {
        if (res.respCode == "0000") {
          this.bannerData = res.data.img;
        }
      });
    },
  },
  created() {
    // 获取banner图
    this.getBannerImg();
  },

  beforeMount() {},
  mounted() {
    // 初始化轮播图
    setTimeout(() => {
      this.getWrap();
    }, 1000);
  },
};
</script>
<style lang='less' scoped>
/* <!-- 焦点图模块----------------------------------- --> */
.carousel_container {
  width: 100%;
  /* height: 108px; */
  position: relative;
  overflow: hidden;
}
.carousel_container .wrap {
  width: 500%;
  height: 100%;
  /* overflow: hidden; */
  margin-left: -100%;
}
.carousel_container .wrap li {
  width: 20%;
  float: left;
}
.carousel_container .wrap li img {
  width: 100%;
  height: 100%;
}
.carousel_container .points {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.carousel_container .points li {
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background: #fff;
  float: left;
  margin-right: 5px;
  transition: all 0.2s;
}
.carousel_container .points li.current {
  width: 15px;
  background: orangered;
}
/* <!-- 焦点图模块----------------------------------- --> */
</style>