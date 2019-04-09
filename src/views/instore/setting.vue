<!--  -->
<template>
  <div>
    <my-header title="设置"></my-header>
    <div class="z-top"></div>
    <div class="title">收货设置</div>
    <div class="wrapper">
      <div>
        <p>收货人员设置</p>
        <div class="img-wrapper">
          <img src="png" alt>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
          <div class="active">
            <span></span>
            站内信
          </div>
          <div>
            <span></span>
            微信
          </div>
          <div>
            <span></span>
            邮件
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="value"></cube-switch>
      </div>
    </div>
    <div class="title">检验设置</div>
    <div class="wrapper">
      <div>
        <p>检验人员设置</p>
        <div class="img-wrapper">
          <img src="png" alt>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
          <div class="active">
            <span></span>
            站内信
          </div>
          <div>
            <span></span>
            微信
          </div>
          <div>
            <span></span>
            邮件
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="value"></cube-switch>
      </div>
    </div>
    <div class="title">特采设置</div>
    <div class="wrapper">
      <div>
        <p>特采人员设置</p>
        <div class="img-wrapper">
          <img src="png" alt>
        </div>
      </div>
      <div>
        <p>通知方式</p>
        <div class="option-wrapper">
          <div class="active">
            <span></span>
            站内信
          </div>
          <div>
            <span></span>
            微信
          </div>
          <div>
            <span></span>
            邮件
          </div>
        </div>
      </div>
      <div class="switch-wrapper">
        <p>是否显示金额</p>
        <cube-switch v-model="value"></cube-switch>
      </div>
    </div>
  </div>
</template>

<script>
import { setUpInfo, setUpUpdate } from "@/api/instore/instore";
import myHeader from "@/components/header";
export default {
   components: {
      myHeader
  },
  data() {
    return {};
  },
  created() {
    this.getSetting();
  },

  methods: {
    getSetting() {
      setUpInfo().then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang='less' scoped>
.z-top{
  margin-top:41px;
}
.title {
  background: #f8f9fe;
  color: #505050;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  > div:nth-child(2) {
    font-size: 12px;
    color: #5495ff;
  }
}
.title:first-child{
  margin-top:41px;
}
.wrapper {
  padding: 0 30px 15px 30px;
  > div {
    > p {
      font-size: 14px;
      margin-top: 15px;
    }
    > div {
      padding: 0 15px;
      margin-top: 15px;
    }

    > div.img-wrapper {
      > img {
        width: 50px;
        height: 50px;
        margin-left: 16px;
      }
      > img:first-child {
        margin-left: 0;
      }
    }
    > div.option-wrapper {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      > div {
        font-size: 14px;
        display: flex;
        align-items: center;
        > span {
          width: 14px;
          height: 14px;
          border: 1px solid #303030;
          border-radius: 50%;
          margin-right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
      }
      > div.active {
        > span {
          border: 1px solid #5495ff;
        }
        > span::after {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          background: #5495ff;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -5px;
          margin-top: -5px;
          border-radius: 50%;
        }
      }
    }
  }
  > div.switch-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    color: rgba(48, 48, 48, 1);
  }
}
</style>