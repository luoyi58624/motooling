<!--  -->
<template>
<div>
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
      <slide-up-down :active="showListData" :duration="300" class="slide-up posit" >
        <div class="option-list">
          <div v-for="(item,index) in optionList" :key="index"  :class="{active:timeSort==index}" @click="changeTimeSort('')" >{{item}}</div>

        </div>
      </slide-up-down>

    </div>
     <div class="bg" style="z-index:2" @click="hideList" v-show="showListData"></div>

</div>

</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
  data () {
    return {
      timeSort: 1,
      showListData: false,
      sortType: 1,
      optionList: [
        '按物料编码排序',
        '按物料编码排序'
      ]
    }
  },
  pros: {
    optionList: {
      type: Array,
      default: [
        '按物料编码排序',
        '按物料编码排序'
      ]
    }

  },

  components: {
    SlideUpDown
  },

  methods: {

    changeTimeSort (index) {
    //   this.timeSort = index
    //   this.list = []
    //   this.pageNum = 1
    //   this.hasMore = true
      this.showListData = false
    //   this.getList()
    },
    changSortType (num) {

    //   this.sortType = num
    //   this.list = []
    //   this.pageNum = 1
    //   this.hasMore = true
    //   this.getList()
    },
    showList () {
      this.showListData = !this.showListData
    },
    hideList () {
      this.showListData = false
    },
    showDrawer () {}
  }
}

</script>
<style lang='less' scoped>
.bg {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  background: rgba(0, 0, 0, 0.5);
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
.posit{
 position: absolute;;
 left: 0;
  top:40px;
   width: 95%;
    padding-left: 5%;   background: #fff;
}
.option-list {

  background: #fff;
  z-index: 3;

  padding-left: 5%;
  > div {
      width:100%;
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
</style>
