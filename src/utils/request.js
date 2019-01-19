import axios from 'axios'
import { decrypt } from '@/utils/crypt'
// import md5 from 'md5'
// encryption
const instance = axios.create({
  // baseURL: process.env.base_API,
  // baseURL: 'http://192.168.2.136:8808',
  baseURL: 'http://127.0.0.1:8080',
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
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    console.log(response)
    response.data.resultData = decrypt(response.data.resultData)
    console.log(response)
    return (response)
  },
  error => {
    console.log('err' + error)
    // this.toast = this.$createToast({
    //   txt: 'Plain txt',
    //   type: 'txt'
    // })
    // this.toast.show()
  }
)

export default instance
