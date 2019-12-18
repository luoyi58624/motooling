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
  // let url = location.href.split('#')[0]
  // let url = 'http://wechat.motooling.com/mthtml/scan/nav-receive'
  // const url = store.getters['getWechatSignUrl']
  let url = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl
  const { configInfo } = await getJsSDKConfigInfo({ url })
  const config = await Object.assign({}, { appId }, configInfo, {
    jsApiList: ['scanQRCode', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice'],
    debug: true
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
