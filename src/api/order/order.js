import request from '@/utils/newRequest'
import md5 from 'md5'
const WEBURL = localStorage.getItem('WEBURL') || ''
const token = sessionStorage.getItem('token') || ''
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

// console.log(getMd5String())

export function getpmPoInStore (params = {}) {
  const data = {
    token: token,
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/getpmPoInStoreById',
    method: 'post',
    data
  })
}

export function inStoreSave (params = {}) {
  const data = {
    token: token,
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/inStoreSave',
    method: 'post',
    data
  })
}
export function getpmPoOutStoreById (params = {}) {
  const data = {
    token: token,
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/getpmPoOutStoreById',
    method: 'post',
    data
  })
}

export function outStoreSave (params = {}) {
  const data = {
    token: token,
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/ivStore/outStoreSave',
    method: 'post',
    data
  })
}
