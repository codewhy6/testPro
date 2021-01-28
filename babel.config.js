/*
 * @Description:
 * @Author: ZhangChen
 * @Date: 2020-11-25 14:25:12
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-14 10:41:21
 * @FilePath: \testpro\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  // plugins: [
  //   [
  //     "import",
  //     {
  //       libraryName: "vant",
  //       libraryDirectory: "es",
  //       // 指定样式路径
  //       style: (name) => `${name}/style/less`,
  //     },
  //     "vant",
  //   ],
  // ],
  // rules: [
  //   {
  //     test: /\.less$/,
  //     use: [
  //       // ...其他 loader 配置
  //       {
  //         loader: "less-loader",
  //         options: {
  //           // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
  //           lessOptions: {
  //             modifyVars: {
  //               // 直接覆盖变量
  //               "field-placeholder-text-color": "#333",
  //             },
  //           },
  //         },
  //       },
  //     ],
  //   },
  // ],
};
