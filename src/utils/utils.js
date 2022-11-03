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
export const WEBURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return localStorage.getItem('WEBURL') || ''
  } else {
    return sessionStorage.getItem('WEBURL') || ''
  }
}

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
export function readFile (accept = '*') {
  return new Promise((resolve) => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = accept
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
  }) // 反转数据
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

// 判断文件是否是office类型
export function isOffice (fileName) {
  const fileSuffix = getFileSuffix(fileName)
  switch (fileSuffix) {
    case 'doc':
    case 'docx':
    case 'xls':
    case 'xlsx':
    case 'ppt':
    case 'pptx':
      return true
    default:
      return false
  }
}

// blob地址转file
export function blobToFile (src) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', src, true)
    xhr.responseType = 'blob'
    xhr.onload = function (e) {
      if (this.status === 200) {
        let myBlob = this.response
        let files = new window.File([myBlob], myBlob.type, { type: myBlob.type }) // myBlob.type 自定义文件名
        resolve(files)
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false)
      }
    }
    xhr.send()
  })
}

/**
 * 获取html里的所有资源路径
 * @param html
 */
export function parseResourceUrl (html) {
  const frag = document.createElement('div')
  frag.innerHTML = html
  return [].map.call(frag.querySelectorAll('img'), function (img) {
    return img.src
  })
  // eslint-disable-next-line no-useless-escape
  // const imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi
  // return html.match(imgReg)
}

export function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

// 填充html字符串空格 '' -> '&nbsp;'
export function fillHtmlBlank (str) {
  const strArr = str.split('')
  for (let i = 0; i < strArr.length; i++) {
    if (!strArr[i].trim()) {
      strArr[i] = '&nbsp;'
    }
  }
  return strArr.join('')
}

// html搜索的字符高亮展示
// str 要传入的字符串  key 代表要高亮的字符串
export const heightLight = (str, key) => {
  const reg = new RegExp(key, 'ig')
  return str.replace(reg, (val) => {
    return `<span style="color:red">${val}</span>`
  })
}

// 获取字符串长度，中文为2，英文为1
export function getStringLength (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}

// 获取中文数量
export function getChinaTextNum (str) {
  let num = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      num++
    }
  }
  return num
}

/**
 * 隐藏过长的文本
 * @param str            字符串
 * @param maxLength      最大文字长度
 * @param mode           从哪个位置隐藏，可选：first、center、last
 */
export function hideLongText (str, maxLength = 16, mode = 'last') {
  const strLength = getStringLength(str)
  const chinaTextNum = getChinaTextNum(str)
  if (chinaTextNum > maxLength / 2) maxLength = Math.floor(maxLength / 3 * 2)
  if (strLength > maxLength) {
    let newStr
    switch (mode) {
      case 'first':
        newStr = '...' + str.slice(str.length - maxLength, str.length)
        break
      case 'center':
        newStr = str.slice(0, Math.floor(maxLength / 2)) + '...' +
          str.slice((str.length - Math.floor(maxLength / 2)), str.length)
        break
      case 'last':
        newStr = str.slice(0, maxLength) + '...'
        break
    }
    return newStr
  } else {
    return str
  }
}

export function renderSize (filesize) {
  if (filesize == null || filesize == '') {
    return '0 Bytes'
  }
  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let index = 0
  const srcsize = parseFloat(filesize)
  index = Math.floor(Math.log(srcsize) / Math.log(1024))
  let size = srcsize / Math.pow(1024, index)
  size = size.toFixed(2)// 保留的小数位数
  return size + unitArr[index]
}

// const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/
// function verifyHttpLink (link) {
//   return reg.test(link)
// }
