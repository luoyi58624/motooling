<!--  -->
<template>
  <div>
    <div class="title">发料信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>工装号</div>
          <div>
            <div @click="slecteNo">{{moldNo||"请选择"}}</div>
          </div>
        </div>
        <div>
          <div>BOM类型</div>
          <div @click="selectBom">{{bomTypeText||'请选择'}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{username}}</div>
        </div>
        <div>
          <div>领料人</div>
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
          <div>收发货单编号</div>
          <div>
            <input type="text" placeholder="请填写" v-model="indentNo" />
          </div>
        </div>
      </div>
    </div>
    <div class="title">发料物料</div>
    <div>
      <div class="list">
        <div v-for="(item,index) in wuliaoList" :key="index">
          <Materiel
            @input="changeValue"
            :info="item"
            v-model="item.value"
            :selected="item.selected"
            :index="index"
            @changeSel="select"
            stepperName="发料数量"
          />
        </div>
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz" v-model="remark"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计：{{allQuantity}}</div>
      <div @click="save">发料</div>
    </div>
  </div>
</template>

<script>
import materiel from '../Order/Components/materiel'

import {
  moldNoList,
  inStorePOTooling,
  toolingInStoreSave,
  listPickingName
} from '@/api/materiel.js'
import { username } from '@/utils/utils.js'
export default {
  data () {
    return {
      remark: '', // 备注
      voucherList: '', // 收货列表
      noList: [], // 工装号列表
      moldNo: '', // 选中的工装号
      wuliaoList: [],
      transDate: '', // 凭证日期
      chalkupDate: '', // 记账日期
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
      indentNo: '', // 收发货单编号
      billNo: '', // 收发货单边行
      bomTypeText: '', // bom类型名称
      bomTypeValue: '', // bom类型值
      nameList: [], // 领料人列表
      name: '' // 领料人
    }
  },
  created () {
    this.username = username()
    this.getNoList()
    this.getName()
  },
  components: {
    Materiel: materiel
  },
  computed: {
    allQuantity () {
      return this.wuliaoList.reduce((total, item) => {
        console.log(total)
        if (item.selected) {
          return total + item.value * 1
        } else {
          return total
        }
      }, 0)
    }
  },
  methods: {
    selectName () {
      // ‘选择领料人
      if (this.nameList.length === 0) {
        this.showToast('没有可选领料人')
        return
      }
      this.$createPicker({
        title: '选择领料人',
        data: [this.nameList],
        onSelect: this.selectedName
      }).show()
    },
    selectedName (selectedVal, selectedIndex, selectedText) {
      this.name = selectedText.join(', ')
    },
    selectBom () {
      // 选择bom类型
      this.$createPicker({
        title: '选择BOM类型',
        data: [this.bomTypeList],
        onSelect: this.selectedBom
      }).show()
    },
    getName () {
      // 获取领料人
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
    selectedBom (selectedVal, selectedIndex, selectedText) {
      this.bomTypeText = selectedText.join(', ')
      this.bomTypeValue = selectedVal.join(', ')
      this.getInfo()
    },
    getNoList () {
      // 获取工装列表
      moldNoList()
        .then(res => {
          console.log(res.list)
          this.noList = res.list.map(item => {
            return { text: item.moldNo, value: item.id }
          })
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    slecteNo () {
      if (this.noList.length === 0) {
        this.showToast('没有工装号可供选择')
        return
      }
      this.$createPicker({
        title: '选择工装号',
        data: [this.noList],
        onSelect: this.selectedNo
      }).show()
    },
    selectedNo (selectedVal, selectedIndex, selectedText) {
      this.moldNo = selectedText.join(', ')
      if (!this.bomTypeText) {
        this.bomTypeValue = 1
        this.bomTypeText = '主BOM'
      }
      this.getInfo()
    },
    select (value, index) {
      this.wuliaoList[index]['selected'] = value
    },
    changeValue (value, index) {
      // var newList = this.wuliaoList
      // newList[index]['value'] = value
    },
    getInfo () {
      // 获取发料信息
      inStorePOTooling({ moldNo: this.moldNo, bomType: this.bomTypeValue })
        .then(res => {
          console.log(res)
          this.wuliaoList = res.map(item => {
            console.log(item)
            return {
              list: [
                { title: '物料编码', content: item.matNo },
                { title: '物料描述', content: item.matName },
                { title: '规格型号', content: item.matModel },
                { title: '仓库', content: item.storeHouseName },
                {
                  title: '库存数量',
                  content: item.stockQty ? item.stockQty : 0
                },
                { title: '应发数量', content: item.quantity1 }
              ],
              max: Math.min(item.stockQty ? item.stockQty : 0, item.quantity1),
              value:
                Math.min(item.stockQty ? item.stockQty : 0, item.quantity1) > 0
                  ? item.quantity
                  : 0,
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
    showpzdate () {
      // 选择凭证日期
      this.$createDatePicker({
        title: '凭证日期',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.pz
      }).show()
    },
    showjzdate () {
      // 选择记账日期
      this.$createDatePicker({
        title: '记账日期',
        min: new Date(2008, 7, 8),
        max: new Date(2020, 9, 20),
        value: new Date(),
        onSelect: this.jz
      }).show()
    },
    pz (date, selectedVal, selectedText) {
      // 已选择凭证日期
      this.transDate = selectedVal.join('-')
    },
    jz (date, selectedVal, selectedText) {
      // 已选择记账日期
      this.chalkupDate = selectedVal.join('-')
    },
    save () {
      console.log(this.moldNo)
      if (!this.moldNo) {
        this.showToast('请选择工装号')
        return
      }
      if (!this.indentNo) {
        this.showToast('请填写收发货单编号')
        return
      }
      if (!this.transDate) {
        this.showToast('请选择凭证日期')
        return
      }
      if (!this.chalkupDate) {
        this.showToast('请选择记账日期')
        return
      }
      if (this.allQuantify === 0) {
        this.showToast('没有选择物料')
        return
      }
      if (!this.name) {
        this.showToast('没有选择领料人')
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
      this.showLoading()

      toolingInStoreSave({
        billNo: this.moldNo,
        transDate: this.transDate,
        chalkupDate: this.chalkupDate,
        list: list,
        indentNo: this.indentNo,
        username: this.name,
        bomtype: this.bomTypeValue
      })
        .then(res => {
          this.hideLoading()
          this.showToast('操作成功')
          this.getInfo()
        })
        .catch(err => {
          this.hideLoading()
          this.showToast(err.msg ? err.msg : '错误')
        })
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
