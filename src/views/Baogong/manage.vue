<!--  -->
<template>
  <div>
    <div class="input-wrapper">
      <div class>
        <cube-input v-model="value"/>
        <div>确定</div>
      </div>
    </div>
    <div class="nav">
      <div class="active">接收</div>
      <div>转出</div>
    </div>
    <div class="option">
      <div>
        <div>按生产订单排序</div>
        <div>降序</div>
        <div>升序</div>
      </div>
      <div>筛选</div>
    </div>
    <div class="list">
      <div class="manager">
        <div class="img-wrapper"></div>
        <div class="info-wrapper">
          <div class="manage-top">
            <p>生产单号：POROIIR</p>
            <p>日志</p>
          </div>
          <div>物料编码</div>
          <div>上工序</div>
          <div>操作人</div>
          <div>描述</div>
          <div>工序</div>
          <div>操作事件</div>
          <div class="opra">
            <div>1718</div>
            <div>
              <button>完工</button>
              <button>返工</button>
              <button>接收</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="zhezhao" v-show="false"></div>
    <div class="fixed" v-show="false">
      <div style="line-height:50px;text-align:center;font-size:16px;">日志</div>
      <div class="lc">
        <div>
          <div>
            <div>今天</div>
            <div>08:30</div>
          </div>
          <div>
            <div>订单已经创建完成</div>
            <div>操作人：王植阳</div>
          </div>
        </div>
        <div>
          <div>
            <div>今天</div>
            <div>08:30</div>
          </div>
          <div>
            <div>订单已经创建完成</div>
            <div>操作人：王植阳</div>
          </div>
        </div>
        <div>
          <div>
            <div>今天</div>
            <div>08:30</div>
          </div>
          <div>
            <div>订单已经创建完成</div>
            <div>操作人：王植阳</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from "cube-ui";
export default {
  data() {
    return {
      value: ""
    };
    components: {
      cubeInput;
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style scoped lang="less">
.input-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    height: 30px;
    width: 60%;
    display: flex;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #666;
    > div:first-child {
      flex: 1;
      height: 30px;
      border: 0;
    }
    > div:nth-child(2) {
      width: 50px;
      font-size: 12px;
      color: #fff;
      background: #000;
      line-height: 30px;
      text-align: center;
    }
  }
}
.zhezhao {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.manager {
  display: flex;
  padding: 15px;
}
.manage-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img-wrapper {
  width: 80px;
}
.info-wrapper {
  font-size: 12px;
  color: #333;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.info-wrapper > div {
  line-height: 20px;
}
.info-wrapper > div:first-child {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.info-wrapper > div:first-child > p:first-child {
  font-weight: bold;
  font-size: 14px;
}
.opra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 50px;
    height: 22px;
    border-radius: 4px;
    background: rgb(55, 135, 209);
    border:none;color:#fff;margin-right:15px;
  }
  button:last-child{
    margin-right:0
  }
}
.lc {
  height: 250px;
  overflow-y: auto;
}
.lc > div {
  display: flex;
  font-size: 14px;
  color: #333;
  align-items: center;
}
.lc > div > div:first-child {
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.lc > div > div:first-child > div:first-child {
  border-right: blue 1px solid;
  padding-top: 10px;
}
.lc > div > div:first-child > div:nth-child(2) {
  border-right: blue 1px solid;
  padding-bottom: 10px;
  position: relative;
}
.lc > div:first-child > div:first-child > div:first-child {
  border-right: none;
}
.lc > div:last-child > div:first-child > div:nth-child(2) {
  border-right: none;
}
.lc > div > div:first-child > div:nth-child(2)::after {
  display: block;
  position: absolute;
  width: 14px;
  height: 14px;
  background: #000;
  border-radius: 50%;
  top: -7px;
  right: -7px;
  content: "";
}
.lc > div > div:first-child > div {
  width: 80%;
  text-align: center;
  line-height: 20px;
}
.lc > div > div:nth-child(2) {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 300px;
  z-index: 10;
  background: #fff;
  border-radius: 6px 6px 0 0;
  z-index: 10;
}
.nav {
  height: 40px;
  line-height: 40px;
  display: flex;
  border-bottom: 1px solid #999;
  font-size: 14px;
}
.nav > div {
  flex: 1;
  text-align: center;
}
.nav > div.active {
  color: blue;
}
.option {
  font-size: 14px;
  padding: 15px;
}
.option::after {
  display: table;
  content: "";
  clear: both;
}
.option > div:first-child {
  display: flex;
  float: left;
}
.option > div:nth-child(2) {
  float: right;
}
.option > div:first-child > div {
  margin-right: 20px;
}
</style>
