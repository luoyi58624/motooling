<!--  -->
<template>
  <div class="wrapper">
    <div class="tab">
      <div class="title">请选择发料类型</div>
      <div class="con">
        <div>对工装退料</div>
        <div>对部门退料</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang='less' scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: #f8f9fd;padding-top:100px;color:#525252;
}
.tab {
  width: 94%;
  margin: 0 auto;
  background: #fff;
  border-radius:6px;
  > .title {
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #f6f6f6;
  }
  > .con {
    > div {
      display: flex;
      height: 30px;
      align-items: center;
      font-size: 16px;
    border-bottom: 1px solid #f6f6f6;
      padding: 15px;
    }
  }
}
</style>
