import request from '@/utils/newRequest'
import md5 from 'md5'
const timestamp = '1547621396'
const md5_ = md5(timestamp + 'Motooling')
const WEBURL = localStorage.getItem('WEBURL')

export function makingMoldList () {
  return request({
    method: 'post',
    url: `${WEBURL}/mtu3d/getMakingMoldList`,
    data: {
      md5: md5_,
      timestamp
    }
  })
}

export function projectProgress (moldNo) {
  return request({
    method: 'post',
    url: `${WEBURL}/mtu3d/moldPartProgress`,
    data: {
      md5: md5_,
      timestamp,
      data: {
        moldNo
      }
    }
  })
}

export function apifox () {
  return request({
    method: 'get',
    url: 'http://127.0.0.1:4523/mock/372507/pet/1'
  })
}
