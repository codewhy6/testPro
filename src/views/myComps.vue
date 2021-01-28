<!--
 * @Description: 我的vant组件
 * @Author: ZhangChen
 * @Date: 2021-01-11 11:19:45
 * @LastEditors: ZhangChen
 * @LastEditTime: 2021-01-26 17:03:27
 * @FilePath: \testpro\src\views\myComps.vue
-->
<template>
  <div class="myComps">
    <!-- 移动端横向可滚动栏 -->
    <div class="join_detail_nav  ">
      <ul class=" join_detail_nav_list">
        <li
          class="join_detail_nav_item  "
          :class="scrollActive == index ? 'jdn_item_active' : ''"
          v-for="(item, index) in 7"
          :key="index"
          @click="pitchOn(index, $event)"
        >
          加盟详{{ index }}
        </li>
      </ul>
    </div>
    <!-- 可横向滚动的组件 -->
    <filtersTab :list="filtersList" v-model="active">
      <template v-slot:title="{ title }">
        <div class="tab-block">
          <div class="tab-block-title">{{ title.title }}</div>
          <div v-if="title.info != 0" class="tab-block-info">
            <p class="tab-block-info-text">{{ title.info }}</p>
          </div>
        </div>
      </template>
    </filtersTab>
    <!-- <filtersTab
      :list="filtersList"
      v-model="active"
      itemColor="#03648f"
      lineColor="#03648f"
    ></filtersTab> -->
    <div>{{ active }}</div>

    <van-cell-group title="基本信息">
      <comField
        title="邮箱"
        :value="company.email"
        placeholder="请填写邮箱"
        currentkey="email"
        validatetype="email"
        :required="true"
        ref="email"
        @modelInput="modelInput"
      ></comField>
      <comField
        title="手机号"
        type="number"
        :value="company.phone"
        placeholder="请填写手机号"
        currentkey="phone"
        validatetype="phone"
        :required="true"
        :maxlength="11"
        ref="phone"
        @modelInput="modelInput"
      ></comField>
    </van-cell-group>
    <van-cell-group title="普通选择器">
      <comPicker
        title="卡片类型"
        :value="company.card_type"
        placeholder="请选择卡片类型"
        pickertype="card_type"
        currentkey="card_type"
        :pickerList="pickerList"
        :required="true"
        :errFlag="true"
        ref="card_type"
        @onPickerSelect="onSelected"
      ></comPicker>
      <comPicker
        title="身份证类型"
        :value="company.idNoLx"
        placeholder="请选择身份证类型"
        pickertype="idNoLx"
        currentkey="idNoLx"
        :pickerList="pickerList"
        :errFlag="true"
        ref="idNoLx"
        @onPickerSelect="onSelected"
      ></comPicker>
    </van-cell-group>

    <!-- 时间选择器 -->
    <van-cell-group title="时间选择器">
      <datePicker
        title="证件有效期"
        value="请选择开始时间"
        currentkey="type_begin_date"
        :currentDate="company.type_begin_date"
        :required="true"
        :errFlag="true"
        ref="type_begin_date"
        @onDatePickerSelect="onDatePickerSelected"
      ></datePicker>
      <datePicker
        title="有效期至"
        value="请选择截止时间"
        currentkey="type_end_date"
        :required="true"
        :errFlag="true"
        ref="type_end_date"
        @onDatePickerSelect="onDatePickerSelected"
      ></datePicker>
    </van-cell-group>

    <!-- 地区选择器 -->
    <van-cell-group title="时间选择器">
      <areaPicker
        title="地址"
        value="请选择地址"
        :prov_id="company.prov_id"
        :area_id="company.area_id"
        :district_id="company.district_id"
        :required="true"
        :errFlag="true"
        ref="district_id"
        @onSelectArea="onSelectAreaed"
      ></areaPicker>
      <areaPicker
        title="地址2"
        value="请选择地址2"
        areaNo="2"
        :prov_id="company.prov_id2"
        :area_id="company.area_id2"
        :district_id="company.district_id2"
        :required="true"
        :errFlag="true"
        ref="district_id2"
        @onSelectArea="onSelectAreaed"
      ></areaPicker>
    </van-cell-group>

    <div style="margin-bottom:40px;"></div>
    <van-button
      type="info"
      block
      round
      style="width:95%; margin:0 auto;"
      @click="btnNext"
      >下一步</van-button
    >

    <div id="map-container" class="map-container"></div>
  </div>
