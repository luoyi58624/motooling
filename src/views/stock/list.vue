<!--  -->
<template>
  <div>
    <div class="bg" v-show="showDrawerData" @click="hideDrawer"></div>
    <div class="search-wrapper" style="z-index:3">
      <input type="text" placeholder="搜索" @keyup.enter="search" v-model="queryValues">
    </div>
    <div class="option">
      <div>
        <div style="color:#4e92ff" @click="showList" v-show="timeSort==1">按生产订单排序</div>
        <div style="color:#4e92ff" @click="showList" v-show="timeSort==2">按盘点单排序</div>
        <div style="color:#4e92ff" @click="showList" v-show="timeSort==3">按物料类型排序</div>
        <div :class="{active:sortType==2}" @click="changSortType(2) ">
          升序
          <i class="iconfont">&#xe79e;</i>
        </div>
        <div :class="{active:sortType==1}" @click="changSortType(1)">
          降序
          <i class="iconfont">&#xe79f;</i>
        </div>
      </div>
      <div @click="showDrawer">筛选</div>
      <slide-up-down :active="showListData" :duration="300" class="slide-up">
        <div class="option-list">
          <div :class="{active:timeSort==1}" @click="changeTimeSort('1')">按库存地点排序</div>
          <div :class="{active:timeSort==2}" @click="changeTimeSort('2')">按盘点单排序</div>
          <div :class="{active:timeSort==3}" @click="changeTimeSort('3')">按物料类型排序</div>
        </div>
      </slide-up-down>
    </div>
    <cube-scroll
      class="scroll"
      ref="scroll"
      :data="list"
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp"
    >
      <div v-if="list.length==0&&hasMore==false" class="nocontent">暂时没有数据</div>
      <div class="list">
        <div class="manager" @click="toInfo(item.id)" v-for="(item,index) in list" :key="index">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div class="manage-top">
              <p>盘 点 单：{{item.checkBillNo}}</p>
            </div>
            <div class="state state1">
              {{approveList.filter(it=>{return item.approveStep==it.id})[0]['name']}}
              <!-- {{item.approveStep}}
              {{approveList}}-->
              <!-- {{it.approveStep}} -->
            </div>
            <div>物料类型: {{item.matTypeName}}</div>
            <div>库存地点: {{item.storeHouseId}}</div>
            <div>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期: {{item.createdAt.slice(0,10)}}</div>
            <cube-button :inline="true" style="width:100px;" @click.stop="pandian">盘点</cube-button>
            <cube-button :inline="true" style="width:100px;" @click.stop="statelist">状态列表</cube-button>
          </div>
        </div>
      </div>
      <div v-if="hasMore==false&&list.length>0" class="nocontent">没有更多数据了</div>
    </cube-scroll>

    <!-- <div class="bot">
      <div class="active">列表</div>
      <div>审核</div>
      <div>批准</div>
    </div> -->
    <transition name="slide-fade">
      <div class="drawer" v-show="showDrawerData">
        <div class="box">
          <div class="title">库存地点</div>
          <div class="wrp">
            <div
              class="bn"
              v-for="(item) in ivStorelist"
              :key="item.storeHouseName"
              @click="selLocation(item.storeHouseId)"
              :class="{'sel':selivStorelist.includes(item.storeHouseId)}"
            >{{item.storeHouseName}}</div>
          </div>
        </div>
        <div class="box">
          <div class="title">物料类型</div>
          <div class="wrp">
            <div
              class="bn"
              v-for="(item) in matTypeList"
              :key="item.matTypeId"
              @click="selType(item.matTypeId)"
              :class="{sel:selmatTypeList.includes(item.matTypeId)}"
            >{{item.typeName}}</div>
          </div>
        </div>
        <div class="box">
          <div class="title">状态</div>
          <div class="wrp">
            <div
              class="bn"
              v-for="item in approveList"
              :key="item.id"
              @click="selState(item.id)"
              :class="{sel:selapproveList.includes(item.id)}"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="box">
          <div class="title">库存地点</div>
          <div class="wrp">
            <div
              class="selTime"
              @click="showStartDate"
            >{{startTime[0]}}年{{startTime[1]}}月{{startTime[2]}}日</div>
            <div>-</div>
            <div class="selTime" @click="showEndDate">{{endTime[0]}}年{{endTime[1]}}月{{endTime[2]}}日</div>
          </div>
        </div>
        <cube-button @click="hideDrawer">确定</cube-button>
      </div>
    </transition>
    <div class="bg" style="z-index:2" @click="hideList" v-show="showListData"></div>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
