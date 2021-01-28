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
  // baseURL:'http://192.168.2.247:8808',
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
    console.log(response)
    response.data.resultData = decrypt(response.data.resultData)
    if (response.data.code === '444444' || response.data.code === '666666') {
      router.replace('/login')
      let fullPath = router.currentRoute.fullPath
      router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else if (response.data.code === '000000') {
      return response.data.data
    } else if (response.status === 200) {
      return response.data
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
    return Promise.reject(error)
  }
)

export default instance
