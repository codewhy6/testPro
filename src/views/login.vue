<!--
 * @Description: 
 * @Author: ZhangChen
 * @Date: 2021-01-23 14:05:36
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-02-19 16:01:40
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
<style lang="less" scoped>
/* <!-- 焦点图模块----------------------------------- --> */
.focus {
  width: 100%;
  /* height: 108px; */
  margin-top: 45px;
  position: relative;
  overflow: hidden;
}
.focus .wrap {
  width: 500%;
  height: 100%;
  /* overflow: hidden; */
  margin-left: -100%;
}
.focus .wrap li {
  width: 20%;
  float: left;
}
.focus .wrap li img {
  width: 100%;
  height: 100%;
}
.focus .points {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.focus .points li {
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background: orangered;
  float: left;
  margin-right: 5px;
  transition: all 0.2s;
}
.focus .points li.current {
  width: 15px;
}
/* <!-- 焦点图模块----------------------------------- --> */
</style>
