/*
 * @Description: 全局的js方法
 * @Author: ZhangChen
 * @Date: 2021-01-23 14:42:32
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-23 14:50:19
 * @FilePath: \testpro\src\app.js
 */
let app = {
  // 路由重定向-原来的页面
  routerRedirect(params) {
    let self = params;
    // 从哪个页面点击的登陆，或者跳转到登陆的页面
    // 在登陆成功后，就从跳转当前的页面
    if (self.$route.query.redirect) {
      self.$router.push(self.$route.query.redirect);
    } else {
      // 直接在登陆页面的登陆，就要跳转到首页
      self.$router.push("/");
    }
  },
};

export default app;
