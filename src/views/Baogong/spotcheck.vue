<!--  -->
<template>
  <div>
    <div class="title">设备信息</div>
    <div class="eqinfo">
      <div class="img-wrapper">
        <img :src="info.pmDevice.devicePic" alt />
      </div>
      <div class="right-wrapper">
        <div class="list">企业名称：{{info.pmDevice.companyName}}</div>
        <div class="list">工作重心：{{info.pmDevice.typeName}}</div>
        <div class="list">设备编号：{{info.pmDevice.deviceNo}}</div>
        <div class="list">品牌型号：{{info.pmDevice.deviceModel}}</div>
        <div class="list">设备负责人：{{info.pmDevice.username}}</div>
      </div>
    </div>
    <div class="title">
      <div>点检信息</div>
      <div style="margin-left:20px;font-size:12px;color:#333;">{{date}}</div>
    </div>
    <div class="check">
      <div class="lt">点检内容</div>
      <div class="mytable">
        <div>
          <div>项次</div>
          <div>判定标准</div>
          <div>判定标准</div>
          <div>结论</div>
        </div>
        <div v-for="(item,index) in list" :key="index">
          <div>{{index+1}}</div>
          <div>{{item.content}}</div>
          <div>{{item.matter}}</div>
          <div>
            <cube-switch v-model="item.isChecked" :disabled="info.pmDevice.isCheck==='1'"></cube-switch>
          </div>
        </div>
      </div>
      <div class="lt">
        点检图片
        <div>
          <img v-for="(item,index) in info.imgsList" :key="index" :src="item.imgUrl" alt />
        </div>
      </div>
    </div>
    <div class="title">点检结论</div>
    <div class="btn-wrapper">
      <cube-button :light="true" @click="check(true)" :class="{'active':isChecked===true}">合格</cube-button>
      <cube-button :light="true" @click="check(false)" :class="{'active':isChecked===false}">不合格</cube-button>
    </div>
    <div style="height:50px;"></div>
    <div class="bot" v-if="info.pmDevice.isCheck!=='1'">
      <cube-button @click="save">提交</cube-button>
    </div>
  </div>
</template>

<script>
import { pcPurchAssOrderInfo, saveAssOrderInfo } from '@/api/baogong/baogong'
export default {
  data () {
    return {
      info: {}, // 页面信息
      list: [], //
      deviceId: ''
    }
  },
  created () {
    this.deviceId = this.$route.query.deviceId || 2
    var day = new Date()
    day.setTime(day.getTime())
    this.date =
      day.getFullYear() +
      '年' +
      (day.getMonth() + 1) +
      '月' +
      day.getDate() +
      '日'
    this.getInfo()
  },

  methods: {
    getInfo () {
      pcPurchAssOrderInfo({ deviceId: this.deviceId })
        .then(res => {
          console.log(res)
          this.info = res
          // if(res.data.deviceCheckConfSubList){
          // }
          if (Array.isArray(res.deviceCheckConfSubList)) {
            this.list = res.deviceCheckConfSubList
          }
          console.log(this.list)
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    save () {
      const pmDeviceCheck = {
        isChecked: this.isChecked ? 1 : 0,
        deviceId: this.deviceId
      }
      const pmDeviceCheckSub = this.list.map(item => {
        const newItem = {}
        newItem.isChecked = item.isChecked ? '1' : '0'
        newItem.matter = item.matter
        newItem.content = item.content
        return newItem
      })
      saveAssOrderInfo({ pmDeviceCheck, pmDeviceCheckSub })
        .then(res => {
          console.log(res)
          this.showToast('提交成功')
        })
        .catch(err => {
          if (err.msg) {
            this.showToast(err.msg)
          }
        })
    },
    check (check) {
      if (this.info.pmDevice.isCheck === '1') {
        this.showToast('当前状态只可预览')
        return
      }
      this.list = this.list.map(item => {
        item.isChecked = check
        return item
      })
    }
  },
  computed: {
    isChecked () {
      return this.list.every(item => {
        return item.isChecked
      })
    }
  }
}
</script>
<style lang='less' scoped>
.title {
  display: flex;
  color: #5395fc;
  font-size: 16px;
  padding: 10px 15px;
  align-items: center;
}
.eqinfo {
  padding: 0 15px;
  display: flex;
  > .img-wrapper {
    width: 130px;
    > img {
      width: 80%;
    }
  }
  .list {
    padding: 5px;
    font-size: 14px;
  }
}
.lt {
  font-size: 14px;
  padding: 10px 0;
  > div {
    > img {
      width: 90px;
      height: 90px;
      margin-top: 10px;
      margin-right: 10px;
      object-fit: cover;
    }
  }
}
.check {
  padding: 0 15px;
  .mytable {
    border: 1px solid #a9a9a9;
    > div {
      border-bottom: 1px solid #a9a9a9;
      display: flex;
      font-size: 14px;
      > div {
        flex: 1;
        border-right: 1px solid #a9a9a9;
        text-align: center;
        padding: 10px 0;
        line-height: 1.5;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      > div:first-child {
        max-width: 40px;
      }
      > div:last-child {
        max-width: 60px;
        border-right: none;
      }
    }
    > div:last-child {
      border-bottom: none;
    }
  }
}
.btn-wrapper {
  display: flex;
  > button {
    margin: 20px;
  }
  > button.active {
    background: #5395fc;
    color: #fff;
  }
}

.bot {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px; /*no*/
  > button {
    height: 50px; /*no*/
    line-height: 50px; /*no*/
    padding: 0;
    font-size: 14px; /*no*/
    padding: 0;
  }
}
</style>
