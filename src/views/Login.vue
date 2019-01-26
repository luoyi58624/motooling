<template>

  <div class="login">
    <div class="group">
      <div class="logo-wrapper">
        <img class="logo" alt="logo" src="../assets/logo.png">
      </div>
    </div>
    <div class="group">
      <cube-input v-model="loginData.mobile" placeholder="请输入手机号码" type="text" :maxlength="11" :autocomplete="true"></cube-input>
    </div>
    <div class="group">
      <cube-input v-model="loginData.phoneCode" placeholder="请输入验证码" type="tel" :maxlength="6" :autocomplete="false">
        <cube-button slot="append" :inline="true" @click="getCode">获取验证码</cube-button>
      </cube-input>
    </div>
    <div class="group">
      <cube-button>进入</cube-button>
      <button @click="getCode">点击</button>
    </div>
  </div>
</template>

<script>
import { getPhoneCode } from '@/api/login'
export default {
  data () {
    return {
      eye: {
        open: true,
        reverse: false
      },
      loginData: {
        mobile: 18565705036,
        phoneCode: ''
      }
    }
  },
  methods: {
    getCode () {
      getPhoneCode(this.loginData.mobile, 1)
      .then(function(res){
        console.log(res)
        let resData = JSON.parse(res.data.resultData)
        sessionStorage.setItem('loginData',JSON.stringify(this.loginData))
        sessionStorage.setItem('code',JSON.stringify(resData))
      })
      // data":{"phoneCode":"255392"},
      .catch(err=>{
        console.log(err)
      })
    }
  }
}

</script>

<style scoped>
  .logo-wrapper {
    margin: auto;
    text-align: center;
    padding-top: 20px;
  }

  .logo {
    width: 200px;
    height: 200px;
  }

  .login {
    height: 100%;
    background: #efeff4;
  }

  .group {
    margin-bottom: 20px;
  }

</style>
