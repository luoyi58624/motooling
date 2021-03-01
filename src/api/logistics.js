import axios from 'axios'

export function pathData () {
  return axios({
    url: 'https://a.amap.com/amap-ui/static/data/big-routes.json'
  })
}

class Logistics {
  constructor (truckId) {
    this.truckId = truckId
    this.truckInfo = null
    this.goods = []
  }

  carCargo () {
    const id = this.truckId
    let truckInfo = null
    if (id === 1) {
      truckInfo = {
        'id': 1,
        'driver': '老李',
        'sex': '男',
        'age': '40',
        'drivingYears': '7年',
        'carNum': '京A09828',
        'type': '特斯拉',
        'spec': '19*4*6',
        'licenseType': 'A',
        'tel': '18108925355',
        'volume': 30,
        'load': 60,
        'truckingCom': '京东物流车队',
        'startPosition': '北京市雨花仓',
        'destination': '福建省福州市转运中心',
        'currentPosition': '浙江省杭州市',
        'arriveTime': '距离目的地还有689KM,预计到达时间2月3日13:45'
      }
    } else {
      truckInfo = {
        'id': 2,
        'driver': '大威',
        'sex': '男',
        'age': '30',
        'drivingYears': '1年',
        'carNum': '豫A09828',
        'type': '大货车',
        'spec': '19*4*6',
        'licenseType': 'A',
        'tel': '18654692314',
        'volume': 30,
        'load': 30,
        'truckingCom': '威海车队',
        'startPosition': '北京市雨花仓',
        'destination': '广东省深圳市福田转运中心',
        'currentPosition': '河南省开封市南环大道',
        'arriveTime': '距离目的地还有689KM,预计到达时间2月3日13:45'
      }
    }
    return truckInfo
  }

  arrive () {
    return [
      {
        'license': '赣A847L09',
        'start': '香港特别行政区 香港岛',
        'current': '湖北省 随州市',
        'distance': '190KM',
        'time': '1988-07-27 16:45:47'
      },
      {
        'license': '豫H90J87',
        'start': '青海省 海南藏族自治州',
        'current': '新疆维吾尔自治区 吐鲁番地区',
        'distance': '123KM',
        'time': '2013-08-16 20:39:13'
      },
      {
        'license': '豫H90J87',
        'start': '甘肃省 天水市',
        'current': '安徽省 宿州市',
        'distance': '190KM',
        'time': '1987-06-29 02:58:53'
      },
      {
        'license': '粤D27H89',
        'start': '贵州省 铜仁市',
        'current': '海外 海外',
        'distance': '123KM',
        'time': '1995-09-26 00:24:02'
      },
      {
        'license': '赣A847L09',
        'start': '澳门特别行政区 澳门半岛',
        'current': '广东省 中山市',
        'distance': '190KM',
        'time': '2001-01-05 12:03:54'
      },
      {
        'license': '皖B90K87',
        'start': '宁夏回族自治区 石嘴山市',
        'current': '贵州省 遵义市',
        'distance': '175KM',
        'time': '1991-11-21 12:18:15'
      },
      {
        'license': '粤S89D90',
        'start': '西藏自治区 阿里地区',
        'current': '陕西省 延安市',
        'distance': '175KM',
        'time': '1972-09-12 01:53:02'
      },
      {
        'license': '豫B90K78',
        'start': '天津 天津市',
        'current': '吉林省 白山市',
        'distance': '175KM',
        'time': '1990-08-05 18:29:01'
      }
    ]
  }

  departureTime () {
    return [
      {
        'license': '豫H90J87',
        'destination': '四川省 内江市',
        'distance': '309KM',
        'departureTime': '2019-06-11 17:56:44',
        'arrivalTime': '1975-09-05 00:49:50'
      },
      {
        'license': '赣A847L09',
        'destination': '重庆 重庆市',
        'distance': '190KM',
        'departureTime': '1988-02-22 10:35:23',
        'arrivalTime': '2008-11-17 17:59:47'
      },
      {
        'license': '粤B23J99',
        'destination': '辽宁省 营口市',
        'distance': '309KM',
        'departureTime': '2015-07-21 20:05:54',
        'arrivalTime': '1993-07-23 07:15:42'
      },
      {
        'license': '豫B90K78',
        'destination': '陕西省 榆林市',
        'distance': '345KM',
        'departureTime': '1982-12-25 23:05:42',
        'arrivalTime': '1987-05-12 11:05:55'
      },
      {
        'license': '赣A847L09',
        'destination': '云南省 昭通市',
        'distance': '345KM',
        'departureTime': '1984-12-21 12:20:47',
        'arrivalTime': '1999-03-16 01:48:21'
      },
      {
        'license': '粤D27H89',
        'destination': '宁夏回族自治区 石嘴山市',
        'distance': '309KM',
        'departureTime': '2006-02-19 12:51:32',
        'arrivalTime': '1975-10-14 08:35:02'
      },
      {
        'license': '豫B90K78',
        'destination': '内蒙古自治区 乌兰察布市',
        'distance': '190KM',
        'departureTime': '1980-06-28 16:44:41',
        'arrivalTime': '2020-09-08 19:00:41'
      },
      {
        'license': '粤S89D90',
        'destination': '天津 天津市',
        'distance': '190KM',
        'departureTime': '1973-03-11 05:43:12',
        'arrivalTime': '2003-09-10 23:42:02'
      },
      {
        'license': '豫B90K78',
        'destination': '福建省 龙岩市',
        'distance': '309KM',
        'departureTime': '2009-12-03 14:26:07',
        'arrivalTime': '1975-11-22 19:02:06'
      }
    ]
  }
}

export default Logistics
