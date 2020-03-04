<!--  -->
<template>
  <div>
    <div class="title">退货信息123</div>
    <div class="content">
      <div class="table">
        <div>
          <div>生产订单</div>
          <div>{{info.poNo}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{username}}</div>
        </div>
        <!-- <div>
          <div>退货人</div>
          <div>{{}}</div>
        </div>-->
        <div>
          <div>凭证日期</div>
          <div>{{info.createdAt?info.createdAt.slice(0,10):""}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div>{{info.updatedAt?info.updatedAt.slice(0,10):""}}</div>
        </div>
        <div>
          <div>收货凭证号</div>
          <div>
            <!-- <input type="text" placeholder="请填写" v-model="voucherId" /> -->
            <div @click="showPicker">{{_voucherId||'请选择'}}</div>
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
    <div class="title">退货物料</div>
    <div>
      <div class="list">
        <Materiel :info="wuliao" v-model="wuliao.value" />
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz" v-model="remark"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计：{{wuliao.value}}</div>
      <div @click="save">退货</div>
    </div>
  </div>
</template>

<script>
import materiel from './Components/materiel'

import { outStoreSave, getpmPoOutStoreById } from '@/api/order/order.js'
import { username } from '@/utils/utils.js'

export default {
  data () {
    return {
      info: {},
      wuliao: {},
      remark: '',
      voucherId: '',
      voucherList: '', // 收货列表
      selectedIndex: 0,
      init_voucherList: []
    }
  },
  created () {
    this.username = username()
    const no = this.$route.query.no
    this.getInfo(no)
  },
  components: {
    Materiel: materiel
  },
  methods: {
    showPicker () {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '',
          data: [this.voucherList],
          onSelect: this.selectHandle
        })
      }
      this.picker.show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal.join(', '))
      console.log(selectedIndex)
      this.selectedIndex = selectedIndex[0]
      this.voucherId = selectedVal.join(', ')
    },
    getInfo (no) {
      getpmPoOutStoreById({ poNo: no })
        .then(res => {
          console.log(res)
          this.info = res
          this.init_voucherList = res.voucherList
          this.voucherList = res.voucherList.map(item => {
            return { text: item.voucher_id, value: item.voucher_id }
          })
          console.log('**&&')
          this.wuliao = {
            list: [
              { title: '物料编码', content: res.matNo },
              { title: '物料描述', content: res.matName },
              { title: '物料类型', content: res.matTypeName },
              { title: '单位', content: res.unitName },
              { title: '可退数量', content: this._voucherQty || 0 }
            ],
            max: this._voucherQty,
            value: this._voucherQty > 0 ? 1 : 0,
            img: res.picPath
          }
        })
        .catch(() => {
          this.showDialog({
            title: '出错了',
            content: '可能单号有误，将为您返回上一页',
            onConfirm: () => {
              this.$router.go(-1)
            },
            onCancel: () => {
              this.$router.go(-1)
            }
          })
        })
    },
    save () {
      if (!this._voucherId) {
        this.showToast('请选择收货凭证号')
        return
      }
      this.showLoading()

      outStoreSave({
        poNo: this.info.poNo,
        matId: this.info.matId,
        toBeReceivedQty: this.wuliao.value,
        remark: this.remark,
        voucherId: this._voucherId
      })
        .then(res => {
          this.hideLoading()
          this.showToast('退货成功')
          // this.getInfo()
        })
        .catch(err => {
          this.hideLoading()
          this.showToast(err.msg ? err.msg : '')
        })
    }
  },
  computed: {
    _voucherQty () {
      console.log('计算属性')
      const index = this.selectedIndex
      return this.init_voucherList[index].voucherQty
    },
    _voucherId () {
      const index = this.selectedIndex
      console.log(this.init_voucherList)
      return this.init_voucherList[index].voucher_id
    }
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
