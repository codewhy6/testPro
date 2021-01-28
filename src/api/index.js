/*
 * @Description:
 * @Author: ZhangChen
 * @Date: 2020-12-01 10:10:09
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-15 11:18:10
 * @FilePath: \testpro\src\api\index.js
 */

import { post, get } from "../util/http";
export const apiGetTopLists = (p) => get("/api/Index/getRecommend", p); //获取推荐直播
export const apiSearch = (p) => post(`/api/Index/search`, p); //搜索接口
export const getGiftBag = (p) => post("/api/Home/getGiftBag", p); // 首充大礼包接口
export const getMobileCaptcha = (p) => get("/api/Home/getMobileCaptcha", p); //图片验证码地址
export const getTaskReceiver = (p) => get("/api/Task/getTaskReceiver", p);
// 邀请排行榜
export const agentRank = (p) => post("/api/agent/agentRank", p);

export const getMap = (p) => get("/api/ws/geocoder/v1", p);
export const getAdress = (p) => get("/api/ws/geocoder/v1", p);
export const getIp = (p) => get("/api/ws/location/v1/ip", p);
// export const getMoves = (p) => get("/v2/movie/top250", p);
