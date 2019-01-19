import request from '@/utils/request'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
// import { strToBinary } from '@/utils/utils'

const token = 'a04742ac-2307-46b4-8b58-071a93dd28b3'
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

  let data = {
    paramsData: encryption(JSON.stringify(req))
  }

  return request({
    url: '/invitation/pushSMS/phoneCodeSend',
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
