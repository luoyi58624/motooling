import request from '@/utils/request'
import { BASEURL, token } from '@/utils/utils.js'
import md5 from 'md5'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

console.log(md5String)

export function getPhoneCode (mobile, type = 1) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: {
      mobile: mobile,
      type: type
    }
  }
  console.log(JSON.stringify(data))
  return request({
    url: BASEURL() + '/mtH5/pushSMS/phoneCodeSend',
    method: 'post',
    data
  })
}

export function postWxCode (param) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: param
  }
  console.log(data)
  return request({
    url: BASEURL() + '/mtH5/wechat/access',
    method: 'post',
    data
  })
}

export function wxBindPhone (param) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: param
  }
  console.log(data)

  return request({
    url: BASEURL() + '/mtH5/wechat/bindPhone',
    method: 'post',
    data
  })
}
