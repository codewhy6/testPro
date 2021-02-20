/*
 * @Author: your name
 * @Date: 2020-11-27 15:10:20
 * @LastEditTime: 2021-02-20 09:28:17
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\vue.config.js
 */
// vue.config.js
const path = require("path");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  devServer: {
    disableHostCheck: true,
    open: true,
    host: "localhost",
    // host: "192.168.1.14",
    port: 8086,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {
      "/api/api2": {
        target: `https://apis.map.qq.com`,
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          ["^" + "/api/api2"]: "", //请求的时候使用这个api就可以
        },
      },
      "/api/h5pay": {
        target: `https://m.liuyanzb.com/OfflinePay/`,
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          ["^" + "/api/h5pay"]: "", //请求的时候使用这个api就可以
        },
      },
      //配置跨域
      "/api": {
        target: "http://csapi.liuyanzb.com", //测试接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          ["^" + "/api"]: "", //请求的时候使用这个api就可以
        },
      },
    },
  },
  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: (config) => {
    // 修复热更新失效
    config.resolve.symlinks(true);
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"));
  },
  // css: {
  //   loaderOptions: {
  //     less: {
  //       // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
  //       lessOptions: {
  //         modifyVars: {
  //           // 直接覆盖变量
  //           "field-placeholder-text-color": "#333",
  //         },
  //       },
  //     },
  //   },
  // },
};
