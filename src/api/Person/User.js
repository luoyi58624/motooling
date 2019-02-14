import request from '@/utils/request'
import { WEBURL, BASEURL } from '@/utils/utils.js'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const token = localStorage.getItem('token') || ''
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
  console.log(req)
  let data = {
    paramsData: encryption(JSON.stringify(req))
  }
  return request({
    url: WEBURL + '/mtH5/invitationPerson/userInfo',
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
    url: WEBURL + '/mtH5/invitationPerson/addUser',
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
    url: WEBURL + '/mtH5/invitationPerson/userSelectList',
    method: 'post',
    data
  })
}
