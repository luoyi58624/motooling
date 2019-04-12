<!--  -->
<template>
  <div>
    <div class="z-top"></div>
    <my-header title="采购收货"></my-header>
    <div class="title">采购信息</div>
    <div class="containner first-banner">
      <div>采购单号：{{info.purchNo}}</div>
      <div>物料单号：{{info.matNo}}</div>

      <div>物料名称:{{}}</div>
      <div>规格型号:{{info.matModel}}</div>
      <div>
        <div>采购数量：{{info.quantity}}</div>
        <div>采购重量：{{info.weight}}</div>
      </div>
      <div>
        <div>采购单价：{{info.up}}</div>
        <div>采购金额：{{info.totalPrice}}</div>
      </div>
      <div>
        <div>发送日期：{{info.sendDate?info.sendDate.slice(0,10):''}}</div>
        <div>交货日期：{{info.deliveryDate?info.deliveryDate.slice(0,10):''}}</div>
      </div>
      <div>备注：{{info.remark}}</div>
    </div>
    <div class="title">收货信息</div>
    <div class="containner second-banner">
      <div>
        <div>
          收货数量
          <input type="number" name id v-model="info.receivedQty" :disabled="type!=='1'">
        </div>
        <div>
          收货重量
          <input type="number" name id v-model="info.receivedWeight" :disabled="type!=='1'">
        </div>
      </div>
      <div>
        <div>
          收货单价
          <input type="number" name id :disabled="type!=='1'">
        </div>
        <div>
          收货金额
          <input type="number" v-model="info.a" name id :disabled="type!=='1'">
        </div>
      </div>
      <div>
        <div>
          收货仓库
          <cube-select
            class="select"
            v-model="storeHouseId"
            title="选择仓库"
            :options="storeHouseList"
            :disabled="type!=='1'||storeHouseList.length==0"
            @change="changeCk"
          ></cube-select>
        </div>
      </div>
      <div>
        <div>
          收货库位
          <cube-select
            class="select"
            v-model="storeRoomId"
            title="选择库位"
            :options="storeRoomList"
            :disabled="type!=='1'||storeRoomList.length==0"
            @change="changeKw"
          ></cube-select>
        </div>
      </div>
      <div>
        <div class="txt">
          备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea
            name
            id
            v-model="info.receivedRemark"
            :disabled="type!=='1'"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="title">
      <div>质检信息</div>
      <div>验证标准</div>
    </div>
    <div class="containner second-banner">
      <div>
        <div>
          检验方式
          <div class="radio">
            <cube-radio-group v-model="info.qcFlag" :options="options3" :horizontal="true"/>
          </div>
        </div>
      </div>
      <div>
        <div>
          合格数量
          <input type="text" name id v-model="info.qualifiedQty" :disabled="type!=='2'">
        </div>
        <div>
          不良数量
          <input type="text" name id v-model="info.noQualifiedQty" :disabled="type!=='2'">
        </div>
      </div>
      <div>
        <div>
          不良原因
          <input
            type="text"
            name
            id
            v-model="info.unusualReason"
            :disabled="type!=='2'"
            style="flex:1"
          >
        </div>
      </div>
      <div>
        <div class="big word">
          质检报告
        <cube-upload  :action="action"  @files-added="filesAdded" ref="upload" accept="*.doc application/msword MS Word Document"/>
        </div>
      </div>
            <div>
        <div class="big pdf">
          供应商出场检验报告
        <cube-upload :action="action"  @files-added="filesAdded" ref="upload" accept="*.doc application/msword MS Word Document"/>
        </div>
      </div>
      <div>
        <div class="txt">
          备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea
            name
            id
            v-model="info.qcRemark"
            :disabled="type!=='2'"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="title">特采信息</div>
    <div class="containner second-banner">
      <div>
        <div>
          特采数量
          <input type="text" name id v-model="info.specialQty" :disabled="type!=='3'">
        </div>
        <div>
          特采单价
          <input type="text" name id v-model="info.specialUp" :disabled="type!=='3'">
        </div>
      </div>
      <div>
        <div>
          降价比例
          <input type="text" name id v-model="info.reduceRatio" :disabled="type!=='3'">
          %
        </div>
      </div>

      <div>
        <div class="txt">
          备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注
          <textarea
            name
            id
            v-model="info.specialRemark"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div @click="save">确定</div>
    </div>
  </div>
</template>

<script>
import {
  inStoreInfo,
  purchUpdate,
  purchSpecial,
  purchQuality,
  getStoreHouse,
  getStoreRoom
} from '@/api/instore/instore'
import myHeader from '@/components/header'
import CuUpload from '@/components/upload/Upload'
import { WEBURL, BASEURL } from '@/utils/utils.js'
import md5 from 'md5'

