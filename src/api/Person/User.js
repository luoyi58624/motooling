import request from '@/utils/request'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

export function getUser (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationPerson/userInfo',
    method: 'post',
    data
  })
}

export function addUser (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationPerson/addUser',
    method: 'post',
    data
  })
}

export function userSelectList (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/invitationPerson/userSelectList',
    method: 'post',
    data
  })
}
