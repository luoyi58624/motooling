<!--  -->
<template>
  <div>
    <!-- <Screen /> -->
    <div class="title">收货信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>生产订单</div>
          <div>{{ info.poNo }}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{ username }}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div @click="showpzdate">
            {{ transDate || "请选择" }}
          </div>
        </div>
        <div>
          <div>记账日期</div>
          <div @click="showjzdate">
            {{ chalkupDate || "请选择" }}
          </div>
        </div>
        <div>
          <div>收发货单编号</div>
          <div>
            <input type="text" placeholder="请填写" />
          </div>
        </div>
      </div>
    </div>
    <div class="title">收货物料</div>
    <div>
      <div class="list">
        <Materiel :info="wuliao" v-model="wuliao.value" :img="item.fileList?item.fileList[0].imgUrl:''||require('@/assets/default.png')" />
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea
        name
        id
        cols="30"
        rows="10"
        border
        class="bz"
        v-model="remark"
      ></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计</div>
      <div @click="save">收货</div>
    </div>
  </div>
</template>

<script>
import materiel from './Components/materiel'
// import screen from './Components/screen'
import { getpmPoInStore, inStoreSave } from '@/api/order/order.js'
import { username } from '@/utils/utils.js'
export default {
  data () {
    return {
      chalkupDate: getRaday(),
      transDate: getRaday(),
      info: {},
      wuliao: {},
      remark: '',
      no: '',
      isold: 0
    }
  },
  created () {
    this.username = username()
    this.no = this.$route.query.no
    this.getInfo(this.no)
  },
  components: {
    Materiel: materiel
    // Screen: screen
  },
  methods: {
    showpzdate () {
      this.$createDatePicker({
        title: '凭证日期',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.pz
      }).show()
    },
    showjzdate () {
      this.$createDatePicker({
        title: '记账日期',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.jz
      }).show()
    },
    pz (date, selectedVal, selectedText) {
      this.transDate = selectedVal.join('-')
    },
    jz (date, selectedVal, selectedText) {
      this.chalkupDate = selectedVal.join('-')
    },
    getInfo (no) {
      getpmPoInStore({ poNo: no })
        .then(res => {
          if (res === null && this.isold) { // 若结果为空并且不是第一次调用该函数
            this.wuliao.list[4].content = 0
            this.wuliao.value = 0
            return true
          }
          this.isold++
          this.info = res
          this.wuliao = {
            list: [
              { title: '物料编码', content: res.matNo },
              { title: '物料描述', content: res.matName },
              { title: '物料类型', content: res.matTypeName },
              { title: '单    位', content: res.unitName },
              { title: '待收数量', content: res.toBeReceivedQty }
            ],
            max: res.toBeReceivedQty,
            value: 1,
            img: res.imgList.length > 0 ? res.imgList[0].imgUrl : ''
          }
        })
        .catch(err => {
          this.showDialog({
            title: '出错了',
            content: err.msg,
            onConfirm: () => {
              this.$router.go(-1)
            },
            onCancel: () => {
              // this.$router.go(-1)
            }
          })
          // this.showToast(err.msg || '出错了')
        })
    },
    save () {
      if (!this.chalkupDate) {
        this.showToast('请选择记账日期')
        return
      }
      if (!this.transDate) {
        this.showToast('请选择记账日期')
        return
      }
      this.showLoading()
      inStoreSave({
        poNo: this.info.poNo,
        matId: this.info.matId,
        toBeReceivedQty: this.wuliao.value,
        remark: this.remark
      })
        .then(res => {
          console.log(res)
          this.hideLoading()
          this.showToast('收货成功')
          const no = this.$route.query.no
          this.getInfo(no)
        })
        .catch(err => {
          this.hideLoading()
          this.showToast(err.msg ? err.msg : '')
        })
    }
  }
}
function getRaday () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  var nowData = year + '-' + month + '-' + day
  return nowData
}
</script>
<style lang="less" scoped>
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
      > input {
        border: none;
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
