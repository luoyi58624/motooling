import request from '@/utils/newRequest'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
const WEBURL = localStorage.getItem('WEBURL') || ''
const token = localStorage.getItem('token') || ''
const timestamp = '1547621396'
const md5String = md5(token + timestamp + 'Motooling')

//console.log(md5String)

export function getPmPgList (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/worktime/getPmPgList',
    method: 'post',
    data
  })
}
export function getSettingList (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/getParamList',
    method: 'post',
    data
  })
}
export function getDeviceAndStatus (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/worktime/getDeviceAndStatus',
    method: 'post',
    data
  })
}
export function getProcessTask (params={}) {
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/worktime/getProcessTask',
    method: 'post',
    data
  })
}
export function setStartProcessTask (params={}) {//开始加工某种任务
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/worktime/setStartProcessTask',
    method: 'post',
    data
  })
}
export function allocateProcessTask (params={}) {//组长分配待加工任务
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/allocateProcessTask',
    method: 'post',
    data
  })
}
export function setTaskTurnover (params={}) {//设置工件交接
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setTaskTurnover',
    method: 'post',
    data
  })
}
export function setTaskFinished (params={}) {//设置工件完工
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setTaskFinished',
    method: 'post',
    data
  })
}

export function setTaskPrediction (params={}) {//预报加工时间
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setTaskPrediction',
    method: 'post',
    data
  })
}

export function setWaitProcessTaskTop (params={}) {//设置待加工任务置顶
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm//mtH5/pm/worktime/setWaitProcessTaskTop',
    method: 'post',
    data
  })
}

export function getPartList (params={}) {//获取接收转出工件列表
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/worktime/getPartList',
    method: 'post',
    data
  })
}
export function setPartReceive (params={}) {//接收
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setPartReceive',
    method: 'post',
    data
  })
}
export function setPartFlowOut (params={}) {//转出
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setPartFlowOut',
    method: 'post',
    data
  })
}
export function setPartReprocess (params={}) {//返工
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/setPartReprocess',
    method: 'post',
    data
  })
}
export function getPartProcessLog (params={}) {//查询日志
  const data = {
    token: token,
    md5: md5String,
    timestamp: timestamp,
    data: params
  }
  return request({
    url: WEBURL + '/mtH5/pm/worktime/getPartProcessLog',
    method: 'post',
    data
  })
}