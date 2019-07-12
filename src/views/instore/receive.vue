<!--  -->
<template>
  <div class="wrapper">
    <div class="bar">采购信息</div>
    <div class="table">
      <div>
        <div>工装号</div>
        <div></div>
      </div>
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
        <div>外协类型</div>
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
        <div>待收数量</div>
        <div>工装号</div>
      </div>
      <div>
        <div>收货数量</div>
        <div><input type="text" placeholder="请填写"></div>
      </div>
      <div>
        <div>收货重量</div>
        <div><input type="text" placeholder="请填写"></div>
      </div>
       <div>
        <div>收货地址</div>
        <div></div>
      </div>
       <div>
        <div>收货仓库</div>
        <div></div>
      </div>
       <div>
        <div>收货储位</div>
        <div></div>
      </div>
       <div>
        <div>收货备注</div>
        <div></div>
      </div>
    </div>
    <div class="bot">
        提交

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
    // getInfo () {
    //   const purchSubId = this.$route.query.purchSubId
    //   console.log(purchSubId)
    //   inStoreInfo({ purchSubId }).then(res => {
    //     console.log(res)
    //     this.info = res.inStoreInfo
    //     this.wordList = res.qualityList
    //     this.pdfList = res.factoryReportList
    //     this.storeHouseId = res.inStoreInfo.storeHouseId
    //     this.storeRoomId = res.inStoreInfo.storeRoomId
    //     console.log(this.storeHouseId, this.storeRoomId)
    //     if (this.storeHouseId) {
    //       getStoreRoom({ storeHouseId: this.storeHouseId }).then(res => {
    //         var romeList = res.storeRoomsConfList
    //         var newRome = romeList.map((item, index) => {
    //           return { text: item.storeRoomName, value: item.id }
    //         })
    //         this.storeRoomList = newRome
    //       })
    //     }
    //   })
    // }
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
    > div {
      > div:nth-child(2) {
        text-align: right;justify-content: flex-end;
      }

      input {
        text-align: right;
      }
    }
  }
  .bot{
      position:fixed;bottom:0;left:0;right:0;line-height:40px;color:#fff;background: #5496FF;font-size:14px;text-align: center;
  }
}
</style>
