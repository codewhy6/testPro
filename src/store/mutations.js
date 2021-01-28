/*
 * @Author: your name
 * @Date: 2020-11-30 10:51:57
 * @LastEditTime: 2021-01-23 14:08:35
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\store\mutations.js
 */
import * as types from "./mutationTypes";
import { Message } from "element-ui";

export default {
  [types.ADD_NUM](state, data) {
    state.count += data;
  },
  /**
   * @Description: 错误消息提示弹窗
   * @Author: ZhangChen
   * @Date: 2021-01-21 13:35:08
   * @param {*}
   * @return {*}
   */
  [types.showMessage](state, options) {
    if (state.message) {
      state.message.close();
    }
    state.message = Message({
      message: options.message,
      type: options.type || "success",
      duration: options.duration || 2000, //2000
      offset: 40,
    });
  },
  /**
   * @Description: 登录改变登录的状态
   * @Author: ZhangChen
   * @Date: 2021-01-23 14:08:48
   * @param {*}
   * @return {*}
   */
  [types.login](state, data) {
    state.loginStatus = data;
  },
};
