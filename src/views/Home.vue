<!--
 * @Author: your name
 * @Date: 2020-11-25 14:25:12
 * @LastEditTime: 2021-01-23 14:32:48
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\views\Home.vue
-->
<template>
  <div class="home">
    <h1>home</h1>
    <button @click="add">+1</button>
    <h3>{{ count }}</h3>
    <hr />
    <!-- 消息 -->
    <p>登陆的状态：{{ loginStatus }}</p>
    <button @click="showErrMsg">跳转/myEditComs页面</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["count", "loginStatus"]),
  },
  methods: {
    ...mapMutations(["ADD_NUM", "showMessage"]),
    add() {
      this.ADD_NUM(1);
    },

    /**
     * @Description: 显示信息弹窗
     * @Author: ZhangChen
     * @Date: 2021-01-21 13:44:40
     * @param {*}
     * @return {*}
     */
    showErrMsg() {
      this.$router.push("/myEditComs");
      // this.showMessage({ message: "请您登录", type: "error" });
      // this.$confirm("请您登录", "提示", {
      //   confirmButtonText: "confirm",
      //   cancelButtonText: "cancel",
      //   type: "warning",
      // })
      //   .then(() => {})
      //   .catch(() => {});
    },
  },
  created() {},
  mounted() {
    console.log(this.count);
  },
};
</script>
<style lang="less" scoped></style>
