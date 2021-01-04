import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Stepper } from 'vant'
import element from './element'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import { getJsSDKConfigInfo, getAppid } from '@/api/wechat.js'
import wx from 'weixin-js-sdk'
Vue.use(Stepper)
Vue.use(element)
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
    jsApiList: ['scanQRCode', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'uploadVoice', 'updateAppMessageShareData', 'updateTimelineShareData'],
    debug: false
  })
  return config
}

Vue.prototype.showToast = showToast
Vue.prototype.showLoading = showLoading
Vue.prototype.hideLoading = hideLoading
Vue.prototype.showDialog = showDialog

if (/MicroMessenger/.test(window.navigator.userAgent)) {
  getwechat().then(config => {
    wx.config(config)
  })
  Vue.prototype.getwechat = getwechat
  wx.ready(function () {
    wx.updateAppMessageShareData({
      title: document.title, // 分享标题
      desc: 'motooling-智造未来', // 分享描述
      link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://wechat.motooling.com/mthtml/img/logo.36bf0d3c.png', // 分享图标
      success: function () {
      // 设置成功
      }
    })
    wx.updateTimelineShareData({
      title: document.title, // 分享标题
      desc: 'motooling-智造未来', // 分享描述
      link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://wechat.motooling.com/mthtml/img/logo.36bf0d3c.png', // 分享图标
      success: function () {
      // 设置成功
      }
    })
  })
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
