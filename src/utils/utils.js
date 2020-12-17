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
export const WEBURL = () => localStorage.getItem('WEBURL') || ''

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
