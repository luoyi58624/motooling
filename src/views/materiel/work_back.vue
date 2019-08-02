<!--  -->
<template>
  <div>
    <div class="title">退料信息</div>
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
          <div>{{}}</div>
        </div>
        <div>
          <div>退料人</div>
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
          <div>发料凭证</div>
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
    <div class="title">退料物料</div>
    <div>
      <div v-for="(item,index) in wuliaoList" :key="index">
        <Materiel
          @input="changeValue"
          :info="item"
          v-model="item.value"
          :selected="item.selected"
          :index="index"
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
      <div @click="save">退料</div>
    </div>
  </div>
</template>

<script>
import materiel from '../Order/Components/materiel'

import {
  moldNoOutList,
  outStorePOTooling,
  listToolingVoucherNo,
  listPickingName,
  toolingOutStoreSave
} from '@/api/materiel.js'

export default {
  data () {
    return {
      list: [], //
      remark: '', //
      depList: [], //
      depName: '', // 部门名
      depId: '', //
      wuliao: {}, //
      noList: [], // 可退料工装列表
      moldNo: '', // 选择的工装号
      nameList: [], // 退料人列表
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
      bomTypeText: '' // bom类型名称
    }
  },
  created () {
    const uid = localStorage.getItem('uid')
    console.log(uid)
    if (!uid) {
      let fullPath = this.$router.currentRoute.fullPath
      this.$router.replace(
        '/login?redirectURL=' + encodeURIComponent(fullPath)
      )
    } else {
      this.uid = uid
    }
    this.getNoList()
    this.getName()
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
    getNoList () {
      // 获取工装列表
      moldNoOutList()
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
    changeValue (value, index) {
      var newList = this.wuliaoList
      newList[index]['value'] = value
      this.$store.commit('changeWuliaoList', newList || [])
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
      // 获取发料信息
      outStorePOTooling({ moldNo: this.moldNo, bomType: this.bomTypeValue })
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
                { title: '库存数量', content: item.stockQty ? item.stockQty : 0 },
                { title: '应发数量', content: item.quantity1 }
              ],
              max: Math.min(item.stockQty ? item.stockQty : 0, item.quantity1),
              value: Math.min(item.stockQty ? item.stockQty : 0, item.quantity1) > 0 ? item.quantity : 0,
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
      if (!this.moldNo) {
        this.showToast('请选择工装号')
        return
      };

      //  if(!this.remark){
      //    this.showToast('请填写备注');
      //    retrun
      // };
      if (!this.bomTypeText) {
        this.showToast('请选择BOM类型')
        return
      };
      if (!this.indentNo) {
        this.showToast('请填写收发货单号')
        return
      };
      if (!this.voucherNo) {
        this.showToast('请选择凭证号')
        return
      };
      if (!this.chalkupDate) {
        this.showToast('请选择记账日期')
        return
      };
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
      console.log(list)
      const bmoype = this.bomTypeValue
      const billNo = this.moldNo
      const transDate = this.transDate
      const chalkupDate = this.chalkupDate
      const voucherNo = this.voucherNo
      const indentNo = this.indentNo
      const uid = this.uid
      const remark = this.remark
      toolingOutStoreSave({
        bmoype,
        billNo,
        transDate,
        uid,
        chalkupDate,
        indentNo,
        voucherNo,
        list,
        remark
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
    getVoucher () { // 获取凭证号
      if (!this.moldNo) {
        this.showToast('没有选择工装号')
        return
      }
      if (!this.bomTypeValue) {
        this.showToast('没有选择BOM类型')
        return
      }
      listToolingVoucherNo({ moldNo: this.moldNo, bomType: this.bomTypeValue })
        .then(res => {
          console.log('凭证号', res)
          this.voucherList = res.map(item => {
            return {
              text: item.voucherNo, value: item.voucherNo
            }
          })
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    showpz () { // 选择让凭证号
      if (this.voucherList.length === 0) {
        this.showToast('暂无可选')
        return
      }
      this.picker = this.$createPicker({
        title: '选择发料凭证',
        data: [this.voucherList],
        onSelect: this.pzno
      }).show()
    },
    pzno (selectedVal, selectedIndex, selectedText) {
      this.voucherNo = selectedVal.join(', ')
      this.getList(this.voucherNo)
    },
    getList (no) {
      // deptReturnMatList({ voucherNo: no }).then(res => {
      //   this.wuliaoList = res.list.map(item => {
      //     return {
      //       list: [
      //         { title: '物料编码', content: item.matNo },
      //         { title: '物料描述', content: item.matName },
      //         { title: '规格型号', content: item.matModel },
      //         { title: '仓库', content: item.storeHouseName },
      //         { title: '可退数量', content: item.stockQty }
      //       ],
      //       max: item.stockQty,
      //       value: item.stockQty,
      //       selected: true,
      //       matId: item.matId,
      //       info: item
      //     }
      //   })
      // })
    },
    showDep () {
      this.$createPicker({
        title: '退料部门',
        data: [this.depList],
        onSelect: this.selectHandle
      }).show()
    },
    jz (date, selectedVal, selectedText) {
      this.chalkupDate = selectedVal.join('-')
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.depIdx = selectedVal.join(', ')
      this.depName = this.list[this.depIdx]['name']
      this.depId = this.list[this.depIdx]['depId']
      this.nameList = this.list[this.depIdx]['childrenList'].map(item => {
        return { text: item.username, value: item.uid }
      })
      this.name = ''
      this.applyManId = ''
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
