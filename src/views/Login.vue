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
      <cube-input v-model="loginData.password" placeholder="请输入密码" type="password" :autocomplete="false">

      </cube-input>
    </div>
    <div class="group">
      <cube-button @click="login">进入</cube-button>
    </div>
  </div>
</template>

<script>
import { accountPasswordLogin } from '@/api/login'
import { getUrlQueryString, isWeiXin } from '@/utils/utils.js'
export default {
  data () {
    return {
      eye: {
        open: true,
        reverse: false
      },
      loginData: {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      var _this = this
      accountPasswordLogin(this.loginData)
        .then((res) => {
          console.log({ userInfo: res })
          if (res.data.code === '000000') {
            var data = res.data.data
            sessionStorage.setItem('token', data.token)
            localStorage.setItem('uid', data.uid)
            localStorage.setItem('avatar', data.avatar)
            // localStorage.setItem("WEBURL", data.weburl);
            localStorage.setItem('username', data.username)
            localStorage.setItem('fileServerUrl', data.fileServerUrl)
            localStorage.setItem('mobile', data.mobile)
            localStorage.setItem('companyId', data.companyId)

            let redirectURL = getUrlQueryString('redirectURL')

            if (redirectURL) {
              let nexturl = decodeURIComponent(redirectURL)
              _this.$router.push(nexturl)
            } else {
              _this.$router.push('/')
            }
          } else {
            _this.$toast(res.data.msg)
          }
        })
    }
  },
  created () {
    if (isWeiXin()) {
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
