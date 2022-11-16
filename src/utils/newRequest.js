import axios from 'axios'
import { decrypt } from '@/utils/crypt'
import router from '../router'
import Vue from 'vue'

const Cancel = axios.CancelToken
let httpPending = []
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
    // 如果data设置了noRepeat，则下一次发送请求会中止上一次未完成请求的请求
    if(config.data.noRepeat){
      removeHttpPending(config)
      config.cancelToken = new Cancel(c => {
        httpPending.push({ u: config.url + '&' + config.method, f: c })
      })
    }
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
    } else if (response.data.code === '000000') {
      return response.data.data
    } else if (response.data.code === '555555' || response.data.code === '999999') {
      return Promise.reject(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    console.warn('err: ' + error)
    const vm = new Vue()
    if(Array.isArray(error.message)){
      if (error.message.includes('timeout')) {
        vm.showToast('接口请求超时')
      } else {
        vm.showToast(error.message)
      }
    }
    return Promise.reject(error)
  }
)

function removeHttpPending(config) {
  httpPending.map((item, index, arr) => {
    if (item.u === config.url + '&' + config.method) {
      item.f()
      arr.splice(index, 1)
    }
    return config
  })
}

export default instance
