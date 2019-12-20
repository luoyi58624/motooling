import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

// console.log(getMd5String())

export function inStoreList (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/inStoreList',
    method: 'post',
    data
  })
}
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
export function inStoreInfo (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/inStoreInfo',
    method: 'post',
    data
  })
}

export function purchUpdate (params = {}) { // 收货信息修改
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/purchUpdate',
    method: 'post',
    data
  })
}
export function purchSpecial (params = {}) { // 特采
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/purchSpecial',
    method: 'post',
    data
  })
}
export function purchQuality (params = {}) { // 质检
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/purchQuality',
    method: 'post',
    data
  })
}
export function purchBatchReceived (params = {}) { // 采购单收货
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/ivStore/purchBatchReceived',
    method: 'post',
    data
  })
}

export function getStoreHouse (params = {}) { // 仓库
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
export function getStoreRoom (params = {}) { // 库位
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
export function h5FileUpload (params = {}) { // 库位
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/file/h5FileUpload',
    method: 'post',
    data
  })
}
export function depUserList (params = {}) { // 库位
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/department/depUserList',
    method: 'post',
    data
  })
}

export function getNotifyType (params = {}) { // 库位
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

export function purchaseOutStoreSave (params = {}) { // 采购退货
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/purchaseOutStoreSave',
    method: 'post',
    data
  })
}

export function getPurchaseOutStore (params = {}) { // 采购退货详情
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/getPurchaseOutStore',
    method: 'post',
    data
  })
}

export function getPurchaseOutVoucher (params = {}) { // 采购退货供应商及凭证号
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/getPurchaseOutVoucher',
    method: 'post',
    data
  })
}

export function getDeliveryAndReturn (params = {}) { // 获取收退货接口
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mth5/poStore/getDeliveryAndReturn',
    method: 'post',
    data
  })
}
