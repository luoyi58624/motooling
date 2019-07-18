<!--  -->
<template>
  <div class="wrapper">
    <div class="bar">物料信息</div>
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
        <div>待检数量</div>
        <div>{{info.waitQcQty}}</div>
      </div>
    </div>

    <div class="bar">质检信息</div>
    <div class="table">
      <!-- <div>
        <div>检验方式</div>
        <div>
           <div class="radio">
             <cube-radio-group
              v-model="info.qcFlag"
              :options="options3"
              :horizontal="true"

            />
          </div>
        </div>
      </div> -->
      <div>
        <div>结论</div>
        <div>
           <div class="radio">
             <cube-radio-group
              v-model="info.qcResult"
              :options="options3"
              :horizontal="true"

            />
          </div>
        </div>
      </div>
      <div v-show="info.qcResult==2">
        <div>明细</div>
        <div>
          <div class="flex-wrapper">
            <div>
              合格数量
              <input type="number" name id v-model="info.qualifiedQty" />
            </div>
              <div>
            不良数量
            <input type="number" name id v-model="info.noQualifiedQty" />
          </div>
          </div>

        </div>
      </div>
      <div>
        <div>检验模板</div>
        <div>请选择</div>
      </div>
      <div>
        <div>质检报告</div>
        <div>
           <cube-upload
            v-model="wordList"
            disabled="disabled"
            :action="action"

            @files-added="filesAdded"
            ref="upload"
            accept="*.doc application/msword MS Word Document"
          />
        </div>
      </div>
      <div>
        <div>问题描述</div>
        <div>
          <input type="text"   v-model="info.qcRemark" placeholder="请填写">
        </div>
      </div>
    </div>
    <div class="bot" @click="save">提交</div>
  </div>
</template>

<script>
import {
  inStoreInfo,
  // purchUpdate,
  // purchSpecial,
  purchQuality,
  // getStoreHouse,
  getStoreRoom
} from '@/api/instore/instore'
import { WEBURL } from '@/utils/utils.js'
import md5 from 'md5'

const token = sessionStorage.getItem('token') || ''
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
  data () {
    return {
      action: {
        target: WEBURL() + '/file/h5FileUpload',
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
      wordList: [],
      info: {},
      options3: [
        {
          label: '合格',
          value: 1,
          disabled: false
        },
        {
          label: '不合格(或未测完)',
          value: 2,
          disabled: false
        }
      ]
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      inStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.wordList = res.qualityList
        this.pdfList = res.factoryReportList
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
      if (!this.info.qcResult) {
        this.showToast('请选择结论')
        return
      }
      if (this.info.qcResult === '1') {
        console.log(123)
        this.info.qualifiedQty = this.info.waitQcQty
        this.info.noQualifiedQty = 0
      }
      if (
        this.info.noQualifiedQty + this.info.qualifiedQty >
          this.info.waitQcQty
      ) {
        this.showToast('合格数量与不良数量总数不能大于待检数量')
        return
      }
      const qualityList = this.wordList.map(item => {
        if (item.response) {
          return { fileName: item.name, fileUrl: item.response.data.url }
        } else {
          return item
        }
      })
      const factoryReportList = this.pdfList.map(item => {
        if (item.response) {
          return { fileName: item.name, fileUrl: item.response.data.url }
        } else {
          return item
        }
      })
      const purchSubId = this.$route.query.purchSubId
      var data3 = Object.assign({}, { purchSubId, qualityList, factoryReportList }, this.info)
      purchQuality(data3)
        .then(res => {
          this.showToast('修改成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
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
      hasIgnore &&
        this.$createToast({
          type: 'warn',
          time: 1000,
          txt: 'You selected >1M files'
        }).show()
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
    margin-bottom: 15px;
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
.flex-wrapper {
  display: flex;
  justify-content: space-around;
  flex: 1;
  > div {
    > input {
      width: 40px;
      border: 1px solid #999;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
