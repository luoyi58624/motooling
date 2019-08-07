<!--  -->
<template>
  <div>
    <div class="title">退货信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>采购订单</div>
          <div>{{billNo}}</div>
        </div>
        <div>
          <div>供应商</div>
          <div>{{supName}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>退货人</div>
          <div @click="selectName">{{name||'请选择'}}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div @click="showpzdate">{{transDate||'请选择'}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div @click="showjzdate">{{chalkupDate||'请选择'}}</div>
        </div>
        <div>
          <div>收货凭证</div>
          <div @click="showpz">{{voucherNo||'请选择'}}</div>
        </div>
        <div>
          <div>收发货单编号</div>
          <div>
            <div>
              <input type="text" placeholder="请填写" v-model="indentNo" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">退货物料</div>
    <div>
      <div v-for="(item,index) in wuliaoList" :key="index">
        <Materiel
          @input="changeValue"
          :info="item"
          v-model="item.value"
          :selected="item.selected"
          :index="index"
          stepperName='退货数量'
          @changeSel="select"
        />
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz" v-model="remark"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计：{{allQuantify}}</div>
      <div @click="save">退货</div>
    </div>
  </div>
</template>

<script>
import materiel from '../Order/Components/materiel'

import {
  getPurchaseOutStore,
  purchaseOutStoreSave,
  getPurchaseOutVoucher
} from '@/api/instore/instore.js'
import { listPickingName } from '@/api/materiel.js'
export default {
  data () {
    return {
      remark: '', //
      noList: [], // 可退料工装列表
      moldNo: '', // 选择的工装号
      nameList: [], // 退货人列表
      name: '', // 退料人
      bomTypeList: [
        // bom类型列表
        {
          text: '主BOM',
          value: '1'
        },
        {
          text: '辅BOM',
          value: '2'
        }
      ],
      billNo: '', // 收发货单边行
      applyManId: '', //
      transDate: '', //
      chalkupDate: '', //
      voucherList: [], // 发料凭证列表
      voucherNo: '', // 发料凭证
      wuliaoList: [], //
      indentNo: '', //
      uid: '', //
      supName: '', // 供应商名称
      bomTypeText: '' // bom类型名称
    }
  },
  created () {
    // console.log(getPurchaseOutStore)
    this.billNo = this.$route.query.no
    this.getInfo()
    getPurchaseOutVoucher({ billNo: this.billNo }).then(res => {
      console.log(res)
      this.supName = res.supName
      this.voucherList = res.voucherList.map(item => ({
        value: item.voucherId,
        text: item.voucherNo
      }))
    })
    listPickingName()
      .then(res => {
        this.nameList = res.map(item => ({
          value: item.uid,
          text: item.username
        }))
      })
      .catch(err => {
        if (err.msg) {
          this.showToast(err.msg)
        }
      })
  },
  components: {
    Materiel: materiel
  },
  computed: {
    allQuantify () {
      return this.wuliaoList.reduce((total, item) => {
        if (item.selected) {
          return total + item.value * 1
        } else {
          return total
        }
      }, 0)
    }
  },
  methods: {
    getName () {
      // 获取退料人
      listPickingName()
        .then(res => {
          console.log('领料人', res)
          this.nameList = res.map(item => {
            return {
              text: item.username,
              value: item.uid
            }
          })
        })
        .catch(err => {
          if (err.msg) {
            this.showTost(err.msg)
          }
        })
    },
    changeValue (value, index) {
      var newList = this.wuliaoList
      newList[index]['value'] = value
      this.$store.commit('changeWuliaoList', newList || [])
    },
    selectBom () {
      // 选择bom类型
      this.$createPicker({
        title: '选择BOM类型',
        data: [this.bomTypeList],
        onSelect: this.selectedBom
      }).show()
    },
    selectedBom (selectedVal, selectedIndex, selectedText) {
      this.bomTypeText = selectedText.join(', ')
      this.bomTypeValue = selectedVal.join(', ')
      this.getInfo()
    },
    selectedNo (selectedVal, selectedIndex, selectedText) {
      this.moldNo = selectedText.join(', ')
      if (!this.bomTypeText) {
        this.bomTypeValue = 1
        this.bomTypeText = '主BOM'
      }
      this.getVoucher()
      this.getInfo()
    },
    select (value, index) {
      this.wuliaoList[index]['selected'] = value
    },
    getInfo () {
      // 获取物料信息
      getPurchaseOutStore({ billNo: this.billNo })
        .then(res => {
          console.log(res)
          this.wuliaoList = res.map(item => {
            console.log(item)
            return {
              list: [
                { title: '工装号', content: item.billNo },
                { title: '物料编码', content: item.matNo },
                { title: '物料描述', content: item.matName },
                { title: '外协类型', content: item.assTypeName },
                { title: '可退数量', content: item.quantity1 }
              ],
              max: 1,
              value: Math.min(item.quantity1, 1),
              selected: true,
              matId: item.matId,
              info: item
            }
          })
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },

    save () {
      if (!this.name) {
        this.showToast('请选择退料人')
        return
      }

      if (!this.indentNo) {
        this.showToast('请填写收发货单号')
        return
      }
      if (!this.voucherNo) {
        this.showToast('请选择凭证号')
        return
      }
      if (!this.chalkupDate) {
        this.showToast('请选择记账日期')
        return
      }
      if (!this.voucherNo) {
        this.showToast('请选择收货凭证')
        return
      }
      if (!this.indentNo) {
        this.showToast('请填写收发货单编号')
      }
      if (this.allQuantify === 0) {
        this.showToast('没有选择物料')
        return
      }

      const list = this.wuliaoList
        .map(item => {
          if (item.selected && item.value > 0) {
            return Object.assign({}, item.info, { quantity: item.value })
          }
        })
        .filter(item => {
          return item
        })

      const billNo = this.billNo
      const transDate = this.transDate
      const chalkupDate = this.chalkupDate
      const supName = this.supName
      const supLinkmanName = ''
      const voucherNo = this.voucherNo
      const indentNo = this.indentNo
      purchaseOutStoreSave({
        billNo,
        transDate,
        chalkupDate,
        supName,
        supLinkmanName,
        indentNo,
        voucherNo,
        list
      })
        .then(res => {
          this.showToast('操作成功')
          this.getInfo()
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
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
    getVoucher () {
      // 获取凭证号
    },
    showpz () {
      // 选择让凭证号
      if (this.voucherList.length === 0) {
        this.showToast('暂无可选')
        return
      }
      console.log(this.voucherList)
      this.picker = this.$createPicker({
        title: '选择发料凭证',
        data: [this.voucherList],
        onSelect: this.pzno
      }).show()
    },
    pzno (selectedVal, selectedIndex, selectedText) {
      this.voucherNo = selectedText.join(', ')
    },
    getList (no) {},

    jz (date, selectedVal, selectedText) {
      this.chalkupDate = selectedVal.join('-')
    },
    selectName () {
      // ‘选择领料人
      if (this.nameList.length === 0) {
        this.showToast('没有可选退料人')
        return
      }
      this.$createPicker({
        title: '选择退料人',
        data: [this.nameList],
        onSelect: this.selectedName
      }).show()
    },
    selectedName (selectedVal, selectedIndex, selectedText) {
      this.name = selectedText.join(', ')
    }
  }
}
</script>
<style lang='less' scoped>
.add {
  font-size: 16px;
  padding: 10px;
  display: flex;
  justify-content: center;
  color: #5496ff;
  align-items: center;
  > i {
    font-size: 20px;
  }
}
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
