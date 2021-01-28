/*
 * @Author: your name
 * @Date: 2020-11-25 14:25:12
 * @LastEditTime: 2021-01-28 11:13:45
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { MessageBox } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // redirect: {
    //   path: "/myComps",
    // },
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/share",
    name: "Share",
    component: () =>
      import(/* webpackChunkName: "Share" */ "../views/Share.vue"),
  },
  {
    path: "/LottieBox",
    name: "LottieBox",
    component: () =>
      import(/* webpackChunkName: "LottieBox" */ "../views/LottieBox.vue"),
  },
  {
    path: "/waterfall",
    name: "Waterfall",
    component: () =>
      import(/* webpackChunkName: "Waterfall" */ "../views/Waterfall.vue"),
  },
  {
    path: "/waterfall2",
    name: "Waterfall2",
    component: () =>
      import(/* webpackChunkName: "Waterfall2" */ "../views/Waterfall2.vue"),
  },
  {
    path: "/myhttp",
    name: "myhttp",
    component: () => import(/* webpackChunkName: "Http" */ "../views/Http.vue"),
  },
  {
    path: "/myEditComs",
    name: "myEditComs",
    //在路由的头部添加元信息
    meta: {
      //requiresAuth是自定义的头部参数名称,
      //标识访问该路由时是否进行用户登录的检测
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "Http" */ "../views/myEditComs.vue"),
  },
  {
    path: "/myComps",
    name: "myComps",
    component: () =>
      import(/* webpackChunkName: "myComps" */ "../views/myComps.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "myComps" */ "../views/login.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  //检测目标路由信息是否包含requiresAuth的元信息
  //如果包含则代表需要进行用户登录状态的检测
  if (to.meta.requiresAuth) {
    //检测用户是否登录了?
    if (
      store.loginStatus == false ||
      sessionStorage.getItem("loginStatus") == false
    ) {
      // 提示
      MessageBox.confirm("您还未登录，请先登录！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(to, "to");
          router.push("/login?redirect=" + to.fullPath);
        })
        .catch(() => {});
    } else {
      // 放行
      next();
    }
  } else {
    next();
  }
});

export default router;
