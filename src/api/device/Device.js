import request from '@/utils/request'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
import { WEBURL, BASEURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

console.log(md5String)

export function deviceSelectList (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationDevice/deviceSelectList',
    method: 'post',
    data
  })
}

export function getDeviceInfo (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationDevice/deviceInfo',
    method: 'post',
    data
  })
}

export function addDeviceInfo (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationDevice/addDevice',
    method: 'post',
    data
  })
}
