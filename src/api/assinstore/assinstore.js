import request from '@/utils/request'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')
// 外协收货列表
export function assInStoreList (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assInStoreList',
    method: 'post',
    data
  })
}
// 外协收货信息
export function assInStoreInfo (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assInStoreInfo',
    method: 'post',
    data
  })
}
// 采购收货设置查询
export function setUpInfo (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/setUpInfo',
    method: 'post',
    data
  })
}
// 采购收货设置保存
export function setUpUpdate (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/setUpUpdate',
    method: 'post',
    data
  })
}
// 采购收货信息修改
export function assPurchUpdate (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assPurchUpdate',
    method: 'post',
    data
  })
}
// 外协特采
export function assPurchSpecial (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assPurchSpecial',
    method: 'post',
    data
  })
}
// 外协质检
export function assPurchQuality (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assPurchQuality',
    method: 'post',
    data
  })
}
// 外协收货
export function assPurchBatchReceived (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assPurchBatchReceived',
    method: 'post',
    data
  })
}
// 获取库位

export function getStoreRoom (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/getStoreRoom',
    method: 'post',
    data
  })
}

// 获取仓库
export function getStoreHouse (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/getStoreHouse',
    method: 'post',
    data
  })
}
// 获取通知方式
export function getNotifyType (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/getNotifyType',
    method: 'post',
    data
  })
}
export function getOutsourcingeOutStore (params = {}) { // 外协采购退货详情
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/getOutsourcingeOutStore',
    method: 'post',
    data
  })
}
export function assPurchIsBack (params = {}) { // 外协采购退货
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/assPurchIsBack',
    method: 'post',
    data
  })
}

export function getSupNameAndVoucher (params = {}) { // 外协采购退货
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/getSupNameAndVoucher',
    method: 'post',
    data
  })
}