</template>
<script>
import comField from "../components/comField";
import comPicker from "../components/comPicker";
import datePicker from "../components/datePicker";
import areaPicker from "../components/areaPicker";
import { Picker } from "../util/picker";
import { location } from "../util/getLocation";
import { Dialog } from "vant";
import filtersTab from "../components/tabs";

import {
  checkTelphone,
  checkEmail,
  checkPassword,
  checkCode,
} from "../util/util";
import Toast from "vant/lib/toast/index";
export default {
  data() {
    return {
      company: {
        email: "1464481294@qq.com",
        phone: "",
        card_type: "0",
        idNoLx: "",
        type_begin_date: "20201231",
        type_end_date: "",
        prov_id: "320000",
        area_id: "320100",
        district_id: "320114",
        prov_id2: "",
        area_id2: "",
        district_id2: "",
      },
      pickerList: Picker, //--// 选择器的数据源
      scrollActive: 0,

      filtersList: [
        { title: "所有订单1", info: 0 },
        { title: "待支付1", info: 0 },
        { title: "待发货1", info: 0 },
        { title: "已发货1", info: 0 },
        { title: "售后中1", info: 0 },
        { title: "已完成1", info: 0 },
        { title: "所有订单2", info: 0 },
        { title: "待支付2", info: 0 },
        { title: "待发货2", info: 0 },
        { title: "已发货2", info: 0 },
        { title: "售后中2", info: 0 },
        { title: "已完成2", info: 0 },
      ],
      active: 0,
    };
  },
  computed: {},
  methods: {
    pitchOn(params, e) {
      this.scrollActive = params;
      let obj = document.querySelector(".join_detail_nav_list");
      let objItems = document.querySelectorAll(".join_detail_nav_item");
      objItems.forEach((item, index) => {
        if (index == params) {
          // console.log(item.offsetLeft, "li.offsetLeft");
          // console.log(obj.offsetLeft, "ul.offsetLeft");
          // console.log(window.innerWidth, "window.innerWidth");

          let domoffsetWidth = item.offsetLeft,
            //中间值 =( 屏幕宽度 - li宽度 ) / 2;
            diffWidth = (window.innerWidth - item.offsetWidth) / 2,
            //目标值 = offset - 中间值
            targetOffset = -Math.abs(domoffsetWidth - diffWidth);
          // 父元素的宽度
          let ul_width = obj.getBoundingClientRect().width; //开始

          console.log(diffWidth, "diffWidth", targetOffset, "targetOffset");
          // 未超出中间值
          if (-targetOffset < diffWidth) {
            obj.style.left = 0;
            return;
          }
          //末尾
          if (targetOffset < window.innerWidth - ul_width) {
            obj.style.left = -Math.abs(window.innerWidth - ul_width) + "px";
            return;
          }
          //正常
          obj.style.left = -Math.abs(targetOffset) + "px";
        }
      });
    },
    // 表单文本输入
    modelInput(params) {
      let str = `${Object.keys(params)}`;
      this.company[str] = params[str];
      // console.log(this.company);
    },
    // 普通选择器
    onSelected(params) {
      let str = `${Object.keys(params.targetData)}`;
      this.company[str] = params.targetData[str];
      // console.log(this.company);
    },

    // 时间选择器
    onDatePickerSelected(params) {
      // console.log(params, "dateParams");
      let str = `${Object.keys(params.targetData)}`;
      this.company[str] = params.targetData[str];
      // console.log(this.company);
    },

    // 地域选择器
    onSelectAreaed(params) {
      console.log(params, "params");
      Object.keys(params.targetData).forEach((key) => {
        // console.log(key);
        // console.log(params.targetData[key]);
        this.company[key] = params.targetData[key];
      });
      // console.log(this.company);
    },

    // 点击按钮下一步
    btnNext() {
      // 非空验证
      for (const key in this.company) {
        if (Object.hasOwnProperty.call(this.company, key)) {
          const element = this.company[key];
          // console.log(key, "key");
          if (!element || element.trim().length == 0 || element == "") {
            if (this.$refs[key] && this.$refs[key].validateData) {
              this.$refs[key].validateData();
            } else if (this.$refs[key] && this.$refs[key].onClosePopup) {
              this.$refs[key].onClosePopup();
            } else if (this.$refs[key] && this.$refs[key].onCloseDatePopup) {
              this.$refs[key].onCloseDatePopup();
            } else if (this.$refs[key] && this.$refs[key].onCloseAreaPopup) {
              this.$refs[key].onCloseAreaPopup();
            }
          }
        }
      }
      // 格式验证
      for (const key in this.company) {
        if (this.company[key] != "" && key == "email") {
          if (!checkEmail(this.company[key])) {
            Toast("邮箱格式不正确，请重新输入！");
            this.$refs[key].errorMsg = "邮箱格式不正确，请重新输入！ ";
            return false;
          }
        } else if (this.company[key] != "" && key == "phone") {
          if (!checkTelphone(this.company[key])) {
            Toast("手机号格式不正确，请重新输入!");
            this.$refs[key].errorMsg = "手机号格式不正确，请重新输入! ";
            return false;
          }
        } else if (this.company[key] != "" && key == "ID_no") {
          if (!checkCode(this.company[key])) {
            Toast("身份证号码不正确，重新输入!");
            this.$refs[key].errorMsg = "身份证号码不正确，重新输入! ";
            return false;
          }
        } else if (
          !this.company[key] ||
          this.company[key].trim().length == 0 ||
          this.company[key] == ""
        ) {
          Toast({
            message: "必填参数缺失，请仔细检查！",
            duration: 3500,
          });
          return false;
        }
      }

      // 调用相应的接口，实现功能
      setTimeout(() => {
        Toast({
          message: "进件成功！",
          duration: 3500,
          position: "top",
        });
      }, 2000);
    },

    /**获取地图定位*/
    // getLocation() {
    //   let _that = this;
    //   let geolocation = location.initMap("map-container"); //定位
    //   AMap.event.addListener(geolocation, "complete", (result) => {
    //     console.log(result, "result");
    //     _that.lat = result.position.lat;
    //     _that.lng = result.position.lng;
    //     _that.province = result.addressComponent.province;
    //     _that.city = result.addressComponent.city;
    //     _that.district = result.addressComponent.district;
    //   });
    // },
  },
  created() {},
  mounted() {
    this.$refs.district_id.getLocation();
    this.$refs.district_id2.getLocation();
    // this.getLocation(); // 调用获取地理位置
    // Dialog.confirm({
    //   title: "提示",
    //   message: "创乐付想要获取您的地理位置！",
    // }).then(() => {
    //   // on close
    //   this.$refs.district_id.getLocation();
    //   this.$refs.district_id2.getLocation();
    // });
  },
  components: {
    comField,
    comPicker,
    datePicker,
    areaPicker,
    filtersTab,
  },
};
</script>
<style lang="less" scoped>
.titleCls {
  color: #333 !important;
}
.myComps {
  height: 100vh;
  background: #e7e7e7;
}

