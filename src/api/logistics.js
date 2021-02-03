import axios from 'axios'
import request from '@/utils/newRequest'

export function pathData () {
  return axios({
    url: 'https://a.amap.com/amap-ui/static/data/big-routes.json'
  })
}

export function transit (truckId) {
  return request({
    url: `http://127.0.0.1:4523/mock/372693/truck/${truckId}`
  })
}

export function arrivalTime () {
  return request({
    url: 'http://127.0.0.1:4523/mock/372693/arrival'
  })
}

export function departureTime () {
  return request({
    url: 'http://127.0.0.1:4523/mock/372693/departure'
  })
}
