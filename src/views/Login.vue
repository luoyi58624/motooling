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
      <cube-button @click="login">进入</cube-button>
    </div>
  </div>
</template>

<script>
import { getPhoneCode } from '@/api/login'
import { getUrlQueryString } from '@/utils/utils.js'
import { getUser } from '@/api/person/User.js'
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
        .then(function (res) {
          console.log(res)
          let resData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    login () {
      var self = this
      getUser(this.loginData)
        .then(function (res) {
          let rdata = res.data
          console.log(rdata)
          if (rdata.code === '000000') {
            let next = self.$router.currentRoute.query.next
            sessionStorage.setItem('isLogin', 1)
            sessionStorage.setItem('loginData', JSON.stringify(self.loginData))
            sessionStorage.setItem('userData', JSON.stringify(rdata.data))
            self.$router.replace(next)
          } else {
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      // 微信浏览器进入微信登录
      this.$router.replace('/wxlogin?redirectURL=' + getUrlQueryString('redirectURL'))
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
