<template>
  <div></div>
</template>

<script>
import { postWxCode } from '@/api/login'
import { getUrlQueryString, getStringQueryString } from '@/utils/utils.js'
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
          let nextpage = localStorage.getItem('nextpage')
          let state = getUrlQueryString('state')
          console.log(resObj)
          if (resObj.code !== '000000') {
            alert(resObj.msg)
            throw { code: resObj.code, msg: resObj.msg }
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
            localStorage.setItem('token', resObj.data.user.token)
            // localStorage.setItem("WEBURL", resObj.data.weburl);
            localStorage.setItem('uid', resObj.data.user.uid)
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
    console.log(this.state);
    localStorage.setItem("WEBURL", 'http://192.168.2.180:8808');
  created () {
    this.code = getUrlQueryString('code')
    this.state = decodeURIComponent(getUrlQueryString('state'))
    this.submitCode()
  }
}
</script>

<style scoped>
</style>
