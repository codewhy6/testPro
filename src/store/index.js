/*
 * @Author: your name
 * @Date: 2020-11-25 14:25:12
 * @LastEditTime: 2021-01-23 14:11:59
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";

import state from "./state";
import mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
