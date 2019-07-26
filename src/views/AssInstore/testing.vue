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
      </div>-->
      <div>
        <div>结论</div>
        <div>
          <div class="radio">
            <cube-radio-group v-model="qcResult" :options="options3" :horizontal="true" />
          </div>
        </div>
      </div>
      <div v-show="qcResult==2">
        <div>明细</div>
        <div>
          <div class="flex-wrapper">
            <div>
              合格数量
              <input type="number" name id v-model="qualifiedQty" style="text-align:center;" />
            </div>
            <div>
              不良数量
              <input type="number" name id v-model="noQualifiedQty" style="text-align:center;" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>检验模板</div>
        <div @click="showMb">请选择</div>
      </div>
      <div>
        <div>质检报告</div>
        <div>
          <cube-upload
            class
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
          <input type="text" v-model="info.qcRemark" placeholder="请填写" />
        </div>
      </div>
    </div>
    <div class="box_bar"></div>
    <div class="bot" @click="save">提交</div>
    <div class="mbbg" v-show="showmb" @click="hideMb"></div>
    <transition name="slide-fade">
      <div class="moban" v-show="showmb">
        <div class="title">检验模板选择</div>
        <div class="box">
          <div class="box-title">客户</div>
          <div class="box-content">
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称名称名称名称名称名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="box-title">客户</div>
          <div class="box-content">
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
            <div>
              <img src="../../assets/mb.png" alt />
              <div>
                <cube-checkbox :value="true">名称</cube-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">确定</div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  assInStoreInfo,
  // purchUpdate,
  // purchSpecial,
  assPurchQuality
  // getStoreHouse,
  // getStoreRoom
} from '@/api/assinstore/assinstore'
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
      showmb: false,
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
      ],
      qualifiedQty: '',
      noQualifiedQty: '',
      qcResult: ''
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    showMb () {
      this.showmb = true
    },
    hideMb () {
      this.showmb = false
    },
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      assInStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.wordList = res.qualityList.map(item => {
          return {
            name: item.fileName,
            file: File,
            url: item.fileUrl
          }
        })
        //  this.pdfList = res.factoryReportList;
        this.storeHouseId = res.inStoreInfo.storeHouseId
        this.storeRoomId = res.inStoreInfo.storeRoomId
        // if (this.storeHouseId) {
        //   getStoreRoom({ storeHouseId: this.storeHouseId }).then(res => {
        //     var romeList = res.storeRoomsConfList
        //     var newRome = romeList.map((item, index) => {
        //       return { text: item.storeRoomName, value: item.id }
        //     })
        //     this.storeRoomList = newRome
        //   })
        // }
      })
    },
    save () {
      if (!this.qcResult) {
        this.showToast('请选择结论')
        return
      }
      if (this.qcResult === 1) {
        this.qualifiedQty = this.info.waitQcQty
        this.noQualifiedQty = 0
      }

      this.noQualifiedQty = this.noQualifiedQty ? this.noQualifiedQty : '0'
      this.qualifiedQty = this.qualifiedQty ? this.qualifiedQty : '0'
      if (
        this.noQualifiedQty * 1 + this.qualifiedQty * 1 >
        this.info.waitQcQty
      ) {
        this.showToast('合格数量与不良数量总数不能大于待检数量')
        return
      }
      if (this.noQualifiedQty * 1 + this.qualifiedQty * 1 === 0) {
        this.showToast('未填写合格与不合格数量')
        return
      }
      const qualityList = this.wordList.map(item => {
        if (item.response) {
          return { fileName: item.name, fileUrl: item.response.data.url }
        } else {
          return item
        }
      })
      // const factoryReportList = this.pdfList.map(item => {
      //   if (item.response) {
      //     return { fileName: item.name, fileUrl: item.response.data.url };
      //   } else {
      //     return item;
      //   }
      // });
      const purchSubId = this.$route.query.purchSubId
      var data3 = Object.assign({}, this.info, {
        purchSubId,
        qualityList,
        qcResult: this.qcResult,
        factoryReportList: [],
        noQualifiedQty: this.noQualifiedQty,
        qualifiedQty: this.qualifiedQty
      })
      assPurchQuality(data3)
        .then(res => {
          this.getInfo()
          this.showToast('质检成功')
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
      > div {
        display: felx;
        align-items: center;
      }

      input {
        text-align: right;
      }
    }
  }
  .box_bar {
    height: 40px;
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
.mbbg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
.moban {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: #fff;
  z-index: 21;
  padding: 10px;
  overflow-y: auto;padding-bottom:50px;
  > .title {
    font-size: 14px;
    color: #c2c2c2;
  }
  > .box {
    margin-top: 10px;
    .box-title {
      font-size: 14px;
      color: #c2c2c2;
    }
    > .box-content {
      > div {
        margin-top: 10px;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        > img {
          width: 60%;
        }
        > div {
          text-align: center;
        }
      }
    }
    > .box-content::after {
      display: table;
      clear: both;
      content: "";
    }
  }
  >.btn{
    width:80%;position:fixed;height:30px;line-height:30px;text-align:center;color:#fff;background:#5594FD ;font-size:12px;border-radius:4px;bottom:10px;
   left:50%;transform: translateX(-50%)
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}
/deep/.cube-upload-file-def {
  background-color: #5395fc;
}
/deep/.cube-checkbox-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 0 10%;
}
/deep/.cube-checkbox.cube-checkbox_checked,
.cube-checkbox-wrap {
  padding: 0;
  text-align: center;

}
.cube-checkbox-wrap{
   padding: 0 10%;
}
</style>
