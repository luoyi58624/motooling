import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'

Vue.config.productionTip = false;
function showToast(val) {
  //console.log(1)
  const toast = this.$createToast({
    type: "txt",
    txt: val
  });
  toast.show();
}
Vue.prototype.showToast=showToast
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
