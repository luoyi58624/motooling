import request from '@/utils/request'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
// import { strToBinary } from '@/utils/utils'

const token = ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

console.log(md5String)

export function getPhoneCode (mobile, type = 1) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: {
      mobile: mobile,
      type: type
    }
  }
  console.log(JSON.stringify(req))

  let data = {
    paramsData: encryption(JSON.stringify(req))
  }

  return request({
    url: '/mtH5/pushSMS/phoneCodeSend',
    method: 'post',
    data
  })
}

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function postWxCode (param) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: param
  }
  console.log(req)
  let data = {
    paramsData: encryption(JSON.stringify(req))
  }

  return request({
    url: 'http://192.168.2.121:8809/mtH5/wechat/access',
    method: 'post',
    data
  })
}

export function wxBindPhone (param) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: param
  }
  console.log(req)

  let data = {
    paramsData: encryption(JSON.stringify(req))
  }

  return request({
    url: '/mtH5/wechat/bindPhone',
    method: 'post',
    data
  })
}
