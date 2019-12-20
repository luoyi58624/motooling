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
  console.log('陈盼测试' + sessionStorage.getItem('token'))
  return sessionStorage.getItem('token') || ''
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
