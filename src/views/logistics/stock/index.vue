<template>
  <div class="stock">
  <p class="huHan">武汉仓</p>
  <div class="pie-chart">
    <div class="goods-rate">
      <div ref="goodsRate" style="width:100%;height:300px"></div>
    </div>
    <div class="receive-send">
      <stock />
    </div>
  </div>
  <div class="chargers">
    <img src="" alt="">
    <span>负责人: 陈彦威</span>
  </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import stock from './stock'
import { addListener, removeListener } from 'resize-detector'
import debounce from '@/utils/debounce'
export default {
  components: { stock },
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
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
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
    addListener(this.$refs.goodsRate, debounce(this.resize, 300))
  },
  beforeDestroy () {
    removeListener(this.$refs.goodsRate, debounce(this.resize, 300))
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    chart () {
      this.chart = echarts.init(this.$refs.goodsRate)
      this.chart.setOption(this.option)
    },
    resize () {
      this.chart.resize()
    }
  }
}
</script>

<style scoped>
.stock {
  color: #fff;
  background-color: rgb(42, 49, 59);
  height: 100vh;
  overflow: hidden;
}
.huHan {
  text-align: center;
  line-height: 2;
  font-size: 16px;
}
.pie-chart {
  display: flex;
}
.goods-rate, .receive-send {
    width: 50%;
  }
</style>
