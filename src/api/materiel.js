import request from '@/utils/newRequest'
import { BASEURL, token } from '@/utils/utils.js'
import md5 from 'md5'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

export function depUserList (obj = {}) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mtH5/department/depUserList',
    method: 'post',
    data
  })
}

export function matList (obj = {}) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/store/matList',
    method: 'post',
    data
  })
}
