<template>
  <div>
    <br>
    <div><router-link to="/device/add?deviceid=71&companyid=1">设备资料维护</router-link></div>
    <br>
    <div><router-link to="/person/add?companyid=1&referee=456&companyid=1">邀请人员</router-link></div>
    <br>
    <div><router-link :to="'/supplier/add?companyid=1&code=' + code" >邀请供应商</router-link></div>
    <hr>
    <div><h4>以下为中转页面</h4></div>
    <br>
    <div><router-link to="/login">登录</router-link></div>
    <br>
    <div><router-link to="/wxlogin">微信登录</router-link></div>
    <br>
    <div><router-link to="/wxBindPhone">绑定手机</router-link></div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      code: encodeURIComponent('evnxsVc8MAG%2F26dlBwqU84uvqS3C%2F6lYlTbiLPDTPzFxoXWhUXT0yfgLh1feJCgFQYPeag35MQ1pVeTEPguiwX1M%2BjGwi%2B5axdil6eFMuF%2FGd0Kv9%2FCVWyoydpkT8JuB0v2glXO6mgJ3UCZD4iSG0DlWscY7q12Q1Y3MgYUmezw%3D')
    }
  }
}
</script>
