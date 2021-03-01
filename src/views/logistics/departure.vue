<template>
  <div class="arrival">
  <p class="arrival-time">物流发班计划时间表</p>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="license"
        label="车辆"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="destination"
        label="发往地"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="distance"
        label="运输距离"
        width="180">
      </el-table-column>
      <el-table-column
      align="center"
        prop="departureTime"
        label="发车时间">
      </el-table-column>
      <el-table-column
      align="center"
        prop="arrivalTime"
        label="预计到达时间">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
      background
        small
        layout="prev, pager, next"
        :total="data.length"
        @current-change="currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Logistics from '@/api/logistics'
export default {
  data () {
    return {
      data: [],
      tableData: []
    }
  },
  mounted () {
    const departure = new Logistics()

    this.tableData = departure.departureTime()
  },
  methods: {
    currentPage (page) {
      // this.tableData = this.data.slice((page - 1) * 10, page * 10)
    }
  }
}
</script>

<style scoped lang="less">
.arrival {
  height: 100vh;
  background-color: rgb(42, 49, 59);
  .arrival-time {
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 16px;
    line-height: 2;
  }
  .pagination {
    display: inline-block;
    position: relative;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
