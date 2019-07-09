<!--  -->
<template>
  <div>
    <Screen/>
    <div class="title">收货信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>生产订单</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>收发货单编号</div>
          <div><input type="text" placeholder="请填写"></div>
        </div>
      </div>
    </div>
    <div class="title">收货物料</div>
    <div>
      <div class="list">
        <Materiel/>
        <Materiel/>
        <Materiel/>
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计</div>
      <div>收货</div>
    </div>
  </div>
</template>

<script>
import materiel from './Components/materiel'
import screen from './Components/screen'
export default {
  data () {
    return {}
  },
  components: {
    Materiel: materiel,
    Screen: screen
  }
}
</script>
<style lang='less' scoped>
.title {
  padding: 14px;
  font-size: 12px;
  background: #f8f9fd;
  color: #cacacc;
}
.content {
  padding: 14px;
}

.table {
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  color: #b0b0b0;
  > div {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid #d8d8d8;
    > div {
      padding: 5px;
      >input{
        border:none;
      }
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

.bz {
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  padding: 10px;
  resize: none;
}
.bot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px; /*no*/
  border-top: 1px solid #f3f3f3; /*no*/
  display: flex;
  background: #fff;
  font-size: 14px; /*no*/
  margin-top: 50px;
  > div {
    flex: 1;
    text-align: center;
    line-height: 50px; /*no*/
  }
  > div:last-child {
    background: #5fd858;
    color: #fff;
  }
}
.zw {
  height: 50px; /*no*/
}
</style>
