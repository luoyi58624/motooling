<!--  -->
<template>
  <div>
    <div class="img-wrapper">
        <img src="../../assets/title.png" alt="">
    </div>

    <div class="input-wrapper">
      <input type="text" placeholder="请输入单号" v-model="value" />
      <div @click="save">
           <img src="../../assets/arrow.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'PO19050003'
    }
  },
  methods: {
    save () {
      if (!this.value) {
        this.showToast('单号不能为空')
        return
      }
      this.$router.push({
        path: '/delivery',
        query: {
          no: this.value
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.img-wrapper{
    text-align:center;margin-top:20px;
    >img{
        width:200px;
    }
}
.input-wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  background: #e7ebf2;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  border-radius: 20px;
  margin-top:40px;
  overflow: hidden;
  > input {
    flex: 1;
    background: #e7ebf2;padding-left:20px;line-height: 40px;
  }
  >div{
      width:40px;height:40px;text-align:center;line-height:40px;
      >img{
          width:20px;height:20px;vertical-align: middle;
      }
  }
}
</style>
