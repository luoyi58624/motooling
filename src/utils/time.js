export function time (record) {
  let recordList = record
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear() + ''
  let _recordList = recordList.map(item => {
    let sendTime = item.data.sendTime
    let sendTimestamp = new Date(sendTime).getTime()
    let leadTime = currentTime.getTime() - sendTimestamp
    if (leadTime < 86400000) {
      item.data.sendTime = sendTime.slice(11, -3)
    } else if (sendTime.slice(0, 4) === currentYear) {
      item.data.sendTime = sendTime.slice(5, -3)
    }
    return item.data
  })
  return _recordList
}
