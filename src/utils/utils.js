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
