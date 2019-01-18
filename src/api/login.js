import request from '@/utils/request'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
// import { strToBinary } from '@/utils/utils'
// decrypt
export function getPhoneCode (mobile, type = 1) {
  console.log('aaasss')
  const reqdata = {
    mobile: '18565705036',
    type: 1
  }

  const token = 'a04742ac-2307-46b4-8b58-071a93dd28b3'
  const timestamp = '1547621396'
  const md5String = md5(token + timestamp + 'Motooling')
  // ----测试结束

  console.log(md5String)

  const req = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: reqdata
  }

  let data = {
    paramsData: encryption(JSON.stringify(req))
  //   // paramsData: 'Nx5UVqdMpzGV3l17eMu178VjO/QQWmGu/UxMdbNTOIMHcbEU9ObuT3RYIKHE9VFnziY9awaxcSDxSDjiRyvKnF0fFvCC/u4KX+ZVLKtQpGAnb1NM2wvOSzZmqig/q6mx2qCOguTP4YDzLCysv9RXMmCZtaJYSJaP86xpLmrosi5gQf4TLxZF9g0ezxzsJDQQ8iiSVBlIXi+lEq/lMZ093eq2mLH367tmgwUpJS7fBLEuh0Q2qVwBjjybjXbrUG+70J5EM8iZUQ/quHwlHYHNXHm7DgH8SEu5OGPqLwuS2PcWNe6H1CRaJuUK5Jqz65KSSMymc9iMNAUllID4lVElTQ=='
  }

  console.log('req', req)
  console.log('data', data)
  return request({
    url: '/invitation/pushSMS/phoneCodeSend',
    method: 'post',
    data
  })
}

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
