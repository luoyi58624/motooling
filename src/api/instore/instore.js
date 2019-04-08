import request from '@/utils/newRequest'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const WEBURL = localStorage.getItem('WEBURL') || ''
const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

//console.log(md5String)

export function inStoreList (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/inStoreList',
    method: 'post',
    data
  })
}
export function setUpInfo (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/setUpInfo',
    method: 'post',
    data
  })
}

export function setUpUpdate (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/setUpUpdate',
    method: 'post',
    data
  })
}
