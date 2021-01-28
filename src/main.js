/*
 * @Author: your name
 * @Date: 2020-11-25 14:25:12
 * @LastEditTime: 2021-01-23 14:46:00
 * @LastEditors: ZhangChen
 * @Description: In User Settings Edit
 * @FilePath: \testpro\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// element-ui
import { Tooltip, MessageBox, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; //引入element-ui样式
Vue.use(Tooltip);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// 分享
import Share from "vue-social-share";
import "vue-social-share/dist/client.css";
Vue.use(Share);

// normalize
// import "normalize.css";
// 公共的样式
import "../src/app.css";
// 全局的js方法
import app from "./app";
Vue.prototype.$app = app;

// axios
import axios from "axios";
// 配置默认的请求服务器的路径
// axios.defaults.baseURL = "/api2";
// 在Vue的原型对象中添加axios方法。
Vue.prototype.$http = axios;

// vant
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Icon,
  Field,
  Swipe,
  SwipeItem,
  NumberKeyboard,
  Toast,
  Picker,
  Popup,
  DatetimePicker,
  Area,
  Divider,
} from "vant";
import "vant/lib/index.css";
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(NumberKeyboard);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Area);
Vue.use(Divider);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
