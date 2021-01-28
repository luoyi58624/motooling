export function time (record) {
  // let messageTime = record
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()
  const currentMonth = currentTime.getMonth()
  const currentDay = currentTime.getDay()
  let recordTimeList = record.map(item => {
    const sendTime = item.data.sendTime
    let _sendTime = new Date(sendTime)
    const sendTimeYear = _sendTime.getFullYear()
    const sendTimeMonth = _sendTime.getMonth()
    const sendTimeDay = _sendTime.getDay()
    if (sendTimeYear === currentYear) {
      if (sendTimeMonth === currentMonth) {
        // 月相等
        if (sendTimeDay === currentDay) {
          // 日相等
          item.data.sendTime = sendTime.slice(11, -3)
        } else {
          // 日不相等
          if (currentDay - sendTimeDay === 1) {
            item.data.sendTime = '昨天' + sendTime.slice(11, -3)
          } else {
            item.data.sendTime = sendTime.slice(5, -3)
          }
        }
      } else {
        // 月不相等
        item.data.sendTime = sendTime.slice(5, -3)
      }
    } else {
      item.data.sendTime = sendTime.slice(0, -3)
    }
    return item.data
  })
  return recordTimeList
}
