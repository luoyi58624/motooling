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
  </div>
</template>

<script>
import { getDeliveryAndReturn } from '@/api/instore/instore'
// import { getJsSDKConfigInfo, getAppid } from '@/api/wechat.js'
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
    // async getwechat () {
    //   const { appId } = await getAppid()
    //   console.log(appId)
    //   let url = location.href.split('#')[0]
    //   // let url = 'http://wechat.motooling.com/mthtml/scan/nav-receive'
    //   const { configInfo } = await getJsSDKConfigInfo({ url })
    //   const config = await Object.assign({}, { appId }, configInfo, {
    //     jsApiList: ['scanQRCode'],
    //     debug: false
    //   })
    //   return config
    // },
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
        fail: function (res) {}
      })
    }
  },
  mounted () {
    this.getwechat().then(config => {
      wx.config(config)
      wx.ready(function () {
        // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
        // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
        // wx.checkJsApi({
        //   // 判断当前客户端版本是否支持指定JS接口
        //   jsApiList: ['scanQRCode'],
        //   success: function (res) {
        //     // 以键值对的形式返回，可用true，不可用false。如：{"checkResult":{"scanQRCode":true},"errMsg":"checkJsApi:ok"}
        //     if (res.checkResult.scanQRCode === true) {
        //       wx.scanQRCode({
        //         // 微信扫一扫接口
        //         desc: 'scanQRCode desc',
        //         needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        //         scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        //         success: function (res) {
        //           const getCode = res.resultStr // 当needResult 为 1 时，扫码返回的结果
        //           alert(getCode)
        //         }
        //       })
        //     } else {
        //       alert('抱歉，当前客户端版本不支持扫一扫')
        //     }
        //   },
        //   fail: function (res) {
        //     // 检测getNetworkType该功能失败时处理
        //     alert('fail' + res)
        //   }
        // })
      })

      /* 处理失败验证 */
      wx.error(function (res) {
        // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
        alert('配置验证失败: ' + res.errMsg)
      })
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
