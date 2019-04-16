import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false;
var toast;
function showToast(val) {
  const toast = this.$createToast({
    type: "txt",
    txt: val
  });
  toast.show();
}
function showLoading(val){
   toast = this.$createToast({
    time: 0,
    txt: val||'加载中'
  })
  toast.show()
}
function hideLoading(){
  toast.hide()
}
Vue.prototype.showToast=showToast
Vue.prototype.showLoading=showLoading
Vue.prototype.hideLoading=hideLoading
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
