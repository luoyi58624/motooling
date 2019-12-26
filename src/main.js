import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Stepper } from 'vant'
import 'vant/lib/index.css'
import { getJsSDKConfigInfo, getAppid } from '@/api/wechat.js'
import wx from 'weixin-js-sdk'
Vue.use(Stepper)
Vue.config.productionTip = false
var toast
function showToast (val) {
  const toast = this.$createToast({
    type: 'txt',
    txt: val
  })
  toast.show()
}
function showLoading (val) {
  toast = this.$createToast({
    time: 0,
    txt: val || '加载中'
  })
  toast.show()
}
function showDialog (par = {}) {
  this.$createDialog({
    type: 'confirm',

    title: par.title,
    content: par.content,
    confirmBtn: {
      text: '确定',
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    cancelBtn: {
      text: '取消',
      active: false,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm: par.onConfirm,
    onCancel: par.onCancel
  }).show()
}
function hideLoading () {
  if (toast) {
    toast.hide()
  };
}
async function getwechat () {
  const { appId } = await getAppid()
  console.log(appId)
  let url = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl
  const { configInfo } = await getJsSDKConfigInfo({ url })
  const config = await Object.assign({}, { appId }, configInfo, {
    jsApiList: ['scanQRCode', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice'],
    debug: false
  })
  return config
}
getwechat().then(config => {
  wx.config(config)
})

Vue.prototype.getwechat = getwechat
Vue.prototype.showToast = showToast
Vue.prototype.showLoading = showLoading
Vue.prototype.hideLoading = hideLoading
Vue.prototype.showDialog = showDialog

wx.ready(function () {
  wx.onMenuShareAppMessage({
    title: document.title, // 分享标题
    desc: 'This is a test!', // 分享描述
    link: location.href, // 分享链接
    imgUrl: 'http://wechat.motooling.com/mthtml/img/logo.36bf0d3c.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      alert(location.href)
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  })
  wx.onMenuShareTimeline({
    title: document.title, // 分享标题
    link: location.href, // 分享链接
    imgUrl: 'http://wechat.motooling.com/mthtml/img/logo.36bf0d3c.png', // 分享图标图标
    success: function () {
      // 用户确认分享后执行的回调函数
      alert(location.href)
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  })
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
