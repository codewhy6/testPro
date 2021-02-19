<!--
 * @Description: 
 * @Author: ZhangChen
 * @Date: 2021-01-23 14:05:36
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-02-19 14:56:37
 * @FilePath: \testpro\src\views\login.vue
-->
<template>
  <div class="login">
    <p>登录的状态：{{ loginStatus }}</p>
    <button @click="clkLogin">登录</button>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["loginStatus"]),
  },
  methods: {
    ...mapMutations(["login"]),
    // 点击登录修改状态
    clkLogin() {
      // console.log(this.loginStatus, "loginStatus");
      sessionStorage.setItem("loginStatus", true);
      this.login(true);

      this.$confirm("登录成功", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.loginStatus) {
          this.$app.routerRedirect(this);
        }
      });
    },
  },
  created() {},
  mounted() {
    let loginStatus = sessionStorage.getItem("loginStatus");
  },
};
</script>
<style lang="less" scoped></style>
