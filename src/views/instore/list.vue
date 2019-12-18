<!--  -->
<template>
  <div>
    <my-header title="采购收货" :hasRight="true" settingUrl="/instore/setting"></my-header>
    <!-- <div class="option">
      <div>
        <div style="color:#4e92ff">按生产订单排序</div>
        <div :class="{active:true}">
          升序
          <i class="iconfont">&#xe79e;</i>
        </div>
        <div :class="{active:false}">
          降序
          <i class="iconfont">&#xe79f;</i>
        </div>
      </div>
      <div @click="()=>{this.showToast('功能暂未开发')}">筛选</div>
    </div> -->
    <screen class="screen"/>
    <div class="no">
      <div >
        <span @click.stop="selectAll" v-show="type===1" class="iconfont icon-iconfontxuanzhong4" :class="{active:selecteAll}"></span>
      </div>
      <div></div>
    </div>
    <div v-if="listDone&&list.length==0" class="nocontent">暂时没有数据</div>
    <div class="list">
      <div class="boxer" v-for="(item,index) in list" :key="index" @click="toInfo(item.purchSubId)">
        <div class="iqc" v-show="type==2||type==3">IQC</div>
        <div class="right-wrapper" @click.stop="select(index)"  v-show="type===1">
          <span class="iconfont icon-iconfontxuanzhong4" :class="{active:item.selected}"></span>
        </div>
        <div class="right-wrapper" v-if="item.preOrderFlag===1">
          <span class="iconfont icon-iconset0141"></span>
        </div>
        <div class="img-wrapper">
          <img src alt />
        </div>
        <div class="center-wrapper">
          <div class="title">名称:</div>
          <div>物料编码：{{item.matNo}}</div>
          <div>物料描述：{{item.matDesc}}</div>
          <div>订单数量：{{item.totalQuantity}}</div>
          <div>已收：{{item.receivedQty}}</div>
          <div v-show="type===1">
            收货数量:
            <stepper v-model="item.quantity" :max="item.totalQuantity-item.receivedQty" />
          </div>
          <!-- <div>规格型号：{{item.matModel}}</div> -->
          <!-- <div>数量：{{item.quantity}}</div> -->
          <!-- <div>重量：{{item.a}}</div> -->
          <!-- <div>检验要求:{{item.pcFlag}}</div> -->
          <!-- <div class="btn-wrapper" v-if="item.preOrderFlag===1">
            <button
              :disabled="item.isNeedQc=='0'||item.qcQty==0"
              @click.stop="toInfo(item.purchSubId,2)"
            >质检</button>
            <button :disabled="!item.noQualifiedQty>0" @click.stop="toInfo(item.purchSubId,3)">特采</button>
          </div>-->
        </div>
        <div class="litter-wrapper">
          <div v-show="type==2||type==3">不合格：{{item.noQualifiedQty||0}}</div>
          <div v-show="type==3">特采：{{item.specialQty||0}}</div>
          <div v-show="type==3">退货：{{item.returnQty||0}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <div class="nav" :class="{active:type===1}" @click="changeType(1)">收货</div>
        <div  class="nav" :class="{active:type===2}" @click="changeType(2)">检验</div>
        <div  class="nav" :class="{active:type===3}" @click="changeType(3)">特采</div>
      </div>
    </div>
    <div class="bot">
      <div @click="purch" v-if="type===1">提交</div>
    </div>
    <div class="zw"></div>
    <toSynergy relationType="1" :relationId="billId+''"/>
  </div>
</template>

<script>
import { inStoreList, purchBatchReceived } from '@/api/instore/instore'
import myHeader from '@/components/header'
import toSynergy from '@/components/ToSynergy'
import stepper from '@/components/stepper'
import screen from '@/components/screen'
export default {
  components: {
    myHeader,
    stepper,
    screen,
    toSynergy
  },
  data () {
    return {
      value: 5,
      list: [],
      // billNo:'MP19040001'
      // billNo: 'MP19070004',
      billNo: '',
      listDone: false,
      type: 1,
      billId: ''
    }
  },
  created () {
    this.billNo = this.$route.query.no || 'MP19050004'
    this.getList()
    document.getElementsByTagName('title')[0].innerText = this.billNo
  },
  computed: {
    selecteAll () {
      if (
        this.list.filter(item => {
          return item
        }).length === 0
      ) {
        return false
      }
      return this.list
        .every(item => {
          return item.selected === true
        })
    }
  },

  methods: {
    changeType (type) {
      this.type = type
      this.getList()
    },
    purch () {
      const newList = this.list
        .filter(item => item.selected)
        .map(item => {
          return { purchSubId: item.purchSubId, quantity: item.quantity }
        })
      console.log(newList)
      if (newList.length === 0) {
        this.showToast('没有选择货物')
        return
      }
      purchBatchReceived({ purchList: newList, purchNo: this.billNo })
        .then(res => {
          this.getList()
          this.showToast('收货成功')
        })
        .catch(res => {
          this.showToast(res.msg)
        })
    },
    selectAll () {
      if (this.selecteAll) {
        this.list = this.list
          .map((item, index) => {
            return Object.assign({}, item, { selected: false })
          })
      } else {
        this.list = this.list
          // .filter(item => {
          //   return item.preOrderFlag === 1
          // })
          .map((item, index) => {
            return Object.assign({}, item, { selected: true })
          })
      }
    },
    getList () {
      this.showLoading()
      inStoreList({ billNo: this.billNo, type: this.type })
        .then(res => {
          this.hideLoading()
          let array = res.inStoreDetailList
          for (let i = 0; i < array.length; i++) {
            array[i].selected = false
          }
          this.list = array
          this.billId = res.billId
          this.listDone = true
        })
        .catch(err => {
          this.hideLoading()
          this.showDialog({
            title: '出错了',
            content: err.msg,
            onConfirm: () => {
              // this.$router.go(-1)
            },
            conCancel: () => {
              // this.$router.go(-1)
            }
          })
          // this.showToast(err.msg)
          console.log(err)
        })
    },
    toInfo (purchSubId) {
      // onsole.log(purchId)
      // if (type === 1 && isNeedQc === '0') {
      //   return
      // }
      if (this.type === 1) {
        this.$router.push({
          path: '/instore/receive',
          query: {
            purchSubId
          }
        })
      }
      if (this.type === 2) {
        this.$router.push({
          path: '/instore/testing',
          query: {
            purchSubId
          }
        })
      }
      if (this.type === 3) {
        this.$router.push({
          path: '/instore/use',
          query: {
            purchSubId
          }
        })
      }
    },
    select (index) {
      this.list = [
        ...this.list.slice(0, index),
        Object.assign({}, this.list[index], {
          selected: !this.list[index].selected
        }),
        ...this.list.slice(index + 1)
      ]
      // this.selecteAll=false;
      // this.list[index].selected=!this.list[index].selected
    }
  }
}
</script>
<style lang='less' scoped>
.screen{
  position:fixed;top:40px;left:0;right:0;
}
.bot {
  z-index: 10;
  position: fixed;
  bottom: 51px;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 80px;
    height: 20px;
    background: #fff;
    color: #00a0a0;
    border: 1px solid #929292;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    border-radius: 6px;
  }
}
.zw {
  height: 102px;
}
.option {
  margin-top: 41px;
  background: #fff;
  font-size: 14px;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid rgb(238, 238, 238);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  .active {
    color: #4e92ff;
  }
}
.option::after {
  display: table;
  content: "";
  clear: both;
}
.option > div:first-child {
  display: flex;
  float: left;
  align-items: center;
}
.option > div:nth-child(2) {
  float: right;
}
.option > div:first-child > div {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.no {
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 6px 0 15px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 12px;
  color: #505050;
  align-items: center;margin-top:80px;
  > div:first-child {
    color: #eee;
    > span {
      font-size: 24px;
    }
    > span.active {
      color: #4e92ff;
    }
  }
}
.list {
  padding-left: 15px;
  > .boxer {
    display: flex;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 18px;position:relative;
    >.iqc{
     position: absolute;right:10px;top:10px;border:1px solid red;color:red;padding:2px 10px;font-size:12px;border-radius: 4px;
    }
    > .img-wrapper {
      width: 110px;
      > img {
        width: 100px;
      }
    }
    > .center-wrapper {
      flex: 1;
      > div {
        width: 100%;
        display: flex;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 22px;
        line-height: 22px;
        color: #ababab;
        font-size: 12px;
      }
      > div.title {
        color: #333;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
      }
      > div.btn-wrapper {
        height: 30px;
        display: flex;
        > button {
          background: #fff;
          height: 30px;
          width: 60px;
          text-align: center;
          line-height: 30px;

          margin-left: 10px;
          border-radius: 4px;
          color: #fe4c44;
          border: 1px solid #fe4c44;
        }
        > button:disabled {
          color: #999;
          border-color: #999;
        }
        > button:first-child {
          margin-left: 0;
        }
      }
    }
    > .litter-wrapper {
      width: 80px;
      flex-direction: column;
      justify-content: flex-end;
      display: flex;
      > div {
        height: 22px;
        line-height: 22px;
        color: #ababab;
        font-size: 12px;
      }
    }
    > .right-wrapper {
      width: 30px;
      display: flex;
      align-items: center;
      > span {
        font-size: 24px;
        color: #eee;
      }
      > span.active {
        color: #4e92ff;
      }
      > div {
        width: 10px;
        height: 10px;
        border: 1px solid #eee;
        border-radius: 50%;
      }
    }
  }
}
.nocontent {
  font-size: 12px;
  padding: 20px 0;
  text-align: center;
  color: #999;
}
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
  font-size: 16px;
  color: #505050;
  border-top: 1px solid #e9e9e9;
  background: #fff;
  > div {
    display: flex;
    flex: 1;
    color: #fff;
    background: #5495ff;
    > div {
      flex: 1;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
  > div.active {
    color: #5495ff;
    background: #fff;
  }
  > div:nth-child(2) {
    > div {
      border-left: 1px solid #fff;
      background: #5495ff;
      color: #fff;
    }
  }
}
.nav.active{
   color: #5495ff;
    background: #fff;
}
</style>
