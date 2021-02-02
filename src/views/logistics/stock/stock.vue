<template>
<div>
  <div ref="receiveSend" style="width:100%;height:300px">
  </div>
</div>
</template>

<script>
import * as echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import debounce from '@/utils/debounce'
export default {
  data () {
    return {
      option: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: [
              { value: 1048, name: '待发货量' },
              { value: 735, name: '已签收量' },
              { value: 580, name: '待收货量' }
            ],
            label: {
              color: '#fff',
              formatter: function (params) {
                return params.name + '{rate|\n' + params.percent + '%}'
              },
              rich: {
                rate: {
                  lineHeight: 18,
                  align: 'center'
                }
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.chart()
    addListener(this.$refs.receiveSend, debounce(this.resize, 300))
  },
  beforeDestroy () {
    removeListener(this.$refs.receiveSend, debounce(this.resize, 300))
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    chart () {
      this.chart = echarts.init(this.$refs.receiveSend)
      this.chart.setOption(this.option)
    },
    resize () {
      this.chart.resize()
    }
  }
}
</script>

<style scoped>
</style>
