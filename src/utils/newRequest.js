import axios from 'axios'
import { decrypt } from '@/utils/crypt'
import router from '../router'
// import md5 from 'md5'
// encryption
const instance = axios.create({
  // baseURL: process.env.base_API,
  // baseURL: 'http://192.168.2.136:8808',
  // baseURL: 'http://www.motooling.com:8080',
  // baseURL:'http://192.168.2.247:8808',
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    // if (store.getter.token) {
    //   config.headers['X-Token'] = getToken()
    // }

    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    response.data.resultData = decrypt(response.data.resultData)
    console.log(response)
    if (response.data.code === '444444' || response.data.code === '666666') {
      router.replace('/login')
      let fullPath = router.currentRoute.fullPath
      console.log(fullPath)
      router.replace('/login?redirectURL=' + encodeURIComponent(fullPath))
    } else if (response.data.code === '000000') {
      console.log(response)
      return response.data.data
    } else {
      // console.error('youdianwenti')
      return Promise.reject(response.data)
    }
  },
  error => {
    console.warn('err: ' + error)
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
