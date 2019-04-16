<!--  -->
<template>
  <div>
    <div>
      <img class="logo" alt="logo" src="../../assets/logo.png">
    </div>
    <div class="input-wrapper">
      <div>
        <span class="iconfont icon-saomiaoerweima"></span>
      </div>
      <input type="text" placeholder="请输入单号">
      <div>
        <span class="iconfont icon-youjiantou"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {}
};
</script>
<style lang='less' scoped>
.logo {
  display: block;
  margin: 0 auto;
}
.input-wrapper {
  width: 300px;
  height: 50px;
  background: #e8ebf2;
  border-radius: 25px;
  margin: 50px auto;
  display: flex;
  align-items: center;
  border-radius: 25px;
  overflow:hidden;
  >div{
      width:50px;display:flex;justify-content: center;align-items: center;
  }
  > input {
      color:#999;font-size:16px;
      padding-left:10px;
    flex: 1;
    height: 50px;
    line-height: 50px;
    color: #999999;
    font-size: 16px;
    background: #e8ebf2;
  }
}
</style>