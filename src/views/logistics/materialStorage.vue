<template>
  <div class="material-storage">
    <div class="storage-rate">
      <img :src="require('@/assets/computer.png')" alt="">
      <p class="finished">成品区</p>
      <p class="amount">总数量：18580</p>
      <img :src="require('@/assets/loadVolumn.png')" alt="">
      <p>仓库存储占比</p>
    </div>
    <div class="goods-box">
      <div class="goods-info-box">
        <div class="goods-info" v-for="(item,index) in goods" :key="index">
          <img :src="item.image" alt="">
          <div class="desc">
            <div class="desc-line desc-material">
              <p>物料描述：{{item.desc}}</p>
              <p>数量：{{item.amount}}</p>
            </div>
            <div class="desc-line desc-spec">
              <p>规格型号：{{item.type}}</p>
              <p>总量：{{item.weight}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :page-size="6"
          :total="amountGoods.length"
          @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { transit } from '@/api/logistics'
export default {
  data () {
    return {
      amountGoods: [],
      goods: [],
      page: 0
    }
  },
  mounted () {
    transit(2).then(res => {
      this.truckInfo = res.truckInfo
      this.amountGoods = res.goods
      this.goods = res.goods.slice(0, 6)
    })
  },
  methods: {
    pageChange (currentPage) {
      if (currentPage === 1) {
        this.goods = this.amountGoods.slice(0, 6)
      } else {
        this.goods = this.amountGoods.slice(6)
      }
    }
  }
}
</script>

<style scoped lang="less">
.material-storage {
  background-color: rgb(42, 49, 59);
  display: flex;
  padding-top: 20px;
  box-sizing: border-box;
  height: 100vh;
  .storage-rate {
    color: #fff;
    width: 33%;
    font-size: 14px;
    text-align: center;
    .finished {
      font-size: 20px;
      line-height: 3;
    }
    .amount {
      margin-bottom: 30px;
    }
  }
}
  .goods-box {
    width: 65%;
    position: relative;
    .goods-info-box {
    background-color: rgb(215, 215, 215);
    padding: 0 8px;
    border-radius: 5px;
    overflow: hidden;
    }
    .pagination {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .goods-info {
    height: 40px;
    border-radius: 5px;
    display: flex;
    color: rgb(44, 44, 44);
    font-size: 13px;
    background-color: #fff;
    padding: 5px 0;
    margin: 5px 0;
    img {
      width: 60px;
      height: 40px;
      margin-left: 5px;
      object-fit: scale-down;
    }
    .desc {
      width: calc(100% - 60px);
      display: flex;
      justify-content: space-around;
      .desc-line {
        p {
          line-height: 20px;
        }
      }
      .desc-material {
        width: 35%;
      }
      .desc-spec {
        width: 45%;
      }
    }
  }
</style>
