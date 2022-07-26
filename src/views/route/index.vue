<template>
<div>
  <div id="all-map" class="map"></div>
  <div v-if="transitVisible">
    <transit
    :truckId="truckId"
    ref="truck"
    @update-visible="transitVisible=false" />
  </div>
</div>
</template>
<script>
import AMap from 'AMap'
import transit from '../logistics/transit.vue'
import { pathData } from '@/api/logistics'
export default {
  components: {
    transit
  },
  data () {
    return {
      transitVisible: false,
      truckId: 1
    }
  },
  mounted () {
    this.GaodeMap()
  },
  beforeDestroy () {
    this.map && this.map.destroy()
    this.map = null
  },
  methods: {
    GaodeMap () {
      this.map = new AMap.Map('all-map', {
        center: [114.498434, 30.636259], // [纬度，经度]
        resizeEnable: true,
        zoom: 6
      })
      //
      AMap.plugin(['AMap.Geocoder', 'AMap.Driving'])
      const geocoder = new AMap.Geocoder({ batch: true })
      const beginPoint = []; const endPoint = []
      const self = this
      geocoder.getLocation(['深圳市伟博思技术有限公司', '深圳市宝安区灵芝地铁站'], function (status, result) {
        console.log({ result })
        if (status === 'complete' && result.geocodes.length) {
          beginPoint.push(result.geocodes[0].location.lng)
          beginPoint.push(result.geocodes[0].location.lat)
          endPoint.push(result.geocodes[1].location.lng)
          endPoint.push(result.geocodes[1].location.lat)
        }
        const driving = new AMap.Driving({
          map: self.map
        })
        driving.search(new AMap.LngLat(beginPoint[0], beginPoint[1]), new AMap.LngLat(endPoint[0], endPoint[1]), function (status, result) {
          console.log(result)
        })
      })

      this.map.on('complete', () => {
        const markers = [{
          name: 'beiJing',
          icon: require('@/assets/warehouse.png'),
          position: [116.405289, 39.904987] // 北京
        }, {
          name: 'wulumuqi',
          icon: require('@/assets/warehouse.png'),
          position: [87.61792, 43.793308] // 乌鲁木齐
        }, {
          name: 'shenZhen',
          icon: require('@/assets/warehouse.png'),
          position: [114.085938, 22.546988] // 深圳
        }, {
          name: 'fuZhou',
          icon: require('@/assets/warehouse.png'),
          position: [119.306816, 26.075317] // 福州
        }
        ]

        markers.forEach(marker => {
          let content = ''
          if (marker.name === 'beiJing') {
            content = '北京仓'
          } else if (marker.name === 'wulumuqi') {
            content = '乌鲁木齐仓'
          } else if (marker.name === 'shenZhen') {
            content = '深圳仓'
          } else {
            content = '福州仓'
          }
          // eslint-disable-next-line no-new
          new AMap.Marker({
            map: this.map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-40, -40),
            label: {
              content: content,
              offset: new AMap.Pixel(20, -9)
            }

          }).on('click', () => {
            window.parent.postMessage(
              { type: 'openflow' },
              document.referrer
            )
          })
        })
        this.map.getCenter()

        pathData().then(d => {
          const routes = d.data.filter((route, index) => {
            return index === 0 || index === 4 || index === 5
          })

          routes.forEach(route => {
            const polyline = new AMap.Polyline({
              map: this.map,
              path: route.path,
              showDir: true,
              strokeColor: '#28F',
              strokeWeight: 6
            })
          })

          routes.forEach((route, index) => {
            if (index !== 0) {
              let truckId, routeLine
              if (index === 1) {
                truckId = 1
                routeLine = route.path.slice(0, 5000)
              } else {
                truckId = 2
                routeLine = route.path.slice(0, 3000)
              }
              const truckMarker = new AMap.Marker({
                map: this.map,
                icon: new AMap.Icon({
                  image: require('@/assets/car.png'),
                  size: new AMap.Size(40, 44),
                  imageSize: new AMap.Size(40, 44)
                }),
                position: [114.829826, 28.026514],
                offset: new AMap.Pixel(-22, -22),
                autoRotation: true
              }).on('click', () => {
                this.transitVisible = true
                this.truckId = truckId
                this.$nextTick(() => {
                  this.transitVisible = true
                  this.$refs.truck.init()
                })
              })
              truckMarker.moveAlong(routeLine, 4000000)
            }
          })
          this.map.setFitView()
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100vh;
}

/deep/ .amap-marker-label{
    border: 1px solid #999;
    background-color: #fffeef;
}
</style>
