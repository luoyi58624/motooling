import request from '@/utils/request'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

console.log(getMd5String())

export function deviceSelectList (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
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
    md5: getMd5String(),
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
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationDevice/addDevice',
    method: 'post',
    data
  })
}

export function whetherVersion (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationDevice/whetherVersion',
    method: 'post',
    data
  })
}
