<!--  -->
<template>
  <div style="z-index:100">
        <div class="bg" v-show="showDrawerData" @click="hideDrawer"></div>
    <div>
      <div class="option">
        <div>
          <div
            v-for="item in optionList"
            :key="item.value"
            v-show="timeSort==item.value"
            @click="showList"
            style="color:#4e92ff"
          >{{item.text}}</div>
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
        <slide-up-down :active="showListData" :duration="300" class="slide-up posit">
          <div class="option-list">
            <div
              v-for="(item,index) in optionList"
              :key="index"
              :class="{active:timeSort==item.value}"
              @click="changeTimeSort(item.value)"
            >{{item.text}}</div>
          </div>
        </slide-up-down>
      </div>
      <div class="bg" style="z-index:2" @click="hideList" v-show="showListData"></div>
    </div>
    <transition name="slide-fade">
      <div class="drawer" v-show="showDrawerData">
        <cube-button @click="hideDrawer">确定</cube-button>
      </div>
    </transition>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
  data () {
    return {
      timeSort: 1,
      showListData: false,
      showDrawerData: false,
      sortType: 2
    }
  },
  props: {
    optionList: {
      type: Array,
      default: () => [
        {
          text: '按物料编码排序',
          value: 1
        },
        {
          text: '按hahahh编码排序',
          value: 2
        }
      ]
    }
  },

  components: {
    SlideUpDown
  },

  methods: {
    changeTimeSort (value) {
      this.timeSort = value
      console.log(value)
      this.showListData = false
      this.$emit('changeA', value)
    },
    changSortType (num) {
      this.sortType = num
      this.$emit('changeB', num)
    },
    showList () {
      this.showListData = !this.showListData
    },
    hideList () {
      this.showListData = false
    },
    showDrawer () {
      this.showDrawerData = true
    },
    hideDrawer () {
      this.showDrawerData = false
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
.posit {
  position: absolute;
  left: 0;
  top: 40px;
  width: 95%;
  padding-left: 5%;
  background: #fff;
}
.option-list {
  background: #fff;
  z-index: 3;

  padding-left: 5%;
  > div {
    width: 100%;
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
</style>
