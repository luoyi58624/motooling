import request from '@/utils/newRequest'
import md5 from 'md5'
import { WEBURL, token } from '@/utils/utils.js'

const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')

export function getOpenSynergy (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/openSynergy',
    method: 'post',
    data
  })
}

// 群聊分页记录
export function synergyRecordPage (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/recordPage',
    method: 'post',
    data
  })
}

export function at ({ groupId, imUrl, uList }) {
  return request({
    url: WEBURL() + '/mtH5/synergy/pushMessage',
    method: 'post',
    data: {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: {
        groupId,
        webUrl: WEBURL(),
        imUrl,
        uList
      }
    }
  })
}

export function synergyAddMember (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/addMember',
    method: 'post',
    data
  })
}

// 获取群成员接口
export function synergyGroupMember (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/synergyGroupMember',
    method: 'post',
    data
  })
}

// 删除群成员
export function deleteGroupMember (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/synergy/delGroupMember',
    method: 'post',
    data
  })
}

// 生成纪要获取信息接口
export function generateSummaryInfo (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getGenerateSummaryInfo',
    method: 'post',
    data
  })
}

// 生成纪要
export function generateSummary (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/generateSummary',
    method: 'post',
    data
  })
}

// 获取纪要信息
export function getSummaryInfo (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getSummaryInfo',
    method: 'post',
    data
  })
}

// 获取纪要列表
export function getSummaryList (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getSummaryList',
    method: 'post',
    data
  })
}

export function getNotReadCount (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/getNotReadCount',
    method: 'post',
    data
  })
}

// 获取消息列表接口
export function getNewsList (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/newsList',
    method: 'post',
    data
  })
}

// 退出群
export function signOutGroup (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/signOutGroup',
    method: 'post',
    data
  })
}

// 清楚聊天记录
export function clearChatRecords (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/cleanGroupRecord',
    method: 'post',
    data
  })
}

// 清楚聊天记录
export function updateGroupInfo (params = {}) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }

  return request({
    url: WEBURL() + '/mtH5/synergy/updateGroupInfo',
    method: 'post',
    data
  })
}

// 设置已读
export function alreadyRead (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/synergy/setUpRead',
    method: 'post',
    data
  })
}

// 发送消息
export function sendMessage (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/synergy/pushRecord',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo () {
  return request({
    url: WEBURL() + '/mtH5/user/getUserLoginInfo',
    method: 'post',
    data: {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: {}
    }
  })
}

// 获取群聊成员最新已读信息接口
export function getGroupMemberNewRecord (params) {
  const data = {
    token: token(),
    md5: getMd5String(),
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL() + '/mtH5/synergy/getGroupMemberNewRecord',
    method: 'post',
    data
  })
}
