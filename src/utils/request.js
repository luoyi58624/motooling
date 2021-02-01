import axios from 'axios'
import { decrypt } from '@/utils/crypt'
import router from '../router'
import Vue from 'vue'
// import md5 from 'md5'
// encryption
const instance = axios.create({
  // baseURL: process.env.base_API,
  // baseURL: 'http://192.168.2.136:8808',
  // baseURL: 'http://www.motooling.com:8080',
  timeout: 10000
})

instance.interceptors.request.use(
  config => {
    // if (store.getter.token) {
    //   config.headers['X-Token'] = getToken()
    // }

    return config
  }, error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    response.data.resultData = decrypt(response.data.resultData)
    if (response.data.code === '444444' || response.data.code === '666666') {
      router.replace('/login')
      let fullPath = router.currentRoute.fullPath
      router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else if (response.data.code === '555555') {
      return Promise.reject(response)
    } else if (response.status === 200 || response.data.code === '000000') {
      return response
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    console.warn('err: ' + error)
    const vm = new Vue()
    if (error.message.includes('timeout')) {
      vm.showToast('接口请求超时')
    } else {
      vm.showToast(error.message)
    }
    // console.log('this', this)
    // this.toast = this.$createToast({
    //   txt: 'Plain txt',
    //   type: 'txt'
    // })
    // this.toast.show()
    return Promise.reject(error)
  }
)

export default instance
