// 字符串转二进制数据
export function strToBinary (str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    result += str[i].charCodeAt().toString(2)
  }
  return result
}
