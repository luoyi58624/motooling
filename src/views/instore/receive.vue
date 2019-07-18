<!--  -->
<template>
  <div class="wrapper">
    <div class="bar">采购信息</div>
    <div class="table">

      <div>
        <div>物料编码</div>
        <div>{{info.matNo}}</div>
      </div>
      <div>
        <div>物料描述</div>
        <div>{{info.matDesc}}</div>
      </div>
      <div>
        <div>物料类型</div>
        <div>{{info.matTypeName}}</div>
      </div>
      <div>
        <div>规格型号</div>
        <div>{{info.matModel}}</div>
      </div>

      <div>
        <div>订单数量</div>
        <div>{{info.totalQuantity}}</div>
      </div>
      <div>
        <div>已收数量</div>
        <div>{{info.receivedQty}}</div>
      </div>
      <div>
        <div>待收数量</div>
        <div>{{info.quantity}}</div>
      </div>
      <div>
        <div>收货数量</div>
        <div>
          <input type="number"
            name
            id
            v-model="quantity"
            min="1" placeholder="请填写" />
        </div>
      </div>
      <div>
        <div>收货重量</div>
        <div>
          <input v-model="waitTotalWeight" type="number" placeholder="请填写" />
        </div>
      </div>
      <div>
        <div>收货地址</div>
        <div> <input  type="text" placeholder="请填写" /></div>
      </div>
      <div>
        <div>收货仓库</div>
        <div>
          <cube-select
            class="select"
            v-model="storeHouseId"
            title="选择仓库"
            :options="storeHouseList"
            :disabled="storeHouseList.length==0"
            @change="changeCk"
          ></cube-select>
        </div>
      </div>
      <div>
        <div>收货储位</div>
        <div>

          <cube-select
            class="select"
            v-model="storeRoomId"
            title="选择库位"
            :options="storeRoomList"
            :disabled="storeRoomList.length==0"
            @change="changeKw"
          ></cube-select>
        </div>
      </div>
      <div>
        <div >收货备注</div>
        <div>
          <input type="text" v-model="info.receivedRemark" placeholder="请填写">
        </div>
      </div>
    </div>
    <div class="bot" @click="save">提交</div>
  </div>
</template>

<script>
import {
  inStoreInfo,
  purchUpdate,
  // purchSpecial,
  // purchQuality,
  getStoreHouse,
  getStoreRoom
} from '@/api/instore/instore'
export default {
  data () {
    return {
      storeHouseList: [],
      storeRoomList: [],
      info: {},
      storeHouseName: '',
      storeHouseId: '',
      storeRoomId: '',
      storeRoomName: '',
      waitTotalWeight: '',
      quantity: ''
    }
  },
  created () {
    this.getInfo()
    this._getStoreHouse()
  },

  methods: {
    save () {
      if (!this.quantity || !this.waitTotalWeight || !this.info.receivedRemark) {
        this.showToast('收货表单未填写完整')
        return
      }
      if (!this.storeHouseId) {
        this.showToast('请选择收货仓库')
        return
      }
      if (!this.storeRoomId) {
        this.showToast('请选择收货库位')
        return
      }
      if (this.quantity > this.info.quantity) {
        this.showToast('收货数量不能大于待收数量')
      }
      const purchSubId = this.$route.query.purchSubId
      var data = Object.assign({}, { purchSubId }, this.info, {
        storeHouseName: this.storeHouseName || this.info.storeHouseName,
        storeHouseId: this.storeHouseId || this.info.storeHouseId,
        storeRoomId: this.storeRoomId || this.info.storeRoomId,
        storeRoomName: this.storeRoomName || this.info.storeRoomName,
        quantity: this.quantity,
        waitTotalWeight: this.waitTotalWeight
      })
      purchUpdate(data)
        .then(res => {
          console.log(res)
          this.showToast('修改成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      inStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.wordList = res.qualityList
        this.pdfList = res.factoryReportList
        this.storeHouseId = res.inStoreInfo.storeHouseId
        this.storeRoomId = res.inStoreInfo.storeRoomId
        if (this.storeHouseId) {
          getStoreRoom({ storeHouseId: this.storeHouseId }).then(res => {
            var romeList = res.storeRoomsConfList
            var newRome = romeList.map((item, index) => {
              return { text: item.storeRoomName, value: item.id }
            })
            this.storeRoomList = newRome
          })
        }
      })
    },
    changeCk (value, index, text) {
      console.log('change', value, index, text, this.textCk)
      getStoreRoom({ storeHouseId: value }).then(res => {
        var romeList = res.storeRoomsConfList
        var newRome = romeList.map((item, index) => {
          return { text: item.storeRoomName, value: item.id }
        })
        this.storeRoomList = newRome
        this.storeHouseId = value
        this.storeHouseName = text
        console.log(this.storeHouseName)
      })
    },
    changeKw (value, index, text) {
      this.storeRoomId = value
      this.storeRoomName = text
    },
    _getStoreHouse () {
      getStoreHouse().then(res => {
        console.log(res.storeHouseConfList)
        var houseList = res.storeHouseConfList
        var newHose = houseList.map((item, index) => {
          return { text: item.storeHouseName, value: item.id }
        })
        this.storeHouseList = newHose
      })
    }
  }
}
</script>
<style lang='less' scoped>
.wrapper {
  padding: 15px;
  .bar {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .table {
    > div {
      > div:nth-child(2) {
        text-align: right;
        justify-content: flex-end;
      }

      input {
        text-align: right;
      }
    }
  }
  .bot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 40px;
    color: #fff;
    background: #5496ff;
    font-size: 14px;
    text-align: center;
  }
}
</style>