import { getStockList, queryStoreHouseTypeList } from '../../api/stock/stock'
export default {
  data () {
    return {
      list: [],
      hasMore: true,
      isLoading: false,
      showDrawerData: false,
      showListData: false,
      startTime: [],
      endTime: [],
      queryValues: '', // 搜索
      timeSort: '1', // 排序条件(注意：(注意：必填参数,1 按库存地点，2 盘点单，3 按物料类型）)
      sortType: '', // 排序类型(注意：选填参数[排序类型]:1降序,2升序.默认升序)
      pageNum: 1, // 页码(注意：选填参数[默认第一页])
      pageSize: 10, // 每页条数(注意：选填参数[默认10条])
      mateTypeId: '', // 物料类型(注意：选填参数[多个用，隔开标准件，刀具，量具，毛呸，库存原料，办公用品])
      storeHouseId: '', // 库存地点(注意：选填参数[多个用，隔开深圳仓，东莞仓，广州仓，惠州仓，香港仓珠海仓])
      approveStep: '', // 审批状态(注意：选填参数[审批状态[step10-制定中，step11-驳回，step20-待审核，step30-待批准，step0-已通过, step00已通过]多选用逗号拼接)
      ivStorelist: [], // 仓库列表
      matTypeList: [], // 物料类型列表
      approveList: [
        { id: 'step10', name: '制定中' },
        { id: 'step11', name: '驳回' },
        { id: 'step20', name: '待审核' },
        { id: 'step30', name: '待批准' },
        { id: 'step0', name: '已通过' }
      ], // 审批状态列表
      selivStorelist: [], //
      selmatTypeList: [],
      selapproveList: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 40,
          txt: '更新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: ''
          }
        }
      }
    }
  },
  created () {
    this.getList()
    this._queryStoreHouseTypeList()
  },
  components: {
    SlideUpDown
  },
  methods: {
    _queryStoreHouseTypeList () {
      queryStoreHouseTypeList().then(res => {
        console.log('############')
        console.log(res)
        this.ivStorelist = res.data.ivStorelist
        this.matTypeList = res.data.matTypeList
      })
    },
    getList () {
      if (this.isLoading) {
        return
      }
      if (!this.hasMore) {
        // this.showToast('没有更多数据了')
        return
      }
      if (this.list.length === 0) {
        this.showLoading()
      }
      this.isLoading = true
      getStockList({
        queryValues: this.queryValues,
        timeSort: this.timeSort,
        pageNum: this.pageNum + '',
        pageSize: this.pageSize + '',
        matTypeId: this.selmatTypeList.join(','),
        storeHouseId: this.selivStorelist.join(','),
        approveStep: this.selapproveList.join(','),
        sortType: this.sortType,
        startHandleTime:
          this.startTime.length > 0
            ? this.startTime[0] + '-' + (this.startTime[1] >= 10
              ? this.startTime[1]
              : ('0' + this.startTime[1])) + '-' + (this.startTime[2] >= 10
              ? this.startTime[2]
              : ('0' + this.startTime[2]))
            : '',
        endHandleTime: this.endTime.length > 0
          ? this.endTime[0] + '-' + (this.endTime[1] >= 10
            ? this.endTime[1]
            : ('0' + this.endTime[1])) + '-' + (this.endTime[2] >= 10
            ? this.endTime[2]
            : ('0' + this.endTime[2]))
          : ''
      })
        .then(res => {
          this.hideLoading()
          console.log(123)
          console.log(res.data.ivStoreCheckBillLogList)
          if (res.data.ivStoreCheckBillLogList.length < this.pageSize) {
            this.hasMore = false
          }
          this.pageNum++
          this.list = [...this.list, ...res.data.ivStoreCheckBillLogList]
          this.isLoading = false
        })
        .catch(err => {
          // console.log(err)
          this.isLoading = false
          this.hideLoading()
          this.showToast(err.msg)
        })
    },
    showDrawer () {
      this.showDrawerData = true
    },
    hideDrawer () {
      this.showDrawerData = false
      this.list = []
      this.hasMore = true
      this.pageNum = 1
      this.getList()
    },
    showList () {
      this.showListData = true
    },
    hideList () {
      this.showListData = false
    },
    showStartDate () {
      this.datePicker = this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(2008, 7, 8),
        max: new Date(),
        value: new Date(),
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      })
      this.datePicker.show()
    },
    selectHandle (date, selectedVal, selectedText) {
      console.log(selectedVal)
      this.startTime = selectedVal
    },
    showEndDate () {
      if (this.startTime.length === 0) {
        this.showToast('请先选择开始时间')
        return
      }
      this.datePicker = this.$createDatePicker({
        title: 'Date Picker',
        min: new Date(this.startTime),
        max: new Date(),
        value: new Date(),
        onSelect: this.selectEndHandle
      })
      this.datePicker.show()
    },
    selectEndHandle (date, selectedVal, selectedText) {
      console.log(selectedVal)
      this.endTime = selectedVal
    },
    toInfo (id) {
      console.log(1)
      this.$router.push({
        path: '/stock/info',
        query: {
          id
        }
      })
    },
    changeTimeSort (index) {
      this.timeSort = index
      this.list = []
      this.pageNum = 1
      this.hasMore = true
      this.showListData = false
      this.getList()
    },
    changSortType (num) {
      this.sortType = num
      this.list = []
      this.pageNum = 1
      this.hasMore = true
      this.getList()
    },
    pandian () {
      this.$router.push({
        path: '/stock/inventory',
        query: {}
      })
    },
    statelist () {
      this.$router.push({
        path: '/stock/statelist',
        query: {}
      })
    },
    onPullingUp () {
      console.log(this.hasMore)
      if (this.hasMore) {
        this.getList()
      } else {
        this.$refs.scroll.forceUpdate()
      }
    },
    onPullingDown () {
      this.list = []
      this.hasMore = true
      this.pageNum = 1
      this.getList()
    },
    search () {
      this.list = []
      this.hasMore = true
      this.pageNum = 1
      this.getList()
    },
    //  selivStorelist: [], //
    //   selmatTypeList: [],
    //   selapproveList: [],
    selLocation (id) {
      if (this.selivStorelist.includes(id)) {
        const index = this.selivStorelist.indexOf(id)
        this.selivStorelist.splice(index, 1)
      } else {
        this.selivStorelist.push(id)
      }
    },
    selType (id) {
      if (this.selmatTypeList.includes(id)) {
        const index = this.selmatTypeList.indexOf(id)
        this.selmatTypeList.splice(index, 1)
      } else {
        this.selmatTypeList.push(id)
      }
    },
    selState (id) {
      if (this.selapproveList.includes(id)) {
        const index = this.selapproveList.indexOf(id)
        this.selapproveList.splice(index, 1)
      } else {
        this.selapproveList.push(id)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.scroll {
  position: fixed;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 100px;
  overflow: hidden;
}
.search-wrapper {
  padding: 10px 15px;
  z-index: 3;
  > input {
    display: block;
    width: 100%;
    background: #eeeeee;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    color: #505050;
  }
}
.option {
  position: relative;
  background: #fff;
  font-size: 14px;
  padding: 0 15px;
  line-height: 40px;
  align-items: center;
  border-bottom: 1px solid rgb(238, 238, 238);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  .active {
    color: #4e92ff;
  }
}
.option-list {
  background: #fff;
  z-index: 3;
  width: 95%;
  left: 0;
  padding-left: 5%;
  > div {
    line-height: 40px;
    border-bottom: 1px solid #eaeaea;
  }
  > div:last-child {
    border-bottom: none;
  }
  > div.active {
    color: #4e92ff;
  }
}
.option::after {
  display: table;
  content: "";
  clear: both;
}
.option > div:first-child {
  display: flex;
  float: left;
  align-items: center;
}
.option > div:nth-child(2) {
  float: right;
}
.option > div:first-child > div {
  margin-right: 20px;
  display: flex;
  align-items: center;
}

.manager {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.manage-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper {
  width: 80px;
  margin-right: 10px;
}
.info-wrapper {
  font-size: 13px;
  color: #999;
  display: flex;
  flex-direction: column;
  flex: 1;
  > .state {
    font-size: 14px;
    border: 1px solid #eee;
    margin: 10px 0;
    width: 60px;
    line-height: 25px;
    text-align: center;
    border-radius: 6px;
  }
  > .state1 {
    color: #4b96ff;
    border-color: #4b96ff;
  }
  > .state2 {
    color: #fea14f;
    border-color: #fea14f;
  }
  > .state3 {
    color: #fea14f;
    border-color: #fea14f;
  }
}
.info-wrapper > div {
  line-height: 22px;
}
.info-wrapper > div:first-child {
  display: flex;
  justify-content: space-between;
  font-size: 1px;
}
.info-wrapper > div:first-child > p:first-child {
  color: #1c1c1c;
  font-size: 20px;
}
.bot {
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  > div {
    flex: 1;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #e9e9e9;
    font-size: 14px;
    color: #505050;
  }
  > div.active {
    color: #5496ff;
  }
}
.bg {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  background: rgba(0, 0, 0, 0.5);
}
.drawer {
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  background: #fff;
  width: 320px;
  padding-top: 20px;
  > .box {
    padding: 15px 10px;
    border-bottom: 1px solid #e9e9e9;
    > .title {
      font-size: 15px;
    }
    > .wrp {
      font-size: 14px;
      margin-top: 20px;
      > div {
        display: inline-block;
        width: 40px;
        text-align: center;
        line-height: 40px;
      }
      > .bn {
        width: 90px;
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        border-radius: 5px;
        text-align: center;
        margin-top: 15px;
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > .bn:nth-child(3n + 2) {
        margin: 15px 15px 0;
      }
      > .sel {
        background: #5695ff;
        color: #fff;
      }

      > .selTime {
        width: 130px;
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        border-radius: 5px;
        text-align: center;
        margin-top: 15px;
        display: inline-block;
      }
    }
  }
}
.slide-up {
  position: absolute;
  width: 100%;
  top: 41px;
  left: 0;
}
.option-list {
  top: 41px;
  background: #fff;
  z-index: 10;
  width: 95%;
  left: 0;
  font-size: 14px;
  padding-left: 5%;
  > div {
    line-height: 40px;
    border-bottom: 1px solid #eaeaea;
  }
  > div:last-child {
    border-bottom: none;
  }
  > div.active {
    color: #4e92ff;
  }
}
.nocontent {
  font-size: 12px;
  padding: 20px 0;
  text-align: center;
  color: #999;
}
</style>
