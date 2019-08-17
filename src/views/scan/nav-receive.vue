<!--  -->
<template>
  <div>
    <div class="img-wrapper">
      <img src="../../assets/title.png" alt />
    </div>

    <div class="input-wrapper">
      <input type="text" placeholder="请输入单号" v-model="value" />
      <div @click="save">
        <img src="../../assets/arrow.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import { getDeliveryAndReturn } from '@/api/instore/instore'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    save () {
      if (!this.value) {
        this.showToast('单号不能为空')
        return
      }
      getDeliveryAndReturn({ billNo: this.value, type: 1 })
        .then(res => {
          console.log(res)
          if (!res) {
            this.showToast('单号错误')
            return
          }
          if (res.goodsType === '采购') {
            this.$router.push({
              path: '/instore/list',
              query: {
                no: this.value
              }
            })
          } else if (res.goodsType === '外协采购') {
            this.$router.push({
              path: '/assinstore/list',
              query: {
                no: this.value
              }
            })
          } else if (res.goodsType === '生产') {
            this.$router.push({
              path: '/receive',
              query: {
                no: this.value
              }
            })
          } else {
            this.showToast('该单号错误')
          }
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
.img-wrapper {
  text-align: center;
  margin-top: 20px;
  > img {
    width: 200px;
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
  margin-top: 40px;
  overflow: hidden;
  > input {
    flex: 1;
    background: #e7ebf2;
    padding-left: 20px;
    line-height: 40px;
  }
  > div {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    > img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
}
</style>
