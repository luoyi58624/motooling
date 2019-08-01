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

    <div class="bar">检验信息</div>
    <div class="table">
      <div>
        <div>结论</div>
        <div>
          <cube-radio-group v-model="info.qcResult" :options="options3" :horizontal="true" />
        </div>
      </div>
      <div>
        <div>明细</div>
        <div>
          <div>合格:{{info.qualifiedQty}}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>不合格:{{info.noQualifiedQty}}</div>
        </div>
      </div>
      <div>
        <div>检验模板</div>
        <div>
          <div @click="mb">查看</div>
        </div>
      </div>
      <div>
        <div>质检报告</div>
        <div @click="zj">查看</div>
      </div>
      <div>
        <div>问题描述</div>
        <div>{{info.qcRemark||'无'}}</div>
      </div>
      <div>
        <div>待采数量</div>
        <div style="color:red">{{waitUse}}</div>
      </div>
    </div>
    <div class="bar">处理信息</div>
    <div class="table">
      <div>
        <div>处理</div>
        <div>
          <div class="flex-wrapper">
            <div>
              特采
              <input type="number" v-model="specialQty" />
            </div>
            <div>
              退货
              <input type="number" v-model="returnQty" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>罚款</div>
        <div>
          <input type="number" placeholder="请填写" v-model="deduct" />
        </div>
      </div>
      <div>
        <div>备注</div>
        <div>
          <input type="text" placeholder="请填写" v-model="specialRemark" />
        </div>
      </div>
    </div>
    <div class="bor-bar"></div>
    <div class="bot" @click="save">提交</div>
  </div>
</template>

<script>
import {
  inStoreInfo,
  // purchUpdate,
  purchSpecial
  // purchQuality,
  // getStoreHouse,
  // getStoreRoom
} from '@/api/instore/instore'
export default {
  data () {
    return {
      specialQty: '',
      returnQty: '',
      deduct: '',
      specialRemark: '',
      info: {},
      waitUse: '',
      options3: [
        {
          label: '合格',
          value: '1',
          disabled: true
        },
        {
          label: '不合格(或未测完)',
          value: '2',
          disabled: true
        }
      ]
    }
  },
  created () {
    this.getInfo()
  },

  methods: {
    mb () {
      const list = this.factoryReportList.map(item => {
        return { text: item.fileName, value: item.fileUrl }
      })
      if (list.length === 0) {
        this.showToast('没有内容')
        return
      }
      this.$createPicker({
        title: '',
        data: [list],
        onSelect: this.selmb,
        onCancel: () => {}
      }).show()
    },
    selmb (selectedVal, selectedIndex, selectedText) {
      const url = selectedVal.join(', ')
      window.open(url)
    },
    zj () {
      const list = this.wordList.map(item => {
        return {
          text: item.fileName,
          value: item.fileUrl
        }
      })
      if (list.length === 0) {
        this.showToast('没有内容')
        return
      }
      this.picker = this.$createPicker({
        title: '',
        data: [list],
        onSelect: this.selectHandle,
        onCancel: () => {}
      })
      this.picker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      const url = selectedVal.join(', ')
      window.open(url)
    },
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      console.log(purchSubId)
      inStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.waitUse =
          this.info.noQualifiedQty * 1 -
          this.info.specialQty * 1 -
          this.info.returnQty * 1
        this.wordList = res.inStoreInfo.qualityList
        this.factoryReportList = res.inStoreInfo.factoryReportList
        this.storeHouseId = res.inStoreInfo.storeHouseId
        this.storeRoomId = res.inStoreInfo.storeRoomId
        console.log(this.storeHouseId, this.storeRoomId)
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
      if (!this.specialQty && !this.returnQty) {
        this.showToast('请填写特采数和退货数')
        return
      }
      if (!this.specialQty) {
        this.specialQty = 0
      }
      if (!this.returnQty) {
        this.returnQty = 0
      }
      if (this.specialQty * 1 + this.returnQty * 1 !== this.waitUse) {
        this.showToast('特采与退货数量相加需要等于待采数量')
        return
      }

      const purchSubId = this.$route.query.purchSubId
      var data2 = Object.assign({}, this.info, {
        purchSubId,
        specialQty: this.specialQty,
        returnQty: this.returnQty,
        deduct: this.deduct,
        specialRemark: this.specialRemark
      })
      purchSpecial(data2)
        .then(res => {
          this.getInfo()
          this.showToast('特采成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
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
    margin-bottom: 15px;
    > div {
      > div:nth-child(2) {
        text-align: right;
        justify-content: flex-end;
      }
      > div {
        display: felx;
        align-items: center;
        > input {
          text-align: right;
        }
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
  .bor-bar {
    height: 40px;
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
    }
  }
}
</style>
