import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

export function getStockList (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/queryIvStoreCheckBillList',
    method: 'post',
    data
  })
}

export function queryInventoryCheck (params = {}) { // 盘点统计
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/queryInventoryCheck',
    method: 'post',
    data
  })
}

export function queryCheckProfitLoss (params = {}) { // 盘盈盘亏
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/queryCheckProfitLoss',
    method: 'post',
    data
  })
}

export function getInventoryStatus (params = {}) { // 扫码待盘已盘
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/getInventoryStatus',
    method: 'post',
    data
  })
}

export function queryStoreHouseTypeList (params = {}) { // 获取仓库类型和物料类型
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/queryStoreHouseTypeList',
    method: 'post',
    data
  })
}

export function getApproveStep (params = {}) { // 获取仓库类型和物料类型
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/getApproveStep',
    method: 'post',
    data
  })
}

export function getStoreCheckById (params = {}) { // 获取仓库类型和物料类型
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/getStoreCheckById',
    method: 'post',
    data
  })
}
export function saveIvStoreCheckBill (params = {}) { // 获取仓库类型和物料类型
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/iv/saveIvStoreCheckBill',
    method: 'post',
    data
  })
}
