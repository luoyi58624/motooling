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
