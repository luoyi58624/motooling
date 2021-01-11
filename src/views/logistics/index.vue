<template>
 <div id="all-map" class="map"></div>
</template>
<script>
import AMap from 'AMap'
import AMapUI from 'AMapUI'
export default {
  components: {
  },
  data () {
    return {
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
            label: {
              content: content,
              offset: new AMap.Pixel(20, -9)
            }

          })
        })
        this.map.getCenter()

        AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], (PathSimplifier, $) => {
          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！')
            return
          }
          const pathSimplifierIns = new PathSimplifier({
            zIndex: 100,
            autoSetFitView: true,
            map: this.map, // 所属的地图实例

            getPath: function (pathData, pathIndex) {
              return pathData.path
            },
            getHoverTitle: function (pathData, pathIndex, pointIndex) {
              if (pathIndex === 0) {
                // point
                return '物流运输中，预计今天14:20到达目的地'
              } else if (pathIndex === 1) {
                return '物流已到达郑州，下一站武汉。'
              } else {
                return '无物流信息'
              }
            },
            // 轨迹线的样式
            renderOptions: {
              renderAllPointsIfNumberBelow: -1 // 绘制路线节点，如不需要可设置为-1
            }
          })
          window.pathSimplifierIns = pathSimplifierIns
          $.getJSON('https://a.amap.com/amap-ui/static/data/big-routes.json', function (d) {
            const routes = d.filter((route, index) => {
              return index === 0 || index === 4 || index === 5
            })
            routes.splice(0, 1, {
              name: 'fly',
              path: PathSimplifier.getGeodesicPath(
                routes[0].path[0], routes[0].path[routes[0].path.length - 1], 100)
            })

            pathSimplifierIns.setData(routes)
            function onload () {
              pathSimplifierIns.renderLater()
            }

            function onerror (e) {
              alert('图片加载失败！')
            }
            const navg1 = pathSimplifierIns.createPathNavigator(0, {
              loop: true, // 循环播放
              speed: 100000, // 巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 30,
                height: 30,
                // 使用图片
                content: PathSimplifier.Render.Canvas.getImageContent(require('@/assets/plane.png'), onload, onerror),
                strokeStyle: null,
                fillStyle: null
              }
            })
            const navg2 = pathSimplifierIns.createPathNavigator(1, {
              loop: true, // 循环播放
              speed: 100000, // 巡航速度，单位千米/小时
              pathNavigatorStyle: {
                width: 30,
                height: 30,
                content: PathSimplifier.Render.Canvas.getImageContent(require('@/assets/car.png'), onload, onerror)
              }
            })
            navg1.start()
            navg2.start()
          })
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