const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')
console.log(md5String)
const req = {
  token: token,
  md5: md5String,
  timestamp: timestamp,
  data: {}
}

export default {
  components: {
    myHeader
  },
  data () {
    return {
      action: {
        target: WEBURL + '/file/h5FileUpload',
        fileName: 'enFile',
        data: { paramsMap: JSON.stringify(req) },
        checkSuccess: (res, file) => {
          // let rdata = JSON.parse(decrypt(res.resultData))
          console.log('res', res)
          if (res.status === 0) {
            // this.uploadValue1 = rdata.url
            return true
          }
        }
      },

      options3: [
        {
          label: '抽检',
          value: 1
        },

        {
          label: '全检',
          value: 2
        }
      ],
      info: {},
      value: '',
      storeHouseList: [],
      storeRoomList: [],
      textCk: '1',
      textKw: '345',
      type: '2', // 用于判断哪些板块可以操作，1代表可以操作收货信息，2代表质检信息，3特采信息
      storeHouseName: '',
      storeHouseId: '',
      storeRoomId: '',
      storeRoomName: ''
    }
  },
  created () {
    this.getInfo()
    this._getStoreHouse()
    const type = this.$route.query.type
    this.type = type
  },
  methods: {
    filesAdded (files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    },
    fileSubmitted (file) {
      file.base64Value = file.file.base64
    },
    changeQc (value) {
      console.log(this.info)
      // this.$set(this.info,'qcFlag',value)
      // this.info.qcFlag=value;
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
    },
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      console.log(purchSubId)
      inStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.storeHouseId = res.inStoreInfo.storeHouseId
        this.storeRoomId = res.inStoreInfo.storeRoomId
        console.log(this.storeHouseId, this.storeRoomId)
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
    save () {
      const purchSubId = this.$route.query.purchSubId
      if (this.type === '1') {
        var data = Object.assign({}, { purchSubId }, this.info, {
          storeHouseName: this.storeHouseName || this.info.storeHouseName,
          storeHouseId: this.storeHouseId || this.info.storeHouseId,
          storeRoomId: this.storeRoomId || this.info.storeRoomId,
          storeRoomName: this.storeRoomName || this.info.storeRoomName
        })
        purchUpdate(data).then(res => {
          console.log(res)
          this.showToast('修改成功')
        })
      } else if (this.type === '3') {
        var data = Object.assign({}, { purchSubId }, this.info)
        purchSpecial(data).then(res => {})
      } else if (this.type == '2') {
        var data = Object.assign({}, { purchSubId }, this.info)
        purchQuality(data).then(res => {})
      }
    }
  },
  comments: {
    CuUpload
  }
}
</script>
<style lang='less' scoped>
.radio {
  margin-left: 25px;
}
.z-top {
  margin-top: 41px;
}
.title {
  background: #f8f9fe;
  color: #505050;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  > div:nth-child(2) {
    font-size: 12px;
    color: #5495ff;
  }
}
.title:first-child {
  margin-top: 41px;
}
.containner {
  padding: 10px 20px;
}
.first-banner {
  > div {
    font-size: 14px;
    line-height: 25px;
    display: flex;
    > div {
      flex: 1;
    }
  }
}
.second-banner {
  > div {
    display: flex;
    > div {
      flex: 1;
      font-size: 14px;
      display: flex;
     padding:5px 0;
      align-items: center;
      > input {
        width: 90px;
        background: #f2f5fa;
        height: 30px;
        margin-left: 12px;
        border-radius: 4px;
        text-align: center;
      }
      > .select {
        height: 30px;
        padding: 0;
        margin-left: 12px;
        border-radius: 4px;
        background: #f2f5fa;
        flex: 1;
        border: 0;
        line-height: 30px;
        padding: 0 20px;
      }
      > .select::after {
        border: 0;
      }
      > textarea {
        box-sizing: border-box;
        padding: 10px;
        height: 60px;

        margin-left: 12px;
        border-radius: 4px;
        background: #f2f5fa;
        flex: 1;
        border: 0;
        line-height: 20px;
      }
    }
    >div.big{
      >div{
        margin-left:12px;
      }
     
    }
    > div:nth-child(2) {
      display: flex;
      justify-content: flex-end;
    }
    > div.txt {
      height: 70px;
    }
  }
}
.bot {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #f8f9fe;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 80%;
    height: 40px;
    background: #5495ff;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
  }
}
.zw {
  height: 50px;
}
</style>
