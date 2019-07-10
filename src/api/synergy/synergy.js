import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

export function getOpenSynergy (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/openSynergy',
    method: 'post',
    data
  })
}

export function synergyRecordPage (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/recordPage',
    method: 'post',
    data
  })
}

export function synergyAddMember (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/addMember',
    method: 'post',
    data
  })
}

// 获取群成员接口
export function synergyGroupMember (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/synergyGroupMember',
    method: 'post',
    data
  })
}

// 设置已读接口
export function synergySetUpRead (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/setUpRead',
    method: 'post',
    data
  })
}

// 生成纪要获取信息接口
export function getGenerateSummaryInfo (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getGenerateSummaryInfo',
    method: 'post',
    data
  })
}

// 生成纪要
export function generateSummary (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/generateSummary',
    method: 'post',
    data
  })
}

// 获取纪要信息
export function getSummaryInfo (params) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getSummaryInfo',
    method: 'post',
    data
  })
}
