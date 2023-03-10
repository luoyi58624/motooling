import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear' // 导入插件
import 'dayjs/locale/zh-cn' // 导入本地化语言

dayjs.extend(isLeapYear) // 使用插件
dayjs.locale('zh-cn') // 使用本地化语言

export function formatDate (date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

// 将时间转化为完整的日期时间  HH:mm -> YYYY-MM-DD HH:mm:ss
export function timeToFullTime (time) {
  if (time.length <= 8) {
    return formatDate(formatDate(new Date(), 'YYYY-MM-DD') + ' ' + time)
  } else {
    return time
  }
}

export function time (record) {
  // let messageTime = record
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()
  const currentMonth = currentTime.getMonth()
  const currentDay = currentTime.getDate()
  let recordTimeList = record.map(item => {
    // 懒得做时间转换的处理，直接返回原样时间
    item.data.showSendTime = item.data.sendTime
    const sendTime = item.data.sendTime
    let _sendTime = new Date(sendTime)
    const sendTimeYear = _sendTime.getFullYear()
    const sendTimeMonth = _sendTime.getMonth()
    const sendTimeDay = _sendTime.getDate()
    if (sendTimeYear === currentYear) {
      if (sendTimeMonth === currentMonth) {
        // 月相等
        if (sendTimeDay === currentDay) {
          // 日相等
          item.data.showSendTime = sendTime.slice(11, -3)
        } else {
          // 日不相等
          if (currentDay - sendTimeDay === 1) {
            item.data.showSendTime = '昨天' + sendTime.slice(11, -3)
          } else {
            item.data.showSendTime = sendTime.slice(5, -3)
          }
        }
      } else {
        // 月不相等
        item.data.showSendTime = sendTime.slice(5, -3)
      }
    } else {
      item.data.showSendTime = sendTime.slice(0, -3)
    }
    return item.data
  })
  return recordTimeList
}
