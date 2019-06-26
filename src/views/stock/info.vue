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
          <div>2000</div>
        </div>
        <div>
          <div>上期结存</div>
          <div>2000</div>
        </div>
      </div>
    </div>
    <div class="box2" v-show="currentIndex==2">
      <div class="list">
        <div class="manager">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div>库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>

            <div>物料编码:</div>
            <div>物料描述:</div>
            <div>
              <div>库&nbsp;&nbsp;存&nbsp;数:</div>
              <div>盘盈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box3" v-show="currentIndex==3">
      <div class="list">
        <div class="manager">
          <div class="img-wrapper">
            <img src alt class="gjimg">
          </div>
          <div class="info-wrapper">
            <div>库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</div>

            <div>物料编码:</div>
            <div>物料描述:</div>
            <div>
              <div>库&nbsp;&nbsp;存&nbsp;数:</div>
              <div>盘盈</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">
      <div>企业圈</div>
      <div>提交</div>
    </div>
  </div>
</template>

<script>
import {queryInventoryCheck,queryCheckProfitLoss} from "../../api/stock/stock"
export default {
  data() {
    return {
      currentIndex: 1
    };
  },

  methods: {
    changeState(index) {
      this.currentIndex = index;
    },
    _queryInventoryCheck(){//盘点统计
      queryInventoryCheck({id:""}).then(res=>{
        console.log(res)
      })
    },
    _queryCheckProfitLoss(id,checkProfitLoss){//checkProfitLoss=1盘盈，=0盘亏
      queryCheckProfitLoss({id,checkProfitLoss}).then(res=>{
        console.log(res)
      })
    }
  }
};
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
</style>