// 移动端横向可滚动栏
.join_detail_nav {
  background-color: #fff;
  border-bottom: 1px solid #ebebeb;
  overflow-x: auto;
  display: flex;
  align-items: center;
}

.join_detail_nav::-webkit-scrollbar {
  display: none;
}

.join_detail_nav_list {
  padding: 0 4%;
  width: auto;
  background-color: #fff;
  white-space: nowrap;
  position: relative;
  transition: all 0.6s;
}

.join_detail_nav_item {
  position: relative;
  padding: 5px 0px;
  display: inline-block;
}

.join_detail_nav_item + .join_detail_nav_item {
  margin-left: 12px;
}

.join_detail_nav_item.jdn_item_active {
  font-size: 17px;
  color: #ff6d15;
}

.join_detail_nav_item.jdn_item_active::after {
  content: "";
  width: 100%;
  height: 2px;
  background-color: #ff6d15;
  position: absolute;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
}
.tabContent {
  margin-top: 20px;
  .tab-block {
    &-info {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ccc;
      position: absolute;
      right: -18px;
      top: 40%;
      transform: translate(0, -50%);
      &-text {
        font-size: 11px;
        font-weight: 600;
        color: #999999;
        line-height: 16px;
        text-align: center;
      }
    }
  }
}
</style>
