<template>
  <div class>
    <myHeader
      :list="list"
      @select="select"
      title="工作中心"
      :hasRight="true"
      :selIdx="selIdx"
      @workshop="workshop"
    />
    <cube-scroll
      :data="allArr"
      ref="scroll"
      style="position:fixed;top:41px;left:0;right:0;bottom:0"
    >
      <div class="bar"></div>
      <div class="title">设备</div>
      <div class="first-banner">
        <div class="point">
          <div><span style="background:rgb(95,216,89)"></span> 加工中</div>
          <div><span style="background:rgb(254,59,50)"></span> 空闲</div>
          <div><span style="background:rgb(254,151,50)"></span> 其他</div>
        </div>
        <swiper :options="swiperOption" ref="mySwiper" class="swiper1">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in _shebeiList" :key="index">
            <div class="box">
              <div
                v-for="ie in item"
                :key="ie.id"
                class="shebei"
                @click.stop="scale(ie.oldIdx)"
                :class="{ big: ie.big }"
              >
                <div class="top">
                  <div class="select">
                    <img
                      src="../xuanze.png"
                      @click.stop="handleSelectShebei(ie.oldIdx)"
                      alt
                    />

                    <span
                      v-show="ie.showOption&&ie.deviceStatus == 1"
                      style
                      class="iconfont icon-xiangshang-"
                    ></span>
                    <div v-show="ie.showOption&&ie.deviceStatus == 1">
                      <div
                        @click="wangong(2, ie.deviceId, 1, ie.pgId)"
                        v-show="ie.deviceStatus == 1"
                      >
                        完成
                      </div>
                      <div
                        @click="join(ie.memberId)"
                        v-show="ie.deviceStatus == 1"
                      >
                        加入
                      </div>
                      <div
                        @click="ybwg(ie.deviceId, ie.pgId)"
                       v-show="ie.deviceStatus == 1"
                      >
                        预报
                      </div>
                       <div
                        @click="jiaojie(1, ie.deviceId, 1, ie.pgId)"
                        v-show="ie.deviceStatus == 1"
                      >
                        交接
                      </div>
                      <div
                        @click="handleCancel(ie.deviceId, ie.pgId)"
                        v-show="ie.deviceStatus == 1"
                      >
                        取消
                      </div>
                    </div>
                  </div>
                  <div class="avater">
                    <img
                      v-if="ie.avatar"
                      :src="ie.avatar"
                      alt=""
                    />
                    <div v-else></div>
                  </div>
                </div>
                <div>{{ ie.memberName }}</div>
                <div
                  class="state"
                  :class="{
                    free: ie.memberStatus == 0,
                    ing: ie.memberStatus == 1,
                    repair: ie.memberStatus == '其他'
                  }"
                >
                  {{ ie.processList[0]?ie.processList[0].matNo:''}}
                </div>
                <!-- <div class="right-on">未点检{{ie.deviceStatus}}</div> -->
                <!-- <div
                  class="right-on"
                  v-if="ie.deviceStatus !== '0' && ie.deviceStatus !== '1'"
                >
                  维修中
                </div> -->
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="bar"></div>
      <div class="second-banner">
        <div class="title">待加工</div>
        <swiper ref="mySwiper2" :options="swiperOption2" class="swiper2">
          <!-- slides -->
          <swiper-slide
            v-for="(slide, index) in _waitList"
            :key="index"
            class="second-swipe"
          >
            <div
              v-for="(item, idx) in slide"
              :key="idx"
              style
              @click="handleSelectWait(item.oldIdx)"
              @touchstart.stop="tS($event, idx, index)"
              @touchmove.stop="tM($event, idx, index)"
              @touchend.stop="tE($event, idx, index)"
              ref="moveBox"
              class="moveBox"
            >
              <div class="alert-box" v-show="item.showOption">
                <div @touchstart.stop="toTop(item.popId)">置顶</div>
                <div
                  @touchstart.stop="yubao(item.popId)"
                  @touchmove.stop="() => {}"
                  @touchend.stop="() => {}"
                >
                  预报
                </div>
                <div>详情</div>
              </div>
              <div class>
                <img
                  :src="item.imgUrl || require('@/assets/default.png')"
                  class="gjimg"
                  alt
                />
              </div>
              <div class="text">
                <span>{{ item.matNo }}</span>
                <p>{{ item.matName }}</p>
              </div>
            </div>
            <div
              style="display:flex;align-items:center;justify-content:center;background:#fff"
              @click="getPart(1)"
              v-if="index == _waitList.length - 1"
            >
              <span
                style="font-size:60px;color:#dcdcdc"
                class="iconfont icon-jia"
              ></span>
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination2"
            style="display:flex;align-items:center;justify-content:center;height:30px;"
            slot="pagination"
          ></div>
        </swiper>
      </div>
      <div class="bar"></div>
      <div class="second-banner">
        <div class="title">已完工（待转出）</div>
        <swiper
          ref="mySwiper3"
          :options="swiperOption3"
          class="swiper2"
          style="overflow-y: visible !important;"
        >
          <!-- slides -->
          <swiper-slide
            v-for="(slide, index) in _doneList"
            :key="index"
            class="second-swipe"
          >
            <div
              v-for="(item, idx) in slide"
              :key="idx"
              style="position:relative;"
            >
              <div class>
                <img
                  :src="item.imgUrl || require('@/assets/default.png')"
                  alt
                  class="gjimg"
                />
              </div>
              <div class="text">
                <span>{{ item.matNo }}</span>
                <p>{{ item.matName }}</p>
              </div>
            </div>
            <div
              style="display:flex;align-items:center;justify-content:center;background:#fff"
              @click="getPart(2)"
              v-if="index == _doneList.length - 1"
            >
              <span
                style="font-size:60px;color:#dcdcdc"
                class="iconfont icon-jian"
              ></span>
            </div>
          </swiper-slide>
          <div
            class="swiper-pagination3"
            style="display:flex;align-items:center;justify-content:center;height:30px;"
            slot="pagination"
          ></div>
        </swiper>
      </div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </cube-scroll>
    <cube-popup type="my-popup" ref="myPopup">操作成功</cube-popup>
    <!-- <toSynergy v-if="bigMode" /> -->
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import myHeader from '@/components/header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import toSynergy from '@/components/ToSynergy'
import {
  getPmPgList,
  getDeviceAndStatus,
  getProcessTask,
  setStartProcessTask,
  setWaitProcessTaskTop,
  setTask,
  setTaskPrediction,
  setProcessTaskPrediction,
  isPgLeader,
  allocateProcessTask,
  joinProcessingGroup
} from '@/api/baogong/baogong'
import { setTimeout } from 'timers'
import { reject } from 'q'
var vm
var startTime
var endTime // 预报用
var popId // 预报用
var pgId // 预报用
var deviceId // 预报用
export default {
  data () {
    return {
      shebeiCurrentIdx: 0,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
          reachEnd: function (event) {
            if (vm._shebeiList.length > 1) {
              vm._getDeviceAndStatus()
            }
          },
          touchEnd: function (event) {
            this.shebeiCurrentIdx = this.activeIndex
          }
        }
      },
      swiperOption2: {
        pagination: {
          el: '.swiper-pagination2'
        },
        on: {
          reachEnd: function (event) {
            if (vm._waitList.length > 1) {
              vm._getProcessTask()
            }
          }
        }
      },
      swiperOption3: {
        pagination: {
          el: '.swiper-pagination3'
        },
        on: {
          reachEnd: function (event) {
            if (vm._doneList.length > 1) {
              vm._getProcessTaskDone()
            }
          },
          touchEnd: function (event) {
            // console.log(event);
          }
        }
      },
      title: '工作中心',
      pgId: '', // 工作中心id
      ullDownRefresh: {
        stop: 55
      },
      selIdx: 0,
      list: [], // 工作中心列表
      source: {}, // 手移动工件时所需要的定位
      modalID: 'zhezhao',
      shebeiList: [], // 设备列表
      waitList: [], // 待加工工件列表
      doneList: [], // 已完成工件列表
      shebeiPage: 1, // 获取设备列表页码
      shebeiPageSize: 12, // 获取设备列表每页的数量
      waitPage: 1,
      waitPageSize: 16,
      donePage: 1,
      donePageSize: 16,
      shebeiHasmore: true, // 设备列表是否有更多
      waitHasmore: true,
      doneHasmore: true,
      shebeiArray: [], // 当前显示在页面上的设备列表
      storeWaitList: null,
      isLeader: 0,
      opr: 'jiagong'
    }
  },
  created () {
    vm = this
    // const token = this.$route.query.token
    // const uid = this.$route.query.uid
    const deviceId = this.$route.query.deviceId
    // const WEBURL = this.$route.query.weburl
    const pgId = this.$route.query.pgId
    const pgName = this.$route.query.pgName
    // if (token) {
    //   sessionStorage.setItem('token', token)
    // }
    // if (uid) {
    //   localStorage.setItem('uid', uid)
    // }
    // if (WEBURL) {
    //   localStorage.setItem('WEBURL', WEBURL)
    // }
    if (deviceId) {
      console.log('进来了')
      const that = this
      getPmPgList({ deviceId })
        .then(res => {
          // console.log(res.list)
          that.list = res.list
          if (!that.pgId) {
            that.pgId = res.list[0].pgId
          }
          that.select()
        })
        .catch(err => {
          this.showToast(err.msg)
        })
    } else if (pgId) {
      this.pgId = pgId
      this.list = [{
        pgName: pgName,
        pgId: pgId
      }]
      this.select()
    } else {
      this.select()
    }
  },
  components: {
    swiper,
    swiperSlide,
    myHeader
    // toSynergy
  },
  computed: {
    allArr () {
      // console.log([...this.waitList, ...this.shebeiList, ...this.doneList]);
      return [...this.waitList, ...this.shebeiList, ...this.doneList]
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    _shebeiList () {
      const that = this
      var newArr = []
      var length = Math.ceil((that.shebeiList.length + 1) / 6)
      // console.log(length);
      for (let j = 0; j < length; j++) {
        var arr = []
        for (let i = 0; i < 6; i++) {
          if (that.shebeiList[j * 6 + i]) {
            // console.log(that.shebeiList[i]);
            arr.push(that.shebeiList[j * 6 + i])
          }
        }
        newArr.push(arr)
      }
      return newArr
    },
    _waitList () {
      // console.log(this.waitList);
      var newArr = []
      var length = Math.ceil((this.waitList.length + 1) / 8)
      for (let j = 0; j < length; j++) {
        var arr = []
        for (let i = 0; i < 8; i++) {
          if (this.waitList[j * 8 + i]) {
            arr.push(this.waitList[j * 8 + i])
          }
        }
        newArr.push(arr)
      }
      // console.log(newArr);
      return newArr
    },
    _doneList () {
      // console.log(this.doneList);
      var newArr = []
      var length = Math.ceil((this.doneList.length + 1) / 8)
      for (let j = 0; j < length; j++) {
        var arr = []
        for (let i = 0; i < 8; i++) {
          if (this.doneList[j * 8 + i]) {
            arr.push(this.doneList[j * 8 + i])
          }
        }
        newArr.push(arr)
      }
      // console.log(newArr);
      return newArr
    },
    // eslint-disable-next-line vue/return-in-computed-property
    bigMode () {
      return this.shebeiList.some(item => {
        return item.big
      })
    }
  },
  mounted () {
    document.onclick = function () {
      // console.log(vm.shebeiList)
      for (let i = 0; i < vm.shebeiList.length; i++) {
        vm.shebeiList[i].showOption = false
      }
      for (let i = 0; i < vm.waitList.length; i++) {
        vm.waitList[i].showOption = false
      }
      for (let i = 0; i < vm.shebeiList.length; i++) {
        vm.$set(vm.shebeiList[i], 'big', false)
      }
      if (vm.storeWaitList !== null) {
        vm.waitList = vm.storeWaitList
        vm.storeWaitList = null
      }
    }
  },
  methods: {
    join (memberId) {
      joinProcessingGroup({
        memberId,
        pgId: this.pgId
      }).then(res => {
        console.log('%%%', res)
      }).catch(err => {
        this.showToast(err.msg || '')
      })
    },
    spotcheck (deviceId) {
      this.$router.push({
        query: {
          deviceId: deviceId
        },
        path: '/spotcheck'
      })
    },
    // 维修
    weixiu (deviceId) {
      this.$router.push({
        query: {
          deviceId: deviceId,
          forceEdit: '1'
        },
        path: '/device/add'
      })
    },
    workshop (list) {
      if (list.length === 0) {
        this.showToast('没有可选车间')
        return
      }
      this.picker = this.$createPicker({
        title: '选择要查看的车间',
        data: [list],
        onSelect: this.selectWork
      })
      this.picker.show()
    },
    selectWork (selectedVal, selectedIndex, selectedText) {
      // console.log(selectedVal.join(", "));
      this.$router.push({
        path: '/baogong/work-shop',
        query: {
          id: selectedVal.join(', '),
          name: selectedText.join(', ')
        }
      })
    },
    ybwg (id, pid) {
      deviceId = id
      pgId = pid
      // console.log(deviceId);
      const dateTimePicker = this.$createDatePicker({
        title: '选择预计完工时间',
        min: new Date(),
        value: new Date(),
        columnCount: 5,
        onSelect: this.selectE,
        onCancel: this.cancelHandle
      })
      dateTimePicker.show()
    },
    handleCancel (id, pid) {
      this.$createDialog({
        type: 'confirm',
        icon: '',
        title: '注意',
        content: '是否取消加工该设备下的所有工件',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          setStartProcessTask({
            deviceId: id,
            flag: 2,
            pgId: vm.pgId
          })
            .then(res => {
              this.showToast('操作成功')
              this.select()
            })
            .catch(err => {
              this.showToast(err.msg || '操作失败')
            })
        }
      }).show()
    },
    selectE (date, selectedVal, selectedText) {
      endTime =
        selectedVal[0] +
        '-' +
        selectedVal[1] +
        '-' +
        selectedVal[2] +
        ' ' +
        selectedVal[3] +
        ':' +
        selectedVal[4]
      // console.log(deviceId);
      setProcessTaskPrediction({
        deviceId,
        pgId,
        predictEndTime: endTime
      })
        .then(res => {
          this.showToast('预报加工时间成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    yubao (id) {
      popId = id
      const dateTimePicker = this.$createDatePicker({
        title: '选择预计开始时间',
        min: new Date(),
        value: new Date(),
        columnCount: 5,
        onSelect: this.selectStart,
        onCancel: this.cancelHandle
      })
      dateTimePicker.show()
    },
    selectStart (date, selectedVal, selectedText) {
      // console.log(selectedVal,selectedText)
      startTime =
        selectedVal[0] +
        '-' +
        selectedVal[1] +
        '-' +
        selectedVal[2] +
        ' ' +
        selectedVal[3] +
        ':' +
        selectedVal[4]
      // console.log(startTime)
      const dateTimePicker = this.$createDatePicker({
        title: '选择预计完工时间',
        min: date,
        value: new Date(),
        columnCount: 5,
        onSelect: this.selectEnd,
        onCancel: this.cancelHandle
      })
      dateTimePicker.show()
    },
    selectEnd (date, selectedVal, selectedText) {
      endTime =
        selectedVal[0] +
        '-' +
        selectedVal[1] +
        '-' +
        selectedVal[2] +
        ' ' +
        selectedVal[3] +
        ':' +
        selectedVal[4]
      setTaskPrediction({
        popId,
        predictStartTime: startTime,
        predictEndTime: endTime
      })
        .then(res => {
          // console.log(res)
          this.showToast('预报加工时间成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
          // this.showToast('预报加工时间失败')
        })
    },
    showToast (val) {
      const toast = this.$createToast({
        type: 'txt',
        txt: val
      })
      toast.show()
    },
    showPopup (refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    fixedE (element) {
      // console.log( element.getBoundingClientRect())
    },
    addWork (
      deviceId,
      flag,
      memberId,
      setStatus,
      partQty,
      popId,
      pgId,
      batchProcId
    ) {
      // console.log({
      //   deviceId,
      //   flag,
      //   memberId,
      //   setStatus,
      //   partQty,
      //   popId,
      //   pgId,
      //   batchProcId
      // })
    },
    jiaojie (type, deviceId, flag, pgId) {
      setTask({ type, deviceId, flag, pgId })
        .then(res => {
          // console.log(res);
          this.select()
          this.showToast('操作成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    wangong (type, deviceId, flag, pgId) {
      setTask({ type, deviceId, flag, pgId })
        .then(res => {
          // console.log(res)
          this.select()
          this.showToast('操作成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    handleSelectShebei (index) {
      // console.log(1);
      for (let i = 0; i < this.shebeiList.length; i++) {
        // this.shebeiList[index].showOption = false;
        // this.$set( this.shebeiList[index],'showOption',false)
        if (i === index) {
          this.shebeiList[i].showOption = !this.shebeiList[index].showOption
        } else {
          this.shebeiList[i].showOption = false
        }
      }
      // this.shebeiList[index].showOption = !this.shebeiList[index].showOption;
      // this.shebeiList[index].showOption = false;
    },
    scale (index) {
      for (let i = 0; i < this.shebeiList.length; i++) {
        // this.shebeiList[index].showOption = false;
        // this.$set( this.shebeiList[index],'showOption',false)
        if (i === index) {
          this.$set(this.shebeiList[i], 'big', true)
          if (!this.storeWaitList || this.storeWaitList.length === 0) {
            this.storeWaitList = this.waitList
          }
          this.waitList = this.shebeiList[i].waitProcessList || []
          // this.shebeiList[i].big = true
        } else {
          this.$set(this.shebeiList[i], 'big', false)
        }
      }
    },
    handleSelectWait (index) {
      for (let i = 0; i < this.waitList.length; i++) {
        if (i === index) {
          this.waitList[i].showOption = !this.waitList[index].showOption
        } else {
          this.waitList[i].showOption = false
        }
      }
      // this.waitList[index].showOption = !this.waitList[index].showOption;
    },
    select (pgId, index) {
      const that = this
      if (typeof pgId === 'undefined') {
      } else {
        this.pgId = pgId
      }
      if (typeof index === 'undefined') {
      } else {
        this.selIdx = index
      }
      that.shebeiList = []
      that.doneList = []
      that.waitList = []
      that.shebeiPage = 1
      that.waitPage = 1
      that.donePage = 1
      that.shebeiHasmore = true
      that.waitHasmore = true
      that.doneHasmore = true
      that._getDeviceAndStatus()
      that._getProcessTask()
      that._getProcessTaskDone()
    },

    getPart (type) {
      // router.replace('/baogong/manage?type='+type)
      this.$router.push({
        path: '/baogong/manage',
        query: {
          type,
          pgId: this.pgId
        }
      })
    },
    tS (e, index, idx) {
      // 开始移动工件
      this.shebeiArray = []
      var shebeiDom = document.getElementsByClassName('shebei')
      var myDom = Array.prototype.slice.call(
        shebeiDom,
        this.shebeiCurrentIdx * 6,
        this.shebeiCurrentIdx * 6 + 6
      )
      for (var i = 0; i < myDom.length; i++) {
        this.shebeiArray.push(myDom[i].getBoundingClientRect())
      }
      let element = e.targetTouches[0] // 记录初始 client 位置，用于计算移动距离
      this.source.client = {
        x: element.clientX,
        y: element.clientY
      }
    },
    tM (e, index, idx) {
      // 工件移动中
      let element = e.targetTouches[0]
      let x = element.clientX - this.source.client.x
      let y = element.clientY - this.source.client.y
      document.getElementsByClassName('moveBox')[8 * idx + index].style = `transform: translate(${x}px, ${y}px);z-index:10;`
    },
    tE (e, index, idx) {
      // 松手
      document.getElementsByClassName('moveBox')[8 * idx + index].style = `transform: none;z-index:1`
      let element = e.changedTouches[0]
      let a = element.clientX
      let b = element.clientY
      let x = element.clientX - this.source.client.x
      let y = element.clientY - this.source.client.y
      if (x <= 5 && x >= -5 && y <= 5 && y >= -5) {
        this.handleSelectWait(idx * 8 + index)
        return
      }
      for (let i = 0; i < this.shebeiArray.length; i++) {
        if (
          a > this.shebeiArray[i].left &&
          a < this.shebeiArray[i].right &&
          b < this.shebeiArray[i].bottom &&
          b > this.shebeiArray[i].top
        ) {
          // 若松手位置是设备所在位置
          console.log('&^%$:', this.isLeader)
          if (this.isLeader) {
            console.log('我进来了')
            console.log(this)
            this.$createDialog({
              type: 'confirm',
              icon: '',
              title: '注意',
              content: `请选择分配任务或加工任务`,
              confirmBtn: {
                text: '加工',
                active: true,
                disabled: false,
                href: 'javascript:;'
              },
              cancelBtn: {
                text: '分配',
                active: false,
                disabled: false,
                href: 'javascript:;'
              },
              onCancel: () => {
                // 分配函数
                // const res = await allocateProcessTask()
                this.opr = 'fenpei'
                this.showMymodel(i, idx, index)
              },
              onConfirm: () => {
                this.opr = 'jiagong'
                this.showMymodel(i, idx, index)
              }
            }).show()
          }
        } else {
        }
      }
    },
    showMymodel (i, idx, index) {
      console.log(i, idx, index)
      this.$createDialog({
        type: 'confirm',
        icon: '',
        title: '注意',
        content: `是否确认${
          this.opr === 'fenpei' ? '分配工件至' : '使此工件加入'
        }${this.shebeiList[this.shebeiCurrentIdx * 6 + i].deviceName}`,
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          if (this.opr === 'fenpei') {
            allocateProcessTask({
              memberId: this.shebeiList[this.shebeiCurrentIdx * 6 + i].memberId,
              flag: '1',
              popId: this._waitList[idx][index].popId
            })
              .then(res => {
                this.showToast('操作成功')
                this.select()
              })
              .catch(err => {
                this.showToast(err.msg || '操作失败')
              })
          } else {
            if (this._waitList[idx][index].partQty === 1) {
              setStartProcessTask({
                memberId: this.shebeiList[this.shebeiCurrentIdx * 6 + i]
                  .memberId,
                flag: 1,
                partQty: 1,
                popId: this._waitList[idx][index].popId,
                pgId: this._waitList[idx][index].pgId
              })
                .then(res => {
                  this.showToast('操作成功')
                  this.select()
                })
                .catch(err => {
                  this.showToast(err.msg || '操作失败')
                })
            } else {
              this.$createDialog({
                type: 'prompt',
                title: `输入添加数量(范围1-${this._waitList[idx][index].partQty})`,
                prompt: {
                  value: '',
                  placeholder: `请输入1-${this._waitList[idx][index].partQty}范围内的数字`
                },
                onConfirm: (e, promptValue) => {
                  if (
                    typeof parseInt(promptValue) === 'number' &&
                    parseInt(promptValue) >= 0 &&
                    parseInt(promptValue) <=
                      this._waitList[idx][index].partQty * 1
                  ) {
                    if (this.opr === 'fenpei') {
                    } else {
                      setStartProcessTask({
                        deviceId: this.shebeiList[this.shebeiCurrentIdx * 6 + i]
                          .deviceId,
                        flag: 1,
                        partQty: promptValue,
                        popId: this._waitList[idx][index].popId,
                        pgId: this._waitList[idx][index].pgId
                      })
                        .then(res => {
                          this.showToast('操作成功')
                          this.select()
                        })
                        .catch(err => {
                          if (err.msg) {
                            this.showToast(err.msg)
                          }
                        })
                    }
                  } else {
                    this.showToast('输入有误，请重新输入')
                  }
                }
              }).show()
            }
          }
        },
        onCancel: () => {}
      }).show()
    },
    createModal (id) {
      let modal = document.getElementById(id)
      if (!modal) {
        // 在没有遮罩的时候创建遮罩
        modal = document.createElement('div')
        modal.id = id
        modal.style.cssText = `position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 999;`
        document.body.appendChild(modal)
      }
    },
    _getDeviceAndStatus () {
      const that = this
      // console.log(that.shebeiPage)
      if (this.shebeiHasmore) {
        this.shebeiHasmore = false
        getDeviceAndStatus({
          pageNum: that.shebeiPage,
          pageSize: that.shebeiPageSize,
          pgId: that.pgId
        })
          .then(res => {
            console.log('$$$$$')
            console.log(res.memberList)
            if (res.memberList.length === that.shebeiPageSize) {
              that.shebeiHasmore = true
              that.shebeiPage++
            }

            var arr = [...that.shebeiList, ...res.memberList]
            for (let i = 0; i < arr.length; i++) {
              arr[i]['showOption'] = false
              arr[i]['oldIdx'] = i
            }
            that.shebeiList = arr
          })
          .catch(err => {
            this.showToast(err.msg || '获取人员失败')
          })
      } else {
        // console.error("meiyougengduo");
      }
    },
    _getProcessTask () {
      const that = this
      if (that.waitHasmore) {
        that.waitHasmore = false
        getProcessTask({
          pageNum: that.waitPage,
          pageSize: that.waitPageSize,
          pgId: that.pgId,
          type: 1
        })
          .then(res => {
            if (res.list.length === that.waitPageSize) {
              that.waitHasmore = true
              that.waitPage++
            }
            var arr = [...that.waitList, ...res.list]
            for (let i = 0; i < arr.length; i++) {
              arr[i]['showOption'] = false
              arr[i]['oldIdx'] = i
            }
            that.waitList = arr
          })
          .catch(err => {
            this.showToast(err.msg || '错误')
            reject(err)
          })
      } else {
        // console.error("meiyougengduo");
      }
    },
    _getProcessTaskDone () {
      const that = this
      if (that.doneHasmore) {
        that.doneHasmore = false
        getProcessTask({
          pageNum: that.donePage,
          pageSize: that.donePageSize,
          pgId: that.pgId,
          type: 2
        })
          .then(res => {
            if (res.list.length === that.donePageSize) {
              that.doneHasmore = true
              that.donePage++
            }
            var arr = [...that.doneList, ...res.list]
            for (let i = 0; i < arr.length; i++) {
              arr[i]['showOption'] = false
              arr[i]['oldIdx'] = i
            }
            that.doneList = arr
            // console.log(arr);
          })
          .catch(err => {
            // console.log(3)
            reject(err)
          })
      } else {
        // console.error("meiyougengduo");
      }
    },
    toTop (popId) {
      setWaitProcessTaskTop({
        popId
      }).then(res => {
        this.select()
        this.showToast('设置置顶成功')
        // console.log(res);
      })
    }
  },
  watch: {
    allArr () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 300)
    },
    pgId (old, newvalue) {
      isPgLeader({ pgId: old }).then(res => {
        console.log('#####', res)
        this.isLeader = res.returnInfo.isLeader
      })
    }
  }
}
</script>
<style scope lang="less" scoped>
body {
  background: #fff;
}
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
  transition: all 0.1s;
}
.box > div.big {
  // background: #000;
  transform: scale(1.1);
  box-shadow: 5px 5px 5px #d3d3d3;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 0 0;
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
  font-size: 10px;
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
  bottom: 0;
  transform: translateY(100%);

  background: rgb(255, 249, 173);
  color: #333;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  display: flex;
  width: 100px;
  font-size: 12px;
  z-index: 3;
  border-radius: 4px;
  left: -14px;
  padding: 0 4px 5px 4px;
}
.select > div > div {
  border-right: 1px solid #666;
  margin-top: 5px;
  width: 30%;
}
.select > div > div:nth-child(3n) {
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
  position: relative;
  font-size: 12px;
  width: 21%;
  margin: 2%;
  height: 100px;
  text-align: center;
  float: left;
}
.alert-box {
  position: absolute;
  top: 0;
  width: 80%;
  left: 10%;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  top: 20%;
  > div {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }
  > div:last-child {
    border: 0;
  }
}
.gjimg {
  width: 100%;
  height: 50px;
  border-radius: 4px;
}
.text {
  margin-top: 10px;
}
.text > span {
  color: #ff5e56;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.text > p {
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
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

.ing {
  background: #5fd858;
}
.free {
  background: #fd3b33;
}
.repair {
  background: #fe9732;
}
.icon-xiangshang- {
  font-size: 20px;
  color: #fff9ad;
  position: absolute;
  top: 9px;
  left: -2px;
}
.bg {
  position: fixed;
  top: 41px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
.avater {
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  div {
    width: 30px;
    height: 30px;
    background: #eee;
    border-radius: 50%;
  }
}
.big {
  background: #000;
}
</style>
