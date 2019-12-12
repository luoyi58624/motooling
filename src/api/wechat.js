import newRequest from '@/utils/newRequest'
import { BASEURL, token } from '@/utils/utils.js'
import md5 from 'md5'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

export function getJsSDKConfigInfo (obj) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return newRequest({
    url: BASEURL() + '/mtH5/wechat/getJsSDKConfigInfo',
    method: 'post',
    data
  })
}
export function getAppid (obj) {
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: obj
  }
  return newRequest({
    url: BASEURL() + '/mtH5/wechat/getAppid',
    method: 'post',
    data
  })
}
