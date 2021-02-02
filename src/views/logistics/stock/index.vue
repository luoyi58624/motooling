<template>
  <div class="stock">
  <p class="huHan">武汉仓</p>
  <div class="pie-chart">
    <div class="goods-rate">
      <div ref="goodsRate" style="width:100%;height:300px"></div>
      <p>库存物资占比</p>
    </div>
    <div class="receive-send">
      <stock />
      <p>今日收发货量</p>
    </div>
  </div>
  <div class="chargers">
    <div class="chargers-item" v-for="(member,index) in chargers" :key="index">
      <img :src="require('@/assets/male.png')" @click="startChat(member.memberName)">
      <p> {{member.memberName}}</p>
    </div>
  </div>
  <el-dialog
    :visible.sync="visible"
    width="500px"
    top="0"
    custom-class="transit-dialog"
    :before-close="handleClose">
    <div style="height:500px">
      <chat :userId="userId" :talkMember="talkMember" />
    </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import stock from './stock'
import chat from '@/views/synergy/chat/chatPanel'
import { addListener, removeListener } from 'resize-detector'
import debounce from '@/utils/debounce'
export default {
  components: { stock, chat },
  data () {
    return {
      chargers: [{ memberName: '韩立' }, { memberName: '李笑来' }, { memberName: '昌恒' }],
      talkMember: '',
      userId: 0,
      visible: false,
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
              { value: 1048, name: '成品' },
              { value: 735, name: '半成品' },
              { value: 580, name: '封存料' },
              { value: 484, name: '原材料' },
              { value: 300, name: '其他' }
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
    },
    startChat (member) {
      this.visible = true
      this.talkMember = member
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="less">
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
  p {
    text-align: center;
    font-size: 16px;
  }
}
.goods-rate, .receive-send {
    width: 50%;
  }
  .chargers {
    margin-top: 20px;
    display: flex;
    .chargers-item {
      margin-left: 20px;
      img {
        display: block;
        width: 90px;
        height: 109px;
        border-radius: 8px;
      }
      p{
        text-align: center;
        line-height: 2;
      }
    }
  }
</style>
