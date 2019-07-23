<!--  -->
<template>
  <div>
    <div class="title">退货信息</div>
    <div class="content">
      <div class="table">
        <div>
          <div>领料部门</div>
          <div @click="showDep">{{depName||'请选择'}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>领料人</div>
          <div @click="showName">{{name||'请选择'}}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>收发货单编号</div>
          <div>
            <!-- <input type="text" placeholder="请填写" v-model="voucherId" /> -->
            <div>{{'请选择'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">退货物料</div>
    <div>
      <div class="add" @click="add">
        <i class="cubeic-add"></i>添加物料
      </div>
      <div class="list">
        <Materiel :info="wuliao" />
      </div>
    </div>
    <div class="title">备注</div>
    <div class="content">
      <textarea name id cols="30" rows="10" border class="bz" v-model="remark"></textarea>
    </div>
    <div class="zw"></div>
    <div class="bot">
      <div>企业圈</div>
      <div>数量合计：{{}}</div>
      <div @click="save">退货</div>
    </div>
  </div>
</template>

<script>
import materiel from '../Order/Components/materiel'

import { depUserList } from '@/api/materiel.js'

export default {
  data () {
    return {
      list: [],
      remark: '',
      depList: [],
      nameList: [],
      depName: '',
      depId: '',
      wuliao: {},
      name: '',
      applyManId: ''
    }
  },
  created () {
    depUserList().then(res => {
      this.list = res.list
      // console.log(res.list)
      this.depList = res.list.map((item, index) => {
        return { text: item.name, value: index }
      })
    })
  },
  components: {
    Materiel: materiel
  },
  methods: {

    add () {
      this.$router.push({
        path: '/materiel/select'
      })
    },
    save () {},
    showDep () {
      this.$createPicker({
        title: 'Picker',
        data: [this.depList],
        onSelect: this.selectHandle,
        onCancel: this.cancelHandle
      }).show()
    },
    selectHandle (selectedVal, selectedIndex, selectedText) {
      this.depIdx = selectedVal.join(', ')
      this.depName = this.list[this.depIdx]['name']
      this.depId = this.list[this.depIdx]['depId']
      this.nameList = this.list[this.depIdx]['childrenList'].map(item => {
        return { text: item.username, value: item.uid }
      })
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
  padding: 30px;
  display: flex;
  justify-content: center;
  color: #5496ff;
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
