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

export function moldNoList (obj = {}) { // 获取工装号列表
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/moldNoList',
    method: 'post',
    data
  })
}
export function inStorePOTooling (obj = {}) { // 根据工装号列表查询工装发料信息
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/inStorePOTooling',
    method: 'post',
    data
  })
}
export function toolingInStoreSave (obj = {}) { // 对工装发料
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/toolingInStoreSave',
    method: 'post',
    data
  })
}
export function outStorePOTooling (obj = {}) { // 根据工装号查询退料详情接口
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/outStorePOTooling',
    method: 'post',
    data
  })
}
export function moldNoOutList (obj = {}) { // 查询可退料工装列表
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/moldNoOutList',
    method: 'post',
    data
  })
}

export function toolingOutStoreSave (obj = {}) { // 对工装退料
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return request({
    url: BASEURL() + '/mth5/poStore/toolingOutStoreSave',
    method: 'post',
    data
  })
}
