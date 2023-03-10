import request from '@/utils/request'
import { BASEURL, token } from '@/utils/utils.js'
import md5 from 'md5'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

export function getPhoneCode (mobile, type = 1) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: {
      mobile: mobile,
      type: type
    }
  }
  return request({
    url: BASEURL() + '/mtH5/pushSMS/phoneCodeSend',
    method: 'post',
    data
  })
}

export function postWxCode (param) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: param
  }
  return request({
    url: BASEURL() + '/mtH5/wechat/access',
    method: 'post',
    data
  })
}

export function wxBindPhone (param) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: param
  }

  return request({
    url: BASEURL() + '/mtH5/wechat/bindPhone',
    method: 'post',
    data
  })
}

export function accountPasswordLogin (data) {
  const _data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data
  }

  return request({
    url: BASEURL() + '/mtH5/user/accountPasswordLogin',
    method: 'post',
    data: _data
  })
}
