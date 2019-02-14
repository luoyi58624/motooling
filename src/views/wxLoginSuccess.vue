<template>
    <div>
      跳转中。。。
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
      let self = this
      let param = {
        code: this.code,
        companyId: this.companyId
      }
      postWxCode(param)
        .then(function (res) {
          let rdata = res.data.resultData
          let resObj = JSON.parse(rdata)
          console.log(resObj)
          if (resObj.code !== '000000') {
            alert(resObj.msg)
            throw ({ code: resObj.code, msg: resObj.msg })
          }
          self.resString = res.data.resultData
          sessionStorage.setItem('wechatInfo', JSON.stringify(resObj.data.wechatInfo))


          if (resObj.data.statusCode === 0) {
            alert('该企业没有站点')
            self.$router.replace('/')
          } else if (resObj.data.statusCode === 1) {
            localStorage.setItem('token', resObj.data.user.token)
            localStorage.setItem('weburl', resObj.data.weburl)
            // 登录成功
            self.$router.replace('/person/add?uid=' + resObj.data.user.uid)
          } else if (resObj.data.statusCode === 2) {
            // 未绑定手机号
            self.$router.replace('/wxBindPhone')
            localStorage.setItem('weburl', resObj.data.weburl)
          } else if (resObj.data.statusCode === 3) {
            // 用户未审批
            alert('用户信息需要管理员审批，请等待')
            self.$router.replace('/')
          } else {
            alert(resObj.msg)
            self.$router.replace('/')
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  },
  created () {
    this.code = getUrlQueryString('code')
    this.state = decodeURIComponent(getUrlQueryString('state'))
    console.log(this.state)
    this.companyId = this.state
    this.submitCode()
  }
}

</script>

  <style scoped>

  </style>
