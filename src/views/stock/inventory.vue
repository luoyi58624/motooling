<!--  -->
<template>
  <div>
    <div>
      <img :src="info.picPath" alt style="width:100%">
    </div>
    <div class="list">
      <div>
        <div>物料编码</div>
        <div>{{info.matNo}}</div>
      </div>
      <div>
        <div>物料描述</div>
        <div>{{info.matName}}</div>
      </div>
      <div>
        <div>库存数</div>
        <div>{{info.checkStoreQty}}</div>
      </div>
      <div>
        <div>实盘数</div>
        <div>
          <input type="number" v-model="info.checkRealQty">
        </div>
      </div>
       <div>
        <div>物料图片</div>
        <div>{{info.fileList?info.fileList[0].fileUrl:''}}</div>
      </div>
      <div>
        <div>备注</div>
        <div>
          <textarea name id cols="30" rows="10" border class="bz" v-model="remark"></textarea>
        </div>
      </div>
    </div>
    <div class="bot">
      <cube-button style="background:#5496FF;color:#fff;" @click="save">确定</cube-button>
    </div>
    <div class="box"></div>
  </div>
</template>

<script>
import { getStoreCheckById, saveIvStoreCheckBill } from '../../api/stock/stock'
export default {
  data () {
    return {
      id: '',
      remark: '',
      info: {}
    }
  },
  created () {
    this._getStoreCheckById()
  },
  methods: {
    _getStoreCheckById () {
      getStoreCheckById({ id: this.$route.query.matId, checkBillId: this.$route.query.checkBillId }).then(res => {
        console.log(res)
        this.info = res.data
      })
    },
    save () {
      saveIvStoreCheckBill(this.info)
        .then(res => this.showToast('保存成功'))
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.list {
  padding-left: 15px;
  > div {
    line-height: 50px;
    border-bottom: 1px solid #eaeaea;
    font-size: 16px;
    color: #1f1f1f;
    display: flex;
    > div:first-child {
      width: 100px;
    }
    > div:last-child {
      flex: 1;
      display: flex;
      align-items: cneter;
      > input {
        background: #e5e5e5;
        height: 30px;
        width: 100px;
        display: block;
        margin-top: 10px;
        border-radius: 4px;
        text-align: center;
      }
      > textarea {
        background: #e5e5e5;
        border: none;
        border-radius: 4px;
      }
    }
  }
}
.bot {
  position: fixed;
  bottom: 0;
  padding: 20px;
  left: 0;
  right: 0;
  > button {
    height: 40px;
    line-height: 40px;
    padding: 0;
  }
}
.box {
  height: 80px;
}
.bz {
  margin:10px 0;
  margin-right:20px;

  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  padding: 10px;
  resize: none;
  line-height:20px;
}
</style>
