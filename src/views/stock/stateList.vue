<!--  -->
<template>
  <div class="body">
    <div
      class="nocontent"
      v-show="waitingInventoryList.length == 0 && state == 1"
    >
      没有内容
    </div>
    <div
      class="nocontent"
      v-show="alreadyInventoryList.length == 0 && state == 2"
    >
      没有内容
    </div>
    <div class="list">
      <div
        class="manager"
        v-for="(item, index) in waitingInventoryList"
        :key="index"
        v-show="state == 1"
      >
        <div class="img-wrapper">
          <img :src="item.picPath" alt class="gjimg" />
        </div>
        <div class="info-wrapper">
          <div>
            库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{ item.storeRoomName }}
          </div>

          <div>物料编码:{{ item.matNo }}</div>
          <div>物料描述:{{ item.matName }}</div>
          <div>
            <div>库&nbsp;&nbsp;存&nbsp;数:{{ item.checkStoreQty }}</div>
            <div>实盘:{{ item.checkRealQty }}</div>
          </div>
        </div>
      </div>
      <div
        class="manager"
        v-for="(item, index) in alreadyInventoryList"
        :key="index"
        v-show="state == 2"
      >
        <div class="img-wrapper">
          <img :src="item.picPath" alt class="gjimg" />
        </div>
        <div class="info-wrapper">
          <div>
            库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{ item.storeRoomName }}
          </div>

          <div>物料编码:{{ item.matNo }}</div>
          <div>物料描述:{{ item.matName }}</div>
          <div>
            <div>库&nbsp;&nbsp;存&nbsp;数:{{ item.checkStoreQty }}</div>
            <div>实盘:{{ item.checkRealQty }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">
      <div @click="sao()">
        <img src="../../assets/t1.png" alt="" />
        <div>扫一扫</div>
      </div>
      <div :class="{ active: state == 1 }" @click="changeState(1)">
        <img src="../../assets/t1.png" alt="" v-show="state != 1" />
        <img src="../../assets/t2.png" alt="" v-show="state == 1" />
        <div>待盘</div>
      </div>
      <div :class="{ active: state == 2 }" @click="changeState(2)">
        <img src="../../assets/t3.png" alt="" v-show="state != 2" />
        <img src="../../assets/t4.png" alt="" v-show="state == 2" />
        <div>已盘</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInventoryStatus } from '../../api/stock/stock'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      state: 1,
      alreadyInventoryList: [],
      waitingInventoryList: []
    }
  },

  created () {
    this._getInventoryStatus()
    this.getwechat().then(config => {
      wx.config(config)
    })
  },

  methods: {
    _getInventoryStatus () {
      getInventoryStatus({ checkBillId: this.$route.query.id }).then(res => {
        this.alreadyInventoryList = res.data.alreadyInventoryList
        this.waitingInventoryList = res.data.waitingInventoryList
      })
    },
    changeState (state) {
      this.state = state
    },
    sao () {
      console.log(1)
      const vm = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          const data = res['resultStr'].split(':').map(item => {
            const it = item.split('_')
            var may = it ? it[0] : ''
            var obj = {}
            obj[may] = it[1]
            return obj
          })
          var re = Object.assign({}, data[0], data[1], { checkBillId: vm.$route.id })
          alert(JSON.stringify(data))
          this.$router.push({
            path: '/stock',
            query: re
          })
        },
        fail: function (res) {}
      })
    }
  }
}
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #767676;
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
  > img {
    width: 100%;
  }
}
.info-wrapper {
  font-size: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    line-height: 25px;
    display: flex;
    justify-content: space-between;
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
  left: 0;
  right: 0;
  background: #313131;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  font-size: 16px;
  height: 60px;
  > div {
    text-align: center;
    padding: 0 30px;
    > img {
      width: 30px;
    }
  }
  > div.active {
    color: #5392f7;
  }
}
.nocontent {
  text-align: center;
  padding: 20px;
  line-height: 30px;
  font-size: 16px; /*no*/
  color: #fff;
}
</style>
