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
          <div>{{info.poNo}}</div>
        </div>
        <div>
          <div>仓管员</div>
          <div>{{info.username}}</div>
        </div>
        <div>
          <div>领料人</div>
          <div>{{}}</div>
        </div>
        <div>
          <div>凭证日期</div>
          <div>{{info.createdAt?info.createdAt.slice(0,10):""}}</div>
        </div>
        <div>
          <div>记账日期</div>
          <div>{{info.updatedAt?info.updatedAt.slice(0,10):""}}</div>
        </div>
        <div>
          <div>发料凭证</div>
          <div>
            <!-- <input type="text" placeholder="请填写" v-model="voucherId" /> -->
            <div @click="showPicker">{{voucherId||'请选择'}}</div>
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
  toolingInStoreSave
} from '@/api/materiel.js'

export default {
  data () {
    return {
      info: {},
      wuliao: {},
      remark: '',
      voucherId: '',
      voucherList: '', // 收货列表
      noList: [], // 工装号列表
      moldNo: '', // 选中的工装号
      wuliaoList: []
    }
  },
  created () {
    // const no = this.$route.query.no
    // this.getInfo(no);
    this.getNoList()
  },
  components: {
    Materiel: materiel
  },
  computed: {
    allQuantity () {
      return this.wuliaoList.reduce((total, item) => {
        console.log(total)
        if (item.selected) {
          return total + item.value ? item.value * 1 : 0
        } else {
          return total
        }
      }, 0)
    }
  },
  methods: {
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
      inStorePOTooling({ moldNo: this.moldNo })
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
                { title: '库存数量', content: item.stockQty },
                { title: '应发数量', content: item.stockQty }
              ],
              max: item.stockQty,
              value: item.stockQty,
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
      this.voucherId = selectedVal.join(', ')
    },
    save () {
      if (!this.voucherId) {
        this.showToast('请选择收货凭证号')
        return
      }
      this.showLoading()

      toolingInStoreSave({
        poNo: this.info.poNo,
        matId: this.info.matId,
        toBeReceivedQty: this.wuliao.value,
        remark: this.remark,
        voucherId: this.voucherId
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
