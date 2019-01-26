import request from '@/utils/request'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const token = ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

console.log(md5String)

export function getUser (params) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  let data = {
    paramsData: encryption(JSON.stringify(req))
  }
  return request({
    url: '/invitation/person/validatePhone',
    method: 'post',
    data
  })
}

export function addUser (params) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  let data = {
    paramsData: encryption(JSON.stringify(req))
  }
  return request({
    url: '/invitation/person/addUser',
    method: 'post',
    data
  })
}

export function userSelectList (params) {
  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  let data = {
    paramsData: encryption(JSON.stringify(req))
  }
  return request({
    url: '/invitation/person/userSelectList',
    method: 'post',
    data
  })
}
