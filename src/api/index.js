/*
 * @Description:
 * @Author: ZhangChen
 * @Date: 2020-12-01 10:10:09
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-02-03 15:39:55
 * @FilePath: \testpro\src\api\index.js
 */

import { post, get } from "../util/http";
export const apiGetTopLists = (p) => get("/Index/getRecommend", p); //获取推荐直播
export const apiGetVideo = (p) => get("/Video/getVideoList", p); //获取短视频
export const getGiftBag = (p) => post("/Home/getGiftBag", p); // 首充大礼包接口

export const bannerImg = (p) => post("/h5pay/bannerImg", p); // 查询banner营销图片

export const getMap = (p) => get("/api2/ws/geocoder/v1", p);
export const getAdress = (p) => get("/api2/ws/geocoder/v1", p);
export const getIp = (p) => get("/api2/ws/location/v1/ip", p);
// export const getMoves = (p) => get("/v2/movie/top250", p);
