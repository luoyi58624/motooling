<template>
  <div>
  </div>
</template>

<script>
import { getUrlQueryString } from '@/utils/utils.js'
export default {
  data () {
    return {
      appid: 'wx70214a3c12e8e576',
      wxLinkBase: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      redirect_uri: 'http://www.motooling.com/mthtml/wxloginSuccess'
    }
  },
  computed: {
    wxLoginLink () {
      return this.wxLinkBase + '?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(this.redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + getUrlQueryString('redirectURL') + '#wechat_redirect'
    }
  },
  methods: {

  },
  created () {
  },
  mounted () {
    window.location.href = this.wxLoginLink
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
