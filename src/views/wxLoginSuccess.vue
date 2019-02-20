<template>
  <div>
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
          let resObj = res.data
          let nextpage = localStorage.getItem('nextpage')
          console.log(resObj)
          if (resObj.code !== '000000') {
            alert(resObj.msg)
            throw ({ code: resObj.code, msg: resObj.msg })
          }
          self.resString = res.data
          sessionStorage.setItem('wechatInfo', JSON.stringify(resObj.data.wechatInfo))

          if (resObj.data.statusCode === 0) {
            alert('该企业没有站点')
            self.$router.replace('/')
          } else if (resObj.data.statusCode === 1) {
            localStorage.setItem('token', resObj.data.user.token)
            localStorage.setItem('weburl', resObj.data.weburl)
            localStorage.setItem('uid', resObj.data.user.uid)
            // 登录成功
            if (localStorage.type === '0' && localStorage.invite_referee) {
              // 邀请人
              self.$router.replace(nextpage + '?referee=' + localStorage.invite_referee)
            } else if (localStorage.type === '1') {
              // 邀请设备
              self.$router.replace(nextpage + '?deviceid=' + localStorage.invite_deviceid)
            } else {
              self.$router.replace('/')
            }
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
