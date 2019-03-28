<template>
  <div class>
    <myHeader :list="list" @select="select" title="工作中心" :hasRight="true"/>
    <div class="clearFix"></div>
    <div class="bar"></div>
    <div class="title">设备</div>
    <div class="first-banner">
      <div class="point">
        <div>
          <span style="background:rgb(95,216,89)"></span> 正在加工
        </div>
        <div>
          <span style="background:rgb(254,59,50)"></span> 空闲
        </div>
        <div>
          <span style="background:rgb(254,151,50)"></span> 维修/保养
        </div>
      </div>
      <swiper :options="swiperOption" ref="mySwiper" class="swiper1">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in _shebeiList" :key="index">
          <div class="box">
            <div v-for="ie in item" :key="ie.id">
              <div class="top">
                <div class="select">
                  <img src="../xuanze.png" alt>
                  <div v-show="false">
                    <div>点检</div>
                    <div>点检</div>
                    <div>点检</div>
                    <div>点检</div>
                  </div>
                </div>
                <div>头像</div>
              </div>
              <div>{{ie.deviceNo}}</div>
              <div
                class="state"
                :class="{free:ie.deviceStatus==0,ing:ie.deviceStatus==1,repair:ie.deviceStatus=='其他'}"
              >{{ie.deviceName }}</div>
              <div class="right-on">未点检</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="bar"></div>
    <div class="second-banner">
      <div class="title">待加工</div>
      <swiper
        ref="mySwiper2"
        :options="swiperOption2"
        class="swiper2"
        style="overflow-y: visible !important;"
      >
        <!-- slides -->
        <swiper-slide v-for="(slide,index) in _waitList" :key="index" class="second-swipe">
          <div
            v-for="item in slide"
            :key="item.poId"
            style="position:relative;"
            @touchstart="tS"
            @touchmove="tM"
            @touchend="tE"
          >
            <div class>图片</div>
            <div class="text">
              <span>{{item.matNo}}</span>
              <p>{{item.matName}}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;background:#fff" @click="getPart(1)">
            <span style="font-size:60px;" class="iconfont icon-jia"></span>
          </div>
        </swiper-slide>
        <div
          class="swiper-pagination2"
          style="display:flex;align-items:center;justify-content:center;"
          slot="pagination"
        ></div>
      </swiper>
    </div>
    <div class="bar"></div>
  
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import myHeader from "@/components/header";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {
  getPmPgList,
  getSettingList,
  getDeviceAndStatus,
  getProcessTask,
  setStartProcessTask
} from "@/api/baogong/baogong";
import scroll from "@/components/BScroll";
import { setTimeout } from "timers";
import { reject, async, Promise } from "q";
import router from "../../router";
var disX = 0;
var disY = 0;
var vm;
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          reachEnd: function(event) {
            setTimeout(function() {
              vm._getDeviceAndStatus().then(data => {
                if (data.list.length == 12) {
                  vm.shebeiHasmore = true;
                  vm.shebeiPage++;
                }
                vm.shebeiList = [...vm.shebeiList, ...data.list];
              });
            }, 100);
          }
        }
      },
      swiperOption2: {
        pagination: {
          el: ".swiper-pagination2"
        }
      },
      title: "工作中心",
      pgId: "",
      ullDownRefresh: {
        stop: 55
      },
      list: [],
      source: {},
      modalID: "zhezhao",
      shebeiList: [],
      waitList: [],
      doneList: [],
      shebeiPage: 1,
      waitPage: 1,
      donePage: 1,
      shebeiHasmore: true,
      waitHasmore: true,
      doneHasmore: true
    };
  },
  created() {
    vm = this;
    const that = this;
    getPmPgList({ deviceId: "3" })
      .then(res => {
        that.list = res.list;
        that.pgId = res.list[0].pgId;
        that.select();
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    swiper,
    swiperSlide,
    myHeader,
    scroll
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    _shebeiList() {
      const that = this;
      var newArr = [];
      var length = Math.ceil((that.shebeiList.length + 1) / 6);
      console.log(length);
      for (let j = 0; j < length; j++) {
        var arr = [];
        for (let i = 0; i < 6; i++) {
          if (that.shebeiList[j * 6 + i]) {
            console.log(that.shebeiList[i]);
            arr.push(that.shebeiList[j * 6 + i]);
          }
        }
        newArr.push(arr);
      }
      return newArr;
    },
    _waitList() {
      console.log(this.waitList);
      var newArr = [];
      var length = Math.ceil((this.waitList.length + 1) / 8);
      for (let j = 0; j < length; j++) {
        var arr = [];
        for (let i = 0; i < 8; i++) {
          if (this.waitList[j * 8 + i]) {
            arr.push(this.waitList[j * 8 + i]);
          }
        }
        newArr.push(arr);
      }
      console.log(newArr);
      return newArr;
    },
     _doneList() {
      console.log(this.doneList);
      var newArr = [];
      var length = Math.ceil((this.doneList.length + 1) / 8);
      for (let j = 0; j < length; j++) {
        var arr = [];
        for (let i = 0; i < 8; i++) {
          if (this.doneList[j * 8 + i]) {
            arr.push(this.doneList[j * 8 + i]);
          }
        }
        newArr.push(arr);
      }
      console.log(newArr);
      return newArr;
    }
  },
  mounted() {},
  methods: {
    select(pgId) {
      const that = this;
      this.pgId = pgId;
      that.shebeiList = [];
      that.doneList = [];
      that.waitList = [];
      that.shebeiPage = 1;
      that.waitPage = 1;
      that.donePage = 1;
      that.shebeiHasmore = true;
      that.waitHasmore = true;
      that.doneHasmore = true;
      console.log(1231542222222222222222222222);
      that._getDeviceAndStatus().then(data => {
        if (data.list.length == 12) {
          that.shebeiHasmore = true;
          that.shebeiPage++;
        }
        that.shebeiList = [...that.shebeiList, ...data.list];
      });
      that._getProcessTask().then(data => {
        console.log(1231542222222222222222222222);
        console.log(data);
        this.waitList = [...that.waitList, ...data.list];
      });
      that._getProcessTaskDone().then(data => {
        console.log(1231542222222222222222222222);
        console.log(data);
        this.doneList = [...that.doneList, ...data.list];
      });
    },

    getPart(type) {
      // router.replace('/baogong/manage?type='+type)
      this.$router.push({
        path: "/baogong/manage",
        query: {
          type,
          pgId: this.pgId
        }
      });
    },
    tS(e) {
      this.createModal(this.modalID);
      let element = e.targetTouches[0]; // 记录初始 client 位置，用于计算移动距离
      this.source.client = {
        x: element.clientX,
        y: element.clientY
      };
      console.log(this.source);
    },
    tM(e) {
      let element = e.targetTouches[0];

      // 根据初始 client 位置计算移动距离
      let x = element.clientX - this.source.client.x;
      let y = element.clientY - this.source.client.y;

      // 移动当前元素
      element.target.style.cssText = `transform: translate(${x}px, ${y}px);z-index:10;`;
    },
    tE(e) {
      e.target.style.cssText = `transform: none;`;
      let modal = document.getElementById(this.modalID);
      document.body.removeChild(modal);
      e.target.style.cssText = `z-index:1`;
    },
    createModal(id) {
      let modal = document.getElementById(id);
      if (!modal) {
        // 在没有遮罩的时候创建遮罩
        modal = document.createElement("div");
        modal.id = id;
        modal.style.cssText = `position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 999;`;
        document.body.appendChild(modal);
      }
    },
    _getDeviceAndStatus() {
      const that = this;
      return new Promise((resolve, reject) => {
        if (this.shebeiHasmore) {
          this.shebeiHasmore = false;
          getDeviceAndStatus({
            pageNum: that.shebeiPage,
            pageSize: 12,
            pgId: that.pgId
          }).then(res => {
            console.error("出错了");
            resolve(res);
          });
        } else {
          console.error('出错了')
          reject();
        }
      });
    },
    _getProcessTask() {
      const that = this;
      return new Promise((resolve, reject) => {
        if (that.waitHasmore) {
          that.waitHasmore = false;
          getProcessTask({
            pageNum: that.waitPage, //页码(注意：选填参数[默认第一页])
            pageSize: 16, //页大小(注意：选填参数[默认10条])
            //当前选中设备Id（可为空）(注意：选填参数[当前选中设备Id])
            pgId: that.pgId, //当前工作中心Id (必填）(注意：必填参数[当前工作中心Id])
            type: 1
          })
            .then(res => {
              console.log(2222222222222222);
              resolve(res);
            })
            .catch(err => {
              //console.log(3)
              reject(err);
            });
        } else {
          reject(err);
        }
      });
    },
    _getProcessTaskDone() {
      const that = this;
      return new Promise((resolve, reject) => {
        if (that.doneHasmore) {
          that.doneHasmore = false;
          getProcessTask({
            pageNum: that.donePage, //页码(注意：选填参数[默认第一页])
            pageSize: 16, //页大小(注意：选填参数[默认10条])
            //当前选中设备Id（可为空）(注意：选填参数[当前选中设备Id])
            pgId: that.pgId, //当前工作中心Id (必填）(注意：必填参数[当前工作中心Id])
            type: 2
          })
            .then(res => {
              console.log(2222222222222222);
              resolve(res);
            })
            .catch(err => {
              //console.log(3)
              reject(err);
            });
        } else {
          reject(err);
        }
      });
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        let odiv = el; //获取当前元素
        //console.log(odiv)
        odiv.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;

          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            //绑定元素位置到positionX和positionY上面
            this.positionX = top;
            this.positionY = left;

            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  }
};
</script>
<style scope lang="less">
.clearFix {
  height: 41px;
}
.wrapper {
  position: fixed;
  top: 41px;
  bottom: 0;
  right: 0;
  left: 0;
}
swiper-slide {
  width: 100%;
  height: 200px;
  text-align: center;
  line-height: 200px;
}
.first-banner {
  width: 100%;
  margin: 0 auto;
}
.point {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.point > div {
  font-size: 12px;
  display: flex;
  align-items: center;
}
.point > div > span {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
}
.swiper1 {
  padding-bottom: 30px;
}

.box {
}
.box::after {
  clear: both;
  content: "";
  display: table;
}
.box > div {
  width: 30%;
  height: 120px;
  background: #dcdcdc;
  float: left;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  margin: 1.6%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  height: 30px;
  font-size: 12px;
}
.top img {
  width: 20px;
}

.box > div > div:nth-child(2) {
  margin-top: 20px;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
.box > div > div.right-on {
  position: absolute;
  top: -10px;
  right: -30px;
  background: rgb(84, 149, 255);
  color: #fff;
  font-size: 12px;
  height: 40px;
  width: 80px;
  text-align: center;
  line-height: 60px;
  transform: rotate(45deg);
}
.box > div:nth-child(3n) {
  margin-right: 0;
}
.top {
  display: flex;
  justify-content: space-around;
  height: 30px;
  font-size: 12px;
}

.select {
  position: relative;
}
.select > div {
  position: absolute;
  bottom: -20px;
  height: 20px;
  background: rgb(255, 249, 173);
  color: #333;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: block;
  padding: 0;
  display: flex;
  width: 100px;
  font-size: 12px;
  z-index: 3;
  border-radius: 4px;
  left: -14px;
  padding: 0 4px;
}
.select > div > div {
  border-right: 1px solid #333;
}
.select > div > div:last-child {
  border-right: none;
}
.state {
  width: 100%;
  height: 30px;
  background: green;
  line-height: 30px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.second-swipe {
  width: 100%;
}
.second-swipe::after {
  content: "";
  clear: both;
  display: table;
}
.second-swipe > div {
  font-size: 12px;
  width: 21%;
  margin: 2%;
  height: 100px;
  background: #000;
  text-align: center;
  float: left;
}
.text > span {
  color: red;
  font-size: 14px;
}
.text > p {
  font-size: 14px;
  color: #666;
}
.title {
  font-size: 16px;
  padding: 2%;
}
.swiper-pagination2 > span {
  clear: both;
}
.bar {
  height: 10px;
  background: rgb(248, 248, 248);
}
.swiper-container {
  overflow: visible !important;
  overflow-x: hidden !important;
}
.imng {
  background: #5fd858;
}
.free {
  background: #fd3b33;
}
.repair {
  background: #fe9732;
}
</style>
