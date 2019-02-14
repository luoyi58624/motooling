import request from '@/utils/request'
import { WEBURL, BASEURL } from '@/utils/utils.js'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

console.log(md5String)

export function addDevice (params) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/invitationDevice/deviceSelectList',
    method: 'post',
    data
  })
}

export function deviceSelectList (params) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL + '/mtH5/invitationDevice/deviceSelectList',
    method: 'post',
    data
  })
}
