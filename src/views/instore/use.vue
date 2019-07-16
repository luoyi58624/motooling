<!--  -->
<template>
  <div class="wrapper">
      <div class="bar">物料信息</div>
    <div class="table">

      <div>
        <div>物料编码</div>
        <div></div>
      </div>
      <div>
        <div>物料描述</div>
        <div>工装号</div>
      </div>
      <div>
        <div>物料类型</div>
        <div>工装号</div>
      </div>
      <div>
        <div>规格型号</div>
        <div>工装号</div>
      </div>
      <div>
        <div>订单数量</div>
        <div>工装号</div>
      </div>
      <div>
        <div>已收数量</div>
        <div>工装号</div>
      </div>
      <div>
        <div>待检数量</div>
        <div>工装号</div>
      </div>
    </div>

    <div class="bar">检验信息</div>
    <div class="table">

      <div>
        <div>结论</div>
        <div></div>
      </div>
      <div>
        <div>明细</div>
        <div></div>
      </div>
      <div>
        <div>检验模板</div>
        <div></div>
      </div>
      <div>
        <div>质检报告</div>
        <div>查看</div>
      </div>
      <div>
        <div>问题描述</div>
        <div>尺寸不对</div>
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
                    <input type="number">
                </div>
                 <div>
                    退货
                    <input type="number">
                </div>
            </div>
        </div>
      </div>
       <div>
        <div>罚款</div>
        <div>
          <input type="number" placeholder="请填写">
        </div>
      </div>
       <div>
        <div>备注</div>
        <div>
            <input type="number" placeholder="请填写">
        </div>
      </div>

    </div>
     <div class="bot" @click="save">
        提交

    </div>

  </div>
</template>

<script>
import {
  inStoreInfo,
  // purchUpdate,
  purchSpecial,
  // purchQuality,
  // getStoreHouse,
  getStoreRoom
} from '@/api/instore/instore'
export default {
  data () {
    return {
    }
  },
  created () {
    this.getInfo()
  },

  methods: {
    getInfo () {
      const purchSubId = this.$route.query.purchSubId
      console.log(purchSubId)
      inStoreInfo({ purchSubId }).then(res => {
        console.log(res)
        this.info = res.inStoreInfo
        this.wordList = res.qualityList
        this.pdfList = res.factoryReportList
        this.storeHouseId = res.inStoreInfo.storeHouseId
        this.storeRoomId = res.inStoreInfo.storeRoomId
        console.log(this.storeHouseId, this.storeRoomId)
        if (this.storeHouseId) {
          getStoreRoom({ storeHouseId: this.storeHouseId }).then(res => {
            var romeList = res.storeRoomsConfList
            var newRome = romeList.map((item, index) => {
              return { text: item.storeRoomName, value: item.id }
            })
            this.storeRoomList = newRome
          })
        }
      })
    },
    save () {
      if (
        !this.info.specialUp ||
          !this.info.noQualifiedQty ||
          this.info.reduceRatio === null
      ) {
        this.showToast('特采表单未填写完整')
        return
      }
      if (this.info.specialQty > this.info.noQualifiedQty) {
        this.showToast('特采数量不能大于不良数量')
        return
      }
      const purchSubId = this.$route.query.purchSubId
      var data2 = Object.assign({}, { purchSubId }, this.info)
      purchSpecial(data2)
        .then(res => {
          this.showToast('修改成功')
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
      margin-bottom:15px;
    > div {
      > div:nth-child(2) {
        text-align: right;justify-content: flex-end;
      }
      >div{
          > input {
        text-align: right;
      }

      }

    }
  }
  .bot{
      position:fixed;bottom:0;left:0;right:0;line-height:40px;color:#fff;background: #5496FF;font-size:14px;text-align: center;
  }
}
.flex-wrapper{
    display:flex;justify-content: space-around;flex:1;
    >div{
        >input{
            width:40px;border:1px solid #999;height:20px;line-height:20px;
        }
    }
}
</style>
