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
export function voucherNoList (obj = {}) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/depReturnMat/voucherNoList',
    method: 'post',
    data
  })
}
export function deptReturnMatList (obj = {}) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/voucher/deptReturnMatList',
    method: 'post',
    data
  })
}

export function deptReturnMat (obj = {}) { // 对部门退料
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/store/deptReturnMat',
    method: 'post',
    data
  })
}

export function matTypeList (obj = {}) { // 获取物料类型列表
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/matTypeList',
    method: 'post',
    data
  })
}
export function deptApplyMat (obj = {}) { // 对部门发料
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/iv/deptApplyMat',
    method: 'post',
    data
  })
}
