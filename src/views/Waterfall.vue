<!--
 * @Author: your name
 * @Date: 2020-11-30 13:17:09
 * @LastEditTime: 2020-12-01 09:13:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Waterfall.vue
-->
<template>
  <div class="Waterfall">
    <div class="container">
      <div class="items" ref="waterfall_box">
        <!-- <div class="item" v-for="(item, index) in images" :key="index">
          <img :src="item" alt="" />
          <div class="title">
            <div class="title_text">title{{ index + 1 }}</div>
            <small>descrption.....</small>
          </div>
        </div> -->
        <div class="item">
          <img src="../assets/waterfall/1.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/2.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/3.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/4.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/5.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/6.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/7.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/8.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/9.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/10.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
        <div class="item">
          <img src="../assets/waterfall/11.jpg" alt="" />
          <div class="title">
            <div class="title_text">title</div>
            <small>descrption.....</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "../assets/waterfall/1.jpg",
        "../assets/waterfall/2.jpg",
        "../assets/waterfall/3.jpg",
        "../assets/waterfall/4.jpg",
        "../assets/waterfall/5.jpg",
        "../assets/waterfall/6.jpg",
        "../assets/waterfall/7.jpg",
        "../assets/waterfall/8.jpg",
        "../assets/waterfall/p_015.jpg",
        "../assets/waterfall/9.jpg",
        "../assets/waterfall/10.jpg",
        "../assets/waterfall/11.jpg",
        "../assets/waterfall/12.jpg",
        "../assets/waterfall/13.jpg",
        "../assets/waterfall/14.jpg",
        "../assets/waterfall/15.jpg",
        "../assets/waterfall/p_001.jpg",
        "../assets/waterfall/p_002.jpg",
        "../assets/waterfall/p_003.jpg",
        "../assets/waterfall/p_004.jpg",
        "../assets/waterfall/p_005.jpg",
        "../assets/waterfall/p_006.jpg",
      ],
      defaults: {
        // 每个图片盒子的间距属性
        gap: 10,
      },
      // 图片盒子的高度默认是 0 ，内容撑开盒子
      itemHeight: 0,
      // 存储最低高度的数组
      arrHeight: [],
    };
  },
  computed: {
    // images2() {
    //   return this.images.map((item) => {
    //     return require(`${item}`);
    //   });
    // },
  },
  watch: {
    // itemHeight(oldVal, newVal) {
    //   this.itemHeight = oldVal;
    // },
  },
  methods: {
    waterFall(dom) {
      let self = this;
      // 1.获取每个图片盒子
      let items = dom.children;
      // console.log(items);
      /*
      2.算出瀑布流的列数（每一行能放多少张图片）:
      --列数 = 大盒子的宽度 / 图片盒子的宽度
      */
      // 2.1 盒子的宽度
      let itemWidth = items[0].clientWidth;
      // console.log(itemWidth, "itemWidth"); //--197
      // 2.2 列数
      let column = Math.floor(dom.clientWidth / itemWidth);
      // console.log(column, "column"); //---4
      /*
      3.寻找一行中 高度最小的一列的位置，以及这一列的高度值
      这样可以知道下一列，图片盒子应该放在什么位置（每一行高度最小的列的后面）
      */
      // 循环遍历
      for (let i = 0; i < items.length; i++) {
        // console.log(i, items[i]);
        // 4--获取第一行的高度值，保存到数组中
        self.itemHeight = items[i].clientHeight || items[i].offsetHeight;
        // console.log(self.itemHeight, "itemHeight");
        // 5--先确定第一行盒子的排列（索引 < 列数 = 第一行）
        if (i < column) {
          // 5.1--设置第一行盒子的 left 和 top
          items[i].style.top = 0;
          // left值：（每个图片盒子 + 间隙）* 索引
          items[i].style.left = (itemWidth + self.defaults.gap) * i + "px";
          // 5.2--将第一行图片盒子的高度保存到数组中
          self.arrHeight[i] = self.itemHeight;
          // console.log(i, "i");
          // console.log(self.arrHeight, "arrHeight");
        } else {
          // 其他行
          // 6--计算数组中，最小的值 和 对应的 索引值
          let min_value = self.getMin(self.arrHeight).value;
          let min_index = self.getMin(self.arrHeight).index;
          // console.log(self.getMin(self.arrHeight), "getMin");
          items[i].style.top = min_value + self.defaults.gap + "px";
          items[i].style.left =
            (itemWidth + self.defaults.gap) * min_index + "px";
          // 8--更新最小列的值
          self.arrHeight[min_index] += self.itemHeight + self.defaults.gap;
          // 9.计算父容器的高度（高度数组中的最大的高度）
          dom.style.height = self.getMax(self.arrHeight).value + "px";
          // console.log(this.getMax(this.arrHeight), "getMax");
        }
      }
    },
    // 获取高度最小的那个值和索引
    getMin(arr) {
      let min = {};
      min.index = 0; //最小索引值
      min.value = arr[min.index]; //最小值
      // 遍历数组中的每一项，找到最小值和最小值得索引值
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min.value) {
          min.value = arr[i];
          min.index = i;
        }
      }
      return min;
    },
    // 8.获取最大列的高度(把最大列的高度值赋值给父元素)
    getMax(arr) {
      let max = {};
      max.index = 0;
      max.value = arr[max.index];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max.value) {
          max.value = arr[i];
          max.index = i;
        }
      }
      return max;
    },
  },
  created() {},
  mounted() {
    let waterfall_box = this.$refs.waterfall_box;
    this.waterFall(waterfall_box);
    setTimeout(() => {
      this.waterFall(waterfall_box);
    }, 50);
  },
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.Waterfall {
  width: 100%;
  // height: 100vh;
  background: #494a5f;
  &::before {
    content: "";
    display: table;
  }
}
/* 父容器 */
.container {
  width: 819px;
  margin: 0px auto;
  /* height: 1000px; */
  /* background:lightblue; */
  padding: 50px 0px;
}

.items {
  width: 100%;
  position: relative;
}
/* 每个图片 */
.item {
  width: 197px;
  padding: 10px 10px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.4s;
  box-sizing: border-box;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 16px 32px -4px rgba(0, 0, 0, 0.17);
}

.item img {
  width: 100%;
}
.title {
  margin-top: 15px;
}
.title .title_text {
  color: #a92733;
  font-size: 20px;
}
.title small {
  display: block;
  color: #666;
  font-size: 12px;
  margin-top: 10px;
}
</style>
