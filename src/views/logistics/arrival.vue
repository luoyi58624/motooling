<template>
  <div class="arrival">
  <p class="arrival-time">车辆到达时间表</p>
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
        prop="start"
        label="始发地"
        width="180">
      </el-table-column>
      <el-table-column
      >
        <template slot="header">
          <span>当前位置</span>
          <i class="el-icon-refresh" style="color:#0091ff;margin-left:10px;font-size:16px"></i>
        </template>
        <template slot-scope="scope">
          <div class="current-position">
            <span>{{scope.row.current}}</span>
            <img src="../../assets/location.png">
          </div>
        </template>
      </el-table-column>
      <el-table-column
      align="center"
        prop="distance"
        label="剩余距离">
      </el-table-column>
      <el-table-column
      align="center"
        prop="time"
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
import { arrivalTime } from '@/api/logistics'
export default {
  data () {
    return {
      data: [],
      tableData: []
    }
  },
  mounted () {
    arrivalTime().then(res => {
      this.data = res.arrivaltime
      this.tableData = this.data.slice(0, 10)
    })
  },
  methods: {
    currentPage (page) {
      this.tableData = this.data.slice((page - 1) * 10, page * 10)
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
  .current-position {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
