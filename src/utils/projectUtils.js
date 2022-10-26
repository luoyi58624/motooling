// 项目私有函数
import eventBus from '@/utils/mitt'
import { fileUpload, imgUpload } from '@/api/upload/upload'

export function execUploadFile (file) {
  if (/image/.test(file.type)) {
    imgUpload(file).then((res) => {
      let params = { contentType: 2, smallImg: res.imgUrl, content: res.rawUrl }
      eventBus.emit('handleMessage', params)
    })
  } else if (/audio/.test(file.type)) {
    fileUpload(file).then((res) => {
      let params = { contentType: 3, smallImg: '', content: res.url }
      eventBus.emit('handleMessage', params)
    })
  } else if (/video/.test(file.type)) {
    fileUpload(file).then((res) => {
      let params = { contentType: 4, smallImg: '', content: res.url }
      eventBus.emit('handleMessage', params)
    })
  } else {
    fileUpload(file).then((res) => {
      delete res.url
      let params = { contentType: 9, smallImg: '', content: res }
      eventBus.emit('handleMessage', params)
    })
  }
}
