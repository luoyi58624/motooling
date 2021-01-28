import axios from 'axios'
import request from '@/utils/newRequest'

export function pathData () {
  return axios({
    url: 'https://a.amap.com/amap-ui/static/data/big-routes.json'
  })
}

export function transit (truckId) {
  return request({
    url: `http://192.168.2.133:4523/mock/372693/truck/${truckId}`
  })
}
