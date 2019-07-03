<!--  -->
<template>
  <div>
    <div class="header">
      <div :class="{'active':currentIndex==1}" @click="changeState(1)">
        <span>盘点统计</span>
      </div>
      <div :class="{'active':currentIndex==2}" @click="changeState(2)">
        <span>盘盈</span>
      </div>
      <div :class="{'active':currentIndex==3}" @click="changeState(3)">
        <span>盘亏</span>
      </div>
    </div>

    <div class="bar"></div>
    <div class="box1" v-show="currentIndex==1">
      <p>盘点信息</p>
      <div class="table">
        <div>
          <div>上期结存</div>
          <div>{{inventory.lastQty}}</div>
        </div>
        <div>
          <div>本期出库</div>
          <div>{{inventory.occurOutQty}}</div>
        </div>
        <div>
          <div>本期入库</div>
          <div>{{inventory.occurInQty}}</div>
        </div>
        <div>
          <div>本期实盘</div>
          <div>{{inventory.checkRealQty}}</div>
        </div>
        <div>
          <div>本期盘盈</div>
          <div>{{inventory.checkProfitLossQty}}</div>
        </div>
        <div>
          <div>本期盘亏</div>
          <div>{{inventory.checkProfitLossQty}}</div>
        </div>
        <div>
          <div>本期结存</div>
          <div>{{inventory.lastQty}}</div>
        </div>
      </div>
    </div>
    <div class="box2" v-show="currentIndex==2">
      <div class="nocontent" v-show="pyList.length==0">空空如也</div>
      <div class="list">
        <div class="manager" v-for="(item,index) in pyList" :key="index">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div>库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>

            <div>物料编码: {{item.matNo}}</div>
            <div>物料描述:{{item.matName}}</div>
            <div>
              <div>库&nbsp;&nbsp;存&nbsp;数: {{item.checkStoreQty}}</div>
              <div>盘盈: {{}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box3" v-show="currentIndex==3">
      <div class="nocontent" v-show="pkList.length==0">空空如也</div>
      <div class="list">
        <div class="manager" v-for="(item,index) in pkList" :key="index">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div>库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>

            <div>物料编码: {{item.matNo}}</div>
            <div>物料描述:{{item.matName}}</div>
            <div>
              <div>库&nbsp;&nbsp;存&nbsp;数: {{item.checkStoreQty}}</div>
              <div>盘盈: {{}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">
      <div>企业圈</div>
      <div @click="changSp">提交</div>
    </div>
  <div class="bg"  v-show="showSp" @click="changSp"></div>
  <transition name="slide">
      <div class="sp" v-show="showSp">
      <div class="title">审批流程</div>
      <div class="spbox">
        <div>
          <div>创建人:{{spItem.creatorName}}</div>    <p>待创建</p>
          <div class="second">{{spItem.createdAt?(spItem.createdAt.slice(0,10)+" "+spItem.createdAt.slice(11,19)):""}}</div>

        </div>
        <div>
          <div>审批人:{{spItem.auditName}}</div>  <p>待审批</p>
          <div class="second">{{spItem.auditTime?(spItem.auditTime.slice(0,10)+" "+spItem.auditTime.slice(11,19)):""}}</div>

        </div>
        <div>
          <div>批准人:{{spItem.appName}}</div><p>待批准</p>
          <div class="second">{{spItem.appTime?(spItem.appTime.slice(0,10)+" "+spItem.appTime.slice(11,19)):""}}</div>

        </div>
      </div>
      <div class="txtbox">
        <div>审批意见</div>
        <div class>
          <textarea name placeholder="请输入您的审批意见" id cols="30" rows="10"></textarea>
        </div>
      </div>
      <div class="btn-wrapper">
        <div>同意</div>
        <div>驳回</div>
      </div>
    </div>
  </transition>

  </div>
</template>

<script>
import {
  queryInventoryCheck,
  queryCheckProfitLoss,
  getApproveStep
} from '../../api/stock/stock'
export default {
  data () {
    return {
      currentIndex: 1,
      id: '',
      inventory: {}, // 盘点统计
      pyList: [],
      pkList: [],
      showSp: false,
      spItem: {}
    }
  },
  created () {
    this.id = this.$route.query.id
    this._queryInventoryCheck()
    this._queryCheckProfitLoss(1)
    this._queryCheckProfitLoss(0)
    this._getApproveStep()
  },

  methods: {
    changSp () {
      this.showSp = !this.showSp
    },
    changeState (index) {
      this.currentIndex = index
    },
    _getApproveStep () {
      // 审批
      getApproveStep({ id: this.id }).then(res => {
        console.log('###')
        console.log(res)
        this.spItem = res.data
      })
    },
    _queryInventoryCheck () {
      // 盘点统计
      queryInventoryCheck({ id: this.id }).then(res => {
        // console.log(233)
        // console.log(res)
        this.inventory = res.data[0]
      })
    },
    _queryCheckProfitLoss (checkProfitLoss) {
      // checkProfitLoss=1盘盈，=0盘亏
      queryCheckProfitLoss({ id: this.id, checkProfitLoss }).then(res => {
        console.log(res)
        if (checkProfitLoss === 1) {
          this.pyList = res.data
        }
        if (checkProfitLoss === 0) {
          this.pkList = res.data
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.bar {
  height: 10px;
  background: #f8f9fd;
}
.header {
  display: flex;
  padding: 10px;
  > div {
    flex: 1;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    > span {
      padding: 10px 0;
    }
  }
  > div.active {
    > span {
      border-bottom: 2px solid #458fff;
      color: #458fff;
    }
  }
}
.box1 {
  padding: 20px;
  > p {
    font-size: 16px;
    color: #b0b0b0;
    padding-bottom: 20px;
  }
  .table {
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    color: #b0b0b0;
    > div {
      display: flex;
      font-size: 16px;
      line-height: 20px;
      border-bottom: 1px solid #d8d8d8;
      > div {
        padding: 5px;
      }
      > div:first-child {
        width: 100px;
        border-right: 1px solid #d8d8d8;
      }
    }
    > div:last-child {
      border-bottom: none;
    }
  }
}
.bg{
  position:fixed;top:0;left:0;right:0;bottom:0;background: rgba(0,0,0,.5);
}
.sp {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;padding-top:20px;border-radius:4px 4px 0 0;
  .title {
    font-size: 16px;
    padding-left: 20px;
  }
  .spbox {
    padding-top: 20px;
    padding-left: 20px;
    > div {
      padding-left: 10px;
      position: relative;
      > div {
        font-size: 14px;
        color: #505050;
        padding-left: 20px;
        border-left: 2px solid #5193ff;
      }
      >p{
        color:#FEA146;position: absolute;right:20px;top:50%;line-height:20px;margin-top:-10px;font-size:14px;
      }
      > .second {
        padding-top: 10px;
        font-size: 12px;
        position: relative;
        padding-bottom: 30px;
      }
      > .second::after {
        content: "";
        width: 15px;
        height: 15px;
        display: block;
        border: 1px solid #5193ff;
        top: -8px;
        left: -9px;
        position: absolute;
        border-radius: 50%;
        background: #fff;
      }
    }
    > div:last-child {
      > div:last-child {
        border-color: #fff;
      }
    }
    > div:first-child {
      > div:first-child {
        border-color: #fff;
      }
    }
  }
  .txtbox {
    padding-left:20px;padding-right:20px;
    >div{
      font-size:16px;
      >textarea{
        margin-top:10px;
        height:40px;
        width:100%;
      }
    }
  }
  >.btn-wrapper{
    display:flex;height:40px;border-top:1px solid #EFEFEF;
    >div{
      line-height:40px;text-align: center;font-size:16px;flex:1;color:#FF4048;
    }
    >div:last-child{
      color:#51A0FF;
    }
  }
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
  font-size: 15px;
  color: #999;
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    line-height: 25px;
    display: flex;
    justify-content: space-between;
    > div:last-child {
      color: #ff4d42;
    }
  }
  > .state {
    font-size: 14px;
    border: 1px solid #eee;
    margin: 10px 0;
    width: 60px;
    line-height: 30px;
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
.bot {
  display: flex;
  position: fixed;
  bottom: 0;
  font-size: 20px;
  left: 0;
  right: 0;
  border-top: #f3f3f3 1px solid;
  > div {
    text-align: center;
    line-height: 50px;
  }
  > div:first-child {
    flex: 1;
  }
  > div:last-child {
    width: 100px;
    background: #5fd858;
    color: #fff;
  }
}
.nocontent {
  font-size: 12px;
  padding: 20px 0;
  text-align: center;
  color: #999;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
</style>
