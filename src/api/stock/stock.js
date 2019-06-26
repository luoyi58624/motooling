import request from '@/utils/newRequest'
import { encryption } from '@/utils/crypt'
import md5 from 'md5'
import { WEBURL, BASEURL, token } from '@/utils/utils.js'
const timestamp = '1547621396'
const getMd5String = () => md5(token() + timestamp + 'Motooling')


export function getStockList (params = {}) {
    const data = {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: params
    }
    return request({
      url: WEBURL() + '/mtH5/iv/queryIvStoreCheckBillList',
      method: 'post',
      data
    })
  }

  export function queryInventoryCheck (params = {}) {//盘点统计
    const data = {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: params
    }
    return request({
      url: WEBURL() + '/iv/queryInventoryCheck',
      method: 'post',
      data
    })
  }

  export function queryCheckProfitLoss (params = {}) {//盘盈盘亏
    const data = {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: params
    }
    return request({
      url: WEBURL() + '/iv/queryCheckProfitLoss',
      method: 'post',
      data
    })
  }

  export function getInventoryStatus (params = {}) {//扫码待盘已盘
    const data = {
      token: token(),
      md5: getMd5String(),
      timestamp: timestamp,
      data: params
    }
    return request({
      url: WEBURL() + '/iv/getInventoryStatus',
      method: 'post',
      data
    })
  }



  