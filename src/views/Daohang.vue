<template>
  <div>
    <br>
    <div class="version">版本号：{{version}}</div>
    <br>
    <div>
      <router-link to="/device/add?deviceid=71">设备资料维护</router-link>
    </div>
    <br>
    <div>
      <router-link to="/person/add?referee=456">邀请人员</router-link>
    </div>
    <br>
    <div>
      <router-link :to="'/supplier/add?code=' + code">邀请供应商</router-link>
    </div>
    <br>
    <div>
      <router-link to="/baogong/work-center">工作中心</router-link>
    </div>
    <br>
    <div>
      <router-link to="/instore/list">采购收货</router-link>
    </div>

    <br>
     <div>
      <router-link to="/instore/back_nav">采购退货</router-link>
    </div>
    <br>
    <div>
      <router-link to="/assinstore/list">外协采购收货</router-link>
    </div>
    <br>
     <div>
      <router-link to="/assinstore/back_nav">外协采购退货</router-link>
    </div>
    <br>
    <div>
      <router-link to="/stock/list">库存盘点</router-link>
    </div>
      <br>
    <div>
      <router-link to="/order/delivery_nav">生产订单退货查询</router-link>
    </div>
       <br>
    <div>
      <router-link to="/order/receive_nav">生产订单收货查询</router-link>
    </div>
       <br>
    <div>
      <router-link to="/materiel/_nav">退料</router-link>
    </div>
       <br>
    <div>
      <router-link to="/materiel/nav">发料</router-link>
    </div>

      <br>
        <div>
      <router-link to="/scan/nav-receive">收货</router-link>
    </div>
      <br>
        <div>
      <router-link to="/scan/nav-back">退货</router-link>
    </div>
      <br>
    <div>
      <router-link to="/synergy">协同</router-link>
    </div>
       <br>
    <hr>
    <div>
      <h4>以下为中转页面（不要直接进入）</h4>
    </div>
    <br>
    <div>
      <router-link to="/login">登录</router-link>
    </div>
    <br>
    <div>
      <router-link to="/wxlogin">微信登录</router-link>
    </div>
    <br>
    <div>
      <router-link to="/wxBindPhone">绑定手机</router-link>
    </div>
  </div>
</template>

<script>
var version = require('../../package.json').version
export default {
  data () {
    return {
      code: encodeURIComponent(
        'evnxsVc8MAG%2F26dlBwqU84uvqS3C%2F6lYlTbiLPDTPzFxoXWhUXT0yfgLh1feJCgFQYPeag35MQ1pVeTEPguiwX1M%2BjGwi%2B5axdil6eFMuF%2FGd0Kv9%2FCVWyoydpkT8JuB0v2glXO6mgJ3UCZD4iSG0DlWscY7q12Q1Y3MgYUmezw%3D'
      ),
      version: ''
    }
  },
  created () {
    this.version = version
  }
}
</script>
<style lang="less">
.version{
  font-size:12px;/*no*/

}
</style>
