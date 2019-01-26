<template>
    <div class="login">
      <div>
        微信登录成功
      </div>
    </div>
  </template>

<script>
import { postWxCode } from '@/api/login'
import { getUrlQueryString } from '@/utils/utils.js'
export default {
  data () {
    return {
      code: '',
      state: ''
    }
  },
  computed: {
    wxLoginLink () {
      return this.wxLinkBase + '?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(this.redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + this.state + '#wechat_redirect'
    }
  },
  methods: {
    submitCode () {
      let param = {
        code: this.code,
        companyId: this.companyId
      }
      postWxCode(param)
        .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    this.code = getUrlQueryString('code')
    this.state = JSON.parse(decodeURIComponent(getUrlQueryString('state')))
    console.log(this.state)
    this.companyId = this.state.companyId
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
