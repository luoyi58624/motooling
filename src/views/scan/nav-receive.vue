<!--  -->
<template>
  <div>
    <div class="img-wrapper">
      <img src="../../assets/title.png" alt />
    </div>

    <div class="input-wrapper">
      <div @click="sao" style="margin-left:10px;">
          <img src="../../assets/sao.png" alt />
      </div>
      <input type="text" placeholder="请输入单号" v-model="value" />
      <div @click="save(value)">
        <img src="../../assets/arrow.png" alt />
      </div>

    </div>
    <div @click="start">开始录音</div>
    <div @click="stop">停止录音</div>

  </div>
</template>

<script>
import { getDeliveryAndReturn } from '@/api/instore/instore'
import { getJsSDKConfigInfo, getAppid } from '@/api/wechat.js'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    save (value) {
      if (!value) {
        this.showToast('单号为空')
        return
      }
      this.value = value
      getDeliveryAndReturn({ billNo: value, type: 1 })
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
                no: value
              }
            })
          } else if (res.goodsType === '外协采购') {
            this.$router.push({
              path: '/assinstore/list',
              query: {
                no: value
              }
            })
          } else if (res.goodsType === '生产') {
            this.$router.push({
              path: '/receive',
              query: {
                no: value
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
    },
    async getwechat () {
      const { appId } = await getAppid()
      console.log(appId)
      let url = location.href.split('#')[0]
      // let url = 'http://wechat.motooling.com/mthtml/scan/nav-receive'
      const { configInfo } = await getJsSDKConfigInfo({ url })
      const config = await Object.assign({}, { appId }, configInfo, {
        jsApiList: ['scanQRCode', 'stopRecord', 'startRecord'],
        debug: true
      })
      return config
    },
    sao () {
      const vm = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          console.log(result)
          vm.save(result)
        },
        fail: function (res) {
        }
      })
    },
    start () {
      wx.startRecord()
    },
    stop () {
      wx.stopRecord({
        success: function (res) {
          var localId = res.localId
          alert(localId)
        }
      })
    }
  },
  created () {
    this.getwechat().then(config => {
      wx.config(config)
    })
  }
}
</script>
<style lang="less" scoped>
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
  align-items: center;
  line-height: 40px;
  font-size: 12px;
  border-radius: 20px;
  margin-top: 40px;
  overflow: hidden;
  > input {
    flex: 1;
    background: #e7ebf2;
    padding-left: 5px;
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
