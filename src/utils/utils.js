// import { Notify } from 'vant'

// 字符串转二进制数据
export function strToBinary (str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += str[i].charCodeAt().toString(2)
  }
  return result
}

// 获取URL中查询参数
export function getUrlQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

// 获取字符串中查询参数
export function getStringQueryString (str, query) {
  var reg = new RegExp('(^|&)' + query + '=([^&]*)(&|$)', 'i')
  var r = str.substr(str.indexOf('?') + 1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

// 获取URL中查询参数
// export const WEBURL = () => localStorage.getItem('WEBURL') || ''
export const WEBURL = () => sessionStorage.getItem('WEBURL') || ''

export const BASEURL = () => localStorage.getItem('WEBURL') || ''

export const fileServerUrl = () => localStorage.getItem('fileServerUrl') || ''

export const token = () => {
  const token = sessionStorage.getItem('token')
  return token || ''
}

export const username = () => localStorage.getItem('username') || ''

export function fileAddressFormat (url) {
  if (!url) {
    return ''
  } else if (url.indexOf('http') === 0) {
    return url
  } else if (url.indexOf('http') !== 0) {
    return fileServerUrl() + url
  }
}

// 获取 URL 中除域名之外，后半部分
export function urlToPath (url) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (url.indexOf('/', 8) !== -1) {
      return url.slice(url.indexOf('/', 8))
    } else {
      return url
    }
  } else {
    return url
  }
}

// 聊天界面消息发送的时间处理
export function time (time) {
  const currentYear = new Date().getFullYear()
  const re = new RegExp(currentYear)
  let processedTime
  if (re.test(time)) {
    processedTime = time.splice(5, -3)
    return processedTime
  }
}

// 读取文件
export function readFile () {
  return new Promise((resolve) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '*'
    fileInput.onchange = function (e) {
      resolve(this.files)
    }
    fileInput.click()
  })
}

export function getFileSuffix (fileName) {
  let fileSuffix = ''
  if (fileName == null || fileName === '') return fileSuffix
  const files = fileName.split('.')
  if (files.length > 1) fileSuffix = files[files.length - 1]
  return fileSuffix
}

export function requestNotification () {
  Notification.requestPermission().then(function (result) {
    if (result === 'denied') {
      // Notify({
      //   message: '您拒绝显示通知，IM消息将没有提示',
      //   duration: 5000
      // })
    }
  })
}

// 聊天数据处理
export function chatDataHandler (datas) {
  return datas.map(item => {
    // 如果数据类型是拍一拍、文件，则需要转换json字符串
    if (item.data.contentType === 7 || item.data.contentType === 9) {
      // 测试时插了几条脏数据，纯字符串转对象会报错
      try {
        item.data.content = JSON.parse(item.data.content)
      } catch (e) {
      }
    }
    return item.data
  }).reverse() // 反转数据
}

export function loadFileIcon (fileName) {
  const fileSuffix = getFileSuffix(fileName)
  switch (fileSuffix) {
    case 'exe':
      return require('@/assets/file-icon/exe.png')
    case 'doc':
    case 'docx':
      return require('@/assets/file-icon/word.png')
    case 'xls':
    case 'xlsx':
      return require('@/assets/file-icon/excel.png')
    case 'ppt':
    case 'pptx':
      return require('@/assets/file-icon/ppt.png')
    case 'pdf':
      return require('@/assets/file-icon/pdf.png')
    case 'apk':
      return require('@/assets/file-icon/android.png')
    case 'zip':
    case 'rar':
      return require('@/assets/file-icon/compress.png')
    case 'txt':
      return require('@/assets/file-icon/txt.png')
    default:
      return require('@/assets/file-icon/other.png')
  }
}
