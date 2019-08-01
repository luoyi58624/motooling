<!--  -->
<template>
  <div>
    <div class="title">退料信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>工装号</div>
          <div @click="showDep">{{depName||'请选择'}}</div>
        </div>
         <div>
          <div>BOM类型</div>
          <div @click="showDep">{{depName||'请选择'}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>退料人</div>
          <div @click="showName">{{name||'请选择'}}</div>
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

} from '@/api/materiel.js'

export default {
  data () {
    return {
      list: [], //
      remark: '', //
      depList: [], //
      nameList: [], //
      depName: '', // 部门名
      depId: '', //
      wuliao: {}, //
      name: '', //
      applyManId: '', //
      transDate: '', //
      chalkupDate: '', //
      voucherList: [], //
      voucherNo: '', //
      wuliaoList: [], //
      indentNo: '', //
      uid: '' //
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
    changeValue (value, index) {
      var newList = this.wuliaoList
      newList[index]['value'] = value
      this.$store.commit('changeWuliaoList', newList || [])
    },
    add () {
      this.$router.push({
        path: '/materiel/select'
      })
    },
    save () {

    },
    // save () {
    //   if (this.allQuantify === 0) {
    //     this.showToast('没有选择物料')
    //     return
    //   }
    //   if (!this.depId) {
    //     this.showToast('还没有选择退料部门')
    //     return
    //   }
    //   if (!this.transDate) {
    //     this.showToast('还没有选择凭证日期')
    //     return
    //   }
    //   if (!this.chalkupDate) {
    //     this.showToast('还没有选择记账日期')
    //     return
    //   }
    //   if (!this.indentNo) {
    //     this.showToast('未填写收发货单编号')
    //     return
    //   }

    //   var list = this.wuliaoList.map(item => {
    //     const _item = item.info
    //     _item.quantity = item.value
    //     return _item
    //   })
    //   const depId = this.depId
    //   const transDate = this.transDate
    //   const indentNo = this.indentNo
    //   const chalkupDate = this.chalkupDate
    //   const voucherNo = this.voucherNo
    //   const uid = this.uid
    //   // deptReturnMat({
    //   //   depId,
    //   //   transDate,
    //   //   uid,
    //   //   chalkupDate,
    //   //   indentNo,
    //   //   voucherNo,
    //   //   list
    //   // })
    //   //   .then(res => {
    //   //     this.showToast('操作成功')
    //   //     this.getList(this.voucherNo)

    //   //     console.log(res)
    //   //   })
    //   //   .catch(err => {
    //   //     if (err.msg) {
    //   //       this.showToast(err.msg)
    //   //     }
    //   //   })
    // },
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
    showpz () {
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
    showName () {
      if (!this.depName) {
        this.showToast('还没有选择部门')
        return
      }
      this.$createPicker({
        title: '选择领料人',
        data: [this.nameList],
        onSelect: this.selectName,
        onCancel: () => {}
      }).show()
    },
    selectName (selectedVal, selectedIndex, selectedText) {
      this.applyManId = selectedVal.join(', ')
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
