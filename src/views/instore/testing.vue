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

    <div class="bar">质检信息</div>
    <div class="table">

      <div>
        <div>结论</div>
        <div></div>
      </div>
      <div>
        <div>明细</div>
        <div>工装号</div>
      </div>
      <div>
        <div>检验模板</div>
        <div>工装号</div>
      </div>
      <div>
        <div>质检报告</div>
        <div>工装号</div>
      </div>
      <div>
        <div>问题描述</div>
        <div>工装号</div>
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
    return {
    }
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
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
