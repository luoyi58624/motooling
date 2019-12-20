import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

export function getSupplierInfo (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationSupplier/supplierInfo',
    method: 'post',
    data
  })
}

export function addSupplierInfo (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationSupplier/supplierSave',
    method: 'post',
    data
  })
}

export function supplierSelectList (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationSupplier/supplierSelectList',
    method: 'post',
    data
  })
}
