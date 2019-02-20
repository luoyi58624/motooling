import request from '@/utils/request'
import { WEBURL, BASEURL } from '@/utils/utils.js'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

console.log(md5String)

export function getSupplierInfo (params) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  console.log(data)

  return request({
    url: WEBURL + '/mtH5/invitationSupplier/supplierInfo',
    method: 'post',
    data
  })
}

export function addSupplierInfo (params) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL + '/mtH5/invitationSupplier/supplierSave',
    method: 'post',
    data
  })
}

export function supplierSelectList (params) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL + '/mtH5/invitationSupplier/supplierSelectList',
    method: 'post',
    data
  })
}
