import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const md5String = md5(token() + timestamp + 'Motooling')

// 图片上传
export function imgUpload (params) {
  let form = new FormData()
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: {}
  }
  form.set('paramsMap', JSON.stringify(data))
  form.append('imgFile', params)
  return request({
    url: WEBURL() + '/img/h5ImgUpload',
    method: 'post',
    data: form,
    timeout: 0
  })
}

// 文件上传
export function fileUpload (params, filename) {
  let form = new FormData()
  const data = {
    token: token(),
    md5: md5String,
    timestamp: timestamp,
    data: {}
  }
  form.set('paramsMap', JSON.stringify(data))
  form.append('enFile', params, filename)
  return request({
    url: WEBURL() + '/file/h5FileUpload',
    method: 'post',
    data: form,
    timeout: 0
  })
}
