<template>
  <div></div>
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
  computed: {},
  methods: {
    submitCode () {
      let self = this
      let param = {
        code: getUrlQueryString('code')
        // companyId: getStringQueryString(this.state, "companyid")
      }
      console.log('param', param)
      postWxCode(param)
        .then(function (res) {
          let resObj = res.data
          let state = getUrlQueryString('state')
          console.log(resObj)
          if (resObj.code !== '000000') {
            alert(resObj.msg)
            Promise.reject(resObj.msg)
          }
          self.resString = res.data
          sessionStorage.setItem(
            'wechatInfo',
            JSON.stringify(resObj.data.wechatInfo)
          )

          if (resObj.data.statusCode === 0) {
            alert('该企业没有站点')
            self.$router.replace('/')
          } else if (resObj.data.statusCode === 1) {
            sessionStorage.setItem('token', resObj.data.user.token)
            sessionStorage.setItem('user', JSON.stringify(resObj.data.user))
            // localStorage.setItem("WEBURL", resObj.data.weburl);
            localStorage.setItem('uid', resObj.data.user.uid)
            localStorage.setItem('avatar', resObj.data.user.avatar)
            localStorage.setItem('username', resObj.data.user.username)
            localStorage.setItem('fileServerUrl', resObj.data.fileServerUrl)
            localStorage.setItem('mobile', resObj.data.user.mobile)
            let nexturl
            if (state) {
              nexturl = decodeURIComponent(state)
              self.$router.replace(nexturl)
            }
          } else if (resObj.data.statusCode === 2) {
            // 未绑定手机号
            // localStorage.setItem("WEBURL", resObj.data.weburl);
            self.$router.replace('/wxbindphone?redirectURL=' + state)
          } else if (resObj.data.statusCode === 3) {
            // 用户未审批
            alert('用户信息需要管理员审批，请等待')
            self.$router.replace('/')
          } else {
            alert('error: ' + resObj.msg)
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
    this.submitCode()
  }
}
</script>

<style scoped>
</style>
