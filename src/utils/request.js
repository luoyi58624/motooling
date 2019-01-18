import axios from 'axios'
import { encryption, decrypt } from '@/utils/crypt'
import md5 from 'md5'
// encryption
const instance = axios.create({
  // baseURL: process.env.base_API,
  // baseURL: 'http://192.168.2.175',
  // baseURL: 'http://192.168.2.136:8808',
  baseURL: 'http://127.0.0.1:8080',
  // baseURL: 'http://www.motooling.com:8080',
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    // if (store.getter.token) {
    //   config.headers['X-Token'] = getToken()
    // }

    // let data = {
    //   paramsData: encryption(JSON.stringify(req))
    //   // paramsData: 'Nx5UVqdMpzGV3l17eMu178VjO/QQWmGu/UxMdbNTOIMHcbEU9ObuT3RYIKHE9VFnziY9awaxcSDxSDjiRyvKnF0fFvCC/u4KX+ZVLKtQpGAnb1NM2wvOSzZmqig/q6mx2qCOguTP4YDzLCysv9RXMmCZtaJYSJaP86xpLmrosi5gQf4TLxZF9g0ezxzsJDQQ8iiSVBlIXi+lEq/lMZ093eq2mLH367tmgwUpJS7fBLEuh0Q2qVwBjjybjXbrUG+70J5EM8iZUQ/quHwlHYHNXHm7DgH8SEu5OGPqLwuS2PcWNe6H1CRaJuUK5Jqz65KSSMymc9iMNAUllID4lVElTQ=='
    // }

    // const req = {
    //   token: '',
    //   md5: md5String,
    //   timestamp: timestamp,
    //   data: reqdata
    // }
    const token = ''
    const timestamp = '1547621396'
    const md5String = md5(token + timestamp + 'Motooling')
    // const req = {
    //   token: token,
    //   md5: md5String,
    //   timestamp: timestamp,
    //   data: config.data
    // }

    // config.data.token = token
    // config.data.timestamp = timestamp
    // config.data.md5 = md5String
    // const origin =

    console.log(config)
    // config.data={paramsData:encryption(req)}
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
