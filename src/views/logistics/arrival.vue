<template>
  <div class="arrival">
  <p class="arrival-time">车辆到达时间表</p>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
      background
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
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
