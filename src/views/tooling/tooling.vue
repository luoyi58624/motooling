<template>
  <div id="tooling">
    <div class="tooling-board">
      <main>
        <div class="board-table">
          <el-table
            :data="tableData"
            ref="el_table"
            style="width: 100%"
            :stripe="true"
            :header-row-style="{
              color: '#FFF',
              fontSize: '12px'
            }"
            :header-cell-style="{
              padding: 0,
              backgroundColor: '#425da2',
              borderBottom: 'unset'
            }"
            :row-style="{
              color: '#fff',
              fontSize: '12px',
              backgroundColor: '#424d69'
            }"
            :cell-style="{ borderBottom: 'unset' }"
          >
            <el-table-column label="零件号" align="center">
              <template slot-scope="scope">
                <span
                  @click="checkPartInfo(scope.row.matNo)"
                  style="color:#80d1ff;text-decoration: underline;cursor: pointer;"
                  >{{ scope.row.matNo }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="totalWorkTime"
              label="总工时"
              :sortable="true"
              :sort-method="sort"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="finishedPercent"
              label="加工进度"
              :sortable="true"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-progress
                  :percentage="scope.row.finishedPercent * 1"
                  :color="customColor"
                ></el-progress>
              </template>
            </el-table-column>
            <el-table-column
              prop="currentList"
              label="当前滞留工序"
              sortable
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <div class="board-select">
          <div class="select-wrapper">
            <el-select
              v-model="moldNo"
              placeholder="请选择"
              @change="selectedMoldNoInfo"
              size="small"
              popper-class="moldNo-select"
            >
              <el-option
                v-for="item in moldList"
                :key="item.moldNo"
                :label="item.moldNo"
                :value="item.moldNo"
              >
              </el-option>
            </el-select>
            <div class="mold-info">
              <ul>
                <li>
                  <span>紧迫度</span
                  ><span class="status" :style="{color:baseMap.urgencyColor}">{{ baseMap.urgency }}</span>
                </li>
                <li>
                  <span>验证日期</span><span>{{ baseMap.firstTryDate }}</span>
                </li>
                <li>
                  <span>交付日期</span><span>{{ baseMap.deliveryDate }}</span>
                </li>
                <li>
                  <span>ISSUE记录</span
                  ><a :href="baseMap.issueUrl" :target="baseMap.issueUrl === '' ? '_self' : '_parent'">MoWork链接</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="mold-chart">
            <p>下层零件到位情况</p>
            <div ref="chart" style="width: 100%;height:200px"></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { makingMoldList, projectProgress } from '@/api/tooling'
import debounce from '@/utils/debounce'
import * as echarts from 'echarts'
export default {
  name: 'tooling',
  data () {
    return {
      moldList: [],
      moldNo: localStorage.moldNo || '',
      baseMap: {},
      partProgressList: [],
      tableData: [],
      companyId: 0,
      option: {
        backgroundColor: '#424d69',
        title: {
          text: '',
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '600'
          },
          left: 'center', // 标题的位置
          top: 'middle'
        },
        angleAxis: {
          max: 100,
          clockwise: true, // 默认顺时针
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ['50%', '50%'],
          radius: '150%' // 表示外半径为可视区尺寸（容器高宽中较小一项）的 100% 长度
        },
        series: [
          {
            type: 'bar',
            data: [
              {
                value: 55,
                itemStyle: {
                  color: '#fec900'
                }
              }
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 8, // 环形的宽度
            barGap: '-100%',
            z: 2
          },
          {
            type: 'bar',
            data: [
              {
                value: 100,
                itemStyle: {
                  color: 'rgba(233, 233, 233, 1)'
                }
              }
            ],
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 2,
            barGap: '-70%',
            z: 1
          }
        ]
      }
    }
  },
  created () {
    this.resize = debounce(this.resize, 300)
    this.selectedMoldNoInfo()
  },
  async mounted () {
    await makingMoldList().then(res => {
      this.moldList = res.list
    })
    this.chart()
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    option (value) {
      this.chart.setOption(value)
    }
  },
  methods: {
    selectedMoldNoInfo () {
      localStorage.setItem('moldNo', this.moldNo)
      if (!this.moldNo) {
        return
      }
      projectProgress(this.moldNo).then(res => {
        this.baseMap = res.baseMap
        const circleValue = res.baseMap.lowerLevel
        this.companyId = res.companyId
        this.option.title.text = circleValue + '%'
        this.option.series[0].data[0].value = circleValue
        this.option = { ...this.option }
        let partProgressList = []
        res.partProgressList.forEach(item => {
          item.currentList = item.currentList.length
            ? item.currentList[0].procName
            : ''
          item.finishedPercent = Number(item.finishedPercent)
          partProgressList.push(item)
        })
        this.tableData = partProgressList
      })
    },
    chart () {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    },
    resize () {
      this.chart.resize()
    },
    customColor (percentage) {
      if (percentage < 100) {
        return '#f5c715'
      } else {
        return '#48d874'
      }
    },
    checkPartInfo (matNo) {
      const data = {
        type: 'openPartProgress',
        data: {
          companyId: this.companyId,
          moldNo: this.moldNo,
          matNo
        }
      }
      window.parent.postMessage(
        data,
        document.referrer
      )
    },
    sort (num1, num2) {
      const val1 = parseFloat(num1.totalWorkTime)
      const val2 = parseFloat(num2.totalWorkTime)
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="less">
/* 滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(241, 241, 241);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(100, 106, 131);
}
html,
body {
  height: 100%;
  margin: 0;
}
ul {
  padding: 0;
}
ul li {
  list-style: none;
}
#tooling {
  height: 100%;
  background-color: #424d69;
}
.tooling-board {
  color: #fff;
  height: 100%;
}
header {
  background-color: #2f3648;
  color: #fff;
  padding-left: 10px;
  height: 32px;
  line-height: 32px;
}
main {
  height: calc(100% - 47px);
  margin-top: 15px;
  overflow: hidden;
}
.board-table {
  float: left;
  width: 70%;
  max-height: 100%;
  overflow-y: auto;
  .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #4e608e;
  }
  .el-table th.is-leaf {
    border-bottom: unset;
  }
  .el-table::before {
    height: 0;
  }
  .el-progress__text {
    color: #fff;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: unset;
  }
}
.board-select {
  float: left;
  width: 30%;
  height: 100%;
  .select-wrapper {
    margin-left: 15px;
  }
  .el-select .el-input__inner {
    background-color: #425da2;
    border-color: #425da2;
    color: #fff;
  }
  .mold-info {
    margin-right: 20px;
    ul {
      width: 100%;
      padding: 20px 0;
      font-size: 14px;
      li {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        .status {
          color: #fec900;
        }
        a {
          color: #80d1ff;
        }
      }
    }
  }
  .mold-chart {
    text-align: center;
  }
}
</style>
