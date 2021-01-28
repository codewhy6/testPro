import axios from "axios";
import qs from "qs";
axios.defaults.timeout = 50000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = "https://api.liuyanzb.com/";

/**
 * @Description: axios请求拦截
 * @Author: ZhangChen
 * @Date: 2020-12-01 13:17:41
 * @param {*}
 * @return {*}
 */
// axios.interceptors.request.use(
//   (config) => {
//     config.data = qs.stringify(config.data); // 转换
//     if (
//       sessionStorage.getItem("token") != "null" &&
//       sessionStorage.getItem("token")
//     ) {
//       config.headers = {
//         token: sessionStorage.getItem("token"),
//         version:
//           sessionStorage.getItem("version") != "null"
//             ? sessionStorage.getItem("version")
//             : "v10",
//         timekey:
//           sessionStorage.getItem("timekey") != "null"
//             ? sessionStorage.getItem("timekey")
//             : "sss",
//         "content-type": "application/x-www-form-urlencoded;charset=UTF-8 ",
//         device: "4",
//       };
//     } else {
//       config.headers = {
//         version:
//           sessionStorage.getItem("version") != "null"
//             ? sessionStorage.getItem("version")
//             : "v10",
//         timekey:
//           sessionStorage.getItem("timekey") != "null"
//             ? sessionStorage.getItem("timekey")
//             : "sss",
//         "content-type": "application/x-www-form-urlencoded;charset=UTF-8 ",
//         device: "4",
//       };
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

//响应拦截器即异常处理
// axios.interceptors.response.use(
//   (response) => {
//     // console.log(response);
//     if (response.data.code == 400) {
//       return response;
//     } else if (response.data.code == 100) {
//       // sessionStorage.removeItem("token")
//       // sessionStorage.removeItem("timekey")
//       // sessionStorage.removeItem("version")
//       return response;
//     } else {
//       return response;
//     }
//   },
//   (err) => {
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           console.log("错误请求");
//           break;
//         case 401:
//           console.log("未授权，请重新登录");
//           break;
//         case 403:
//           console.log("拒绝访问");
//           break;
//         case 404:
//           console.log("请求错误,未找到该资源");
//           break;
//         case 405:
//           console.log("请求方法未允许");
//           break;
//         case 408:
//           console.log("请求超时");
//           break;
//         case 500:
//           console.log("服务器端出错");
//           break;
//         case 501:
//           console.log("网络未实现");
//           break;
//         case 502:
//           console.log("网络错误");
//           break;
//         case 503:
//           console.log("服务不可用");
//           break;
//         case 504:
//           console.log("网络超时");
//           break;
//         case 505:
//           console.log("http版本不支持该请求");
//           break;
//         default:
//           console.log(`连接错误${err.response.status}`);
//       }
//     } else {
//       console.log("连接到服务器失败");
//     }
//     return Promise.resolve(err.response);
//   }
// );
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